const { PrismaClient } = require('@prisma/client')
const QRCode = require('qrcode')
const fs = require('fs')
const path = require('path')

// Initialize Prisma client
const prisma = new PrismaClient()

// Function to slugify text (convert to URL-friendly format)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^\w\-_]+/g, '')      // Remove all non-word chars except underscores and hyphens
    .replace(/\-\-+/g, '_')         // Replace multiple underscores with single underscore
    .replace(/^-+/, '')             // Trim underscores from start of text
    .replace(/-+$/, '')             // Trim underscores from end of text
    .substring(0, 50)               // Limit length to 50 characters
}

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✅ Created directory: ${dirPath}`)
  }
}

// Function to generate QR code for a single product
async function generateQRCode(product) {
  try {
    // Create the URL for the product - use slug if available, otherwise use ID
    const productUrl = product.slug 
      ? `https://www.ibcedu.com/product/${product.slug}`
      : `https://www.ibcedu.com/collections/${product.id}`
    
    // Generate slugified filename from product title
    const filename = slugify(product.title) + '.png'
    const filePath = path.join(__dirname, 'qrcodes', filename)
    
    // Generate QR code options
    const qrOptions = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 300
    }
    
    // Generate QR code
    await QRCode.toFile(filePath, productUrl, qrOptions)
    
    console.log(`✅ Generated QR code for: ${product.title}`)
    console.log(`   📁 File: ${filename}`)
    console.log(`   🔗 URL: ${productUrl}`)
    console.log(`   📝 Type: ${product.slug ? 'Slug-based' : 'ID-based'}`)
    
    return {
      success: true,
      product: product.title,
      filename: filename,
      url: productUrl,
      type: product.slug ? 'slug' : 'id'
    }
    
  } catch (error) {
    console.error(`❌ Error generating QR code for "${product.title}":`, error.message)
    return {
      success: false,
      product: product.title,
      error: error.message
    }
  }
}

// Main function to generate QR codes for all products
async function generateAllQRCodes() {
  try {
    console.log('🚀 Starting QR code generation for all products...\n')
    
    // Ensure qrcodes directory exists
    const qrCodesDir = path.join(__dirname, 'qrcodes')
    ensureDirectoryExists(qrCodesDir)
    
    // Fetch all products from database
    console.log('📊 Fetching products from database...')
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        subject: true
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
    
    // Generate QR codes for each product
    const results = []
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      console.log(`\n🔄 Processing ${i + 1}/${products.length}: ${product.title}`)
      
      const result = await generateQRCode(product)
      results.push(result)
      
      if (result.success) {
        successCount++
      } else {
        errorCount++
      }
      
      // Add a small delay to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60))
    console.log('📋 QR CODE GENERATION SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Successfully generated: ${successCount} QR codes`)
    console.log(`❌ Failed to generate: ${errorCount} QR codes`)
    console.log(`📁 QR codes saved in: ${qrCodesDir}`)
    console.log('='.repeat(60))
    
    // Print detailed results
    if (errorCount > 0) {
      console.log('\n❌ Failed Generations:')
      results
        .filter(r => !r.success)
        .forEach(r => {
          console.log(`   • ${r.product}: ${r.error}`)
        })
    }
    
    console.log('\n✅ QR code generation completed!')
    
  } catch (error) {
    console.error('💥 Fatal error during QR code generation:', error)
  } finally {
    // Close Prisma connection
    await prisma.$disconnect()
  }
}

// Function to generate QR code for a single product by ID
async function generateQRCodeById(productId) {
  try {
    console.log(`🔍 Looking for product with ID: ${productId}`)
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        subject: true
      }
    })
    
    if (!product) {
      console.error(`❌ Product with ID "${productId}" not found`)
      return
    }
    
    // Ensure qrcodes directory exists
    const qrCodesDir = path.join(__dirname, 'qrcodes')
    ensureDirectoryExists(qrCodesDir)
    
    const result = await generateQRCode(product)
    
    if (result.success) {
      console.log('\n✅ Single QR code generation completed!')
    } else {
      console.log('\n❌ Single QR code generation failed!')
    }
    
  } catch (error) {
    console.error('💥 Error generating single QR code:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Function to generate QR codes for products matching a search term
async function generateQRCodesBySearch(searchTerm) {
  try {
    console.log(`🔍 Searching for products containing: "${searchTerm}"`)
    
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { category: { contains: searchTerm, mode: 'insensitive' } },
          { subject: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        subject: true
      },
      orderBy: {
        title: 'asc'
      }
    })
    
    console.log(`📦 Found ${products.length} products matching "${searchTerm}"\n`)
    
    if (products.length === 0) {
      console.log('⚠️  No products found matching the search term')
      return
    }
    
    // Ensure qrcodes directory exists
    const qrCodesDir = path.join(__dirname, 'qrcodes')
    ensureDirectoryExists(qrCodesDir)
    
    // Generate QR codes for matching products
    const results = []
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      console.log(`\n🔄 Processing ${i + 1}/${products.length}: ${product.title}`)
      
      const result = await generateQRCode(product)
      results.push(result)
      
      if (result.success) {
        successCount++
      } else {
        errorCount++
      }
      
      // Add a small delay
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60))
    console.log(`📋 QR CODE GENERATION SUMMARY FOR "${searchTerm}"`)
    console.log('='.repeat(60))
    console.log(`✅ Successfully generated: ${successCount} QR codes`)
    console.log(`❌ Failed to generate: ${errorCount} QR codes`)
    console.log(`📁 QR codes saved in: ${qrCodesDir}`)
    console.log('='.repeat(60))
    
  } catch (error) {
    console.error('💥 Error during search-based QR code generation:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Handle command line arguments
const args = process.argv.slice(2)

if (args.length === 0) {
  // No arguments - generate QR codes for all products
  generateAllQRCodes()
} else if (args[0] === '--id' && args[1]) {
  // Generate QR code for specific product ID
  generateQRCodeById(args[1])
} else if (args[0] === '--search' && args[1]) {
  // Generate QR codes for products matching search term
  generateQRCodesBySearch(args[1])
} else {
  console.log('📖 QR Code Generator Usage:')
  console.log('')
  console.log('Generate QR codes for all products:')
  console.log('  node scripts/generate-qr-codes.js')
  console.log('')
  console.log('Generate QR code for specific product ID:')
  console.log('  node scripts/generate-qr-codes.js --id <product-id>')
  console.log('')
  console.log('Generate QR codes for products matching search term:')
  console.log('  node scripts/generate-qr-codes.js --search "english"')
  console.log('')
  console.log('Examples:')
  console.log('  node scripts/generate-qr-codes.js')
  console.log('  node scripts/generate-qr-codes.js --id abc123')
  console.log('  node scripts/generate-qr-codes.js --search "mathematics"')
} 