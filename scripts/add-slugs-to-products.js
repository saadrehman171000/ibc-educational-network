const { PrismaClient } = require('@prisma/client')

// Initialize Prisma client
const prisma = new PrismaClient()

// Function to slugify text (convert to URL-friendly format)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start of text
    .replace(/-+$/, '')             // Trim hyphens from end of text
    .substring(0, 60)               // Limit length to 60 characters
}

// Function to generate unique slug
function generateUniqueSlug(title, existingSlugs) {
  let baseSlug = slugify(title)
  let finalSlug = baseSlug
  let counter = 1

  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`
    counter++
  }

  return finalSlug
}

// Main function to add slugs to all products
async function addSlugsToProducts() {
  try {
    console.log('🚀 Starting slug generation for all products...\n')
    
    // Fetch all products from database
    console.log('📊 Fetching products from database...')
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true
      },
      orderBy: {
        title: 'asc'
      }
    })
    
    console.log(`📦 Found ${products.length} products to process\n`)
    
    if (products.length === 0) {
      console.log('⚠️  No products found in database')
      return
    }

    // Get existing slugs to avoid duplicates
    const existingSlugs = products
      .filter(p => p.slug)
      .map(p => p.slug)
    
    console.log(`📝 Found ${existingSlugs.length} products with existing slugs`)
    
    // Process products that don't have slugs
    const productsWithoutSlugs = products.filter(p => !p.slug)
    console.log(`🔄 Processing ${productsWithoutSlugs.length} products without slugs\n`)
    
    let successCount = 0
    let errorCount = 0
    const results = []

    for (let i = 0; i < productsWithoutSlugs.length; i++) {
      const product = productsWithoutSlugs[i]
      console.log(`\n🔄 Processing ${i + 1}/${productsWithoutSlugs.length}: ${product.title}`)
      
      try {
        // Generate unique slug
        const slug = generateUniqueSlug(product.title, existingSlugs)
        
        // Update product with slug
        await prisma.product.update({
          where: { id: product.id },
          data: { slug }
        })
        
        // Add to existing slugs list to avoid duplicates
        existingSlugs.push(slug)
        
        console.log(`   ✅ Added slug: ${slug}`)
        console.log(`   🔗 New URL: https://www.ibcedu.com/product/${slug}`)
        
        results.push({
          success: true,
          product: product.title,
          slug: slug,
          oldUrl: `https://www.ibcedu.com/collections/${product.id}`,
          newUrl: `https://www.ibcedu.com/product/${slug}`
        })
        
        successCount++
        
      } catch (error) {
        console.error(`   ❌ Error processing "${product.title}":`, error.message)
        results.push({
          success: false,
          product: product.title,
          error: error.message
        })
        errorCount++
      }
      
      // Add a small delay to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60))
    console.log('📋 SLUG GENERATION SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Successfully added slugs: ${successCount} products`)
    console.log(`❌ Failed to add slugs: ${errorCount} products`)
    console.log(`📝 Total products with slugs: ${existingSlugs.length + successCount}`)
    console.log('='.repeat(60))
    
    // Print detailed results
    if (errorCount > 0) {
      console.log('\n❌ Failed Updates:')
      results
        .filter(r => !r.success)
        .forEach(r => {
          console.log(`   • ${r.product}: ${r.error}`)
        })
    }
    
    console.log('\n✅ Slug generation completed!')
    console.log('\n📋 Next Steps:')
    console.log('1. Run database migration: npx prisma db push')
    console.log('2. Update QR codes with new URLs: npm run generate-qr')
    console.log('3. Test new product URLs')
    
  } catch (error) {
    console.error('💥 Fatal error during slug generation:', error)
  } finally {
    // Close Prisma connection
    await prisma.$disconnect()
  }
}

// Handle command line arguments
const args = process.argv.slice(2)

if (args.length === 0) {
  // No arguments - add slugs to all products
  addSlugsToProducts()
} else {
  console.log('📖 Slug Generator Usage:')
  console.log('')
  console.log('Add slugs to all products without slugs:')
  console.log('  node scripts/add-slugs-to-products.js')
  console.log('')
  console.log('Examples:')
  console.log('  node scripts/add-slugs-to-products.js')
} 