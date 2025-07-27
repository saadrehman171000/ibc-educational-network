const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Starting QR Code Generation + Database Backup Workflow...\n')

try {
  // Step 1: Generate QR codes for all products
  console.log('📱 Step 1: Generating QR codes for all products...')
  console.log('='.repeat(50))
  
  execSync('node scripts/generate-qr-codes.js', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  
  console.log('\n✅ QR codes generated successfully!')
  
  // Step 2: Create database backup
  console.log('\n💾 Step 2: Creating database backup...')
  console.log('='.repeat(50))
  
  execSync('node scripts/backup-database.js --products', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  
  console.log('\n✅ Database backup created successfully!')
  
  // Step 3: Create workflow summary
  console.log('\n📋 Step 3: Creating workflow summary...')
  console.log('='.repeat(50))
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const summary = {
    workflow: 'QR Generation + Database Backup',
    timestamp: timestamp,
    date: new Date().toISOString(),
    steps: [
      {
        step: 1,
        action: 'QR Code Generation',
        status: 'completed',
        description: 'Generated QR codes for all products in database'
      },
      {
        step: 2,
        action: 'Database Backup',
        status: 'completed',
        description: 'Created backup of all products data'
      }
    ],
    notes: [
      'QR codes are saved in: scripts/qrcodes/',
      'Database backup is saved in: scripts/backups/',
      'This backup includes all product data for restoration if needed'
    ]
  }
  
  // Save workflow summary
  const summaryFile = path.join(__dirname, 'workflow-summary.json')
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2))
  
  console.log('✅ Workflow summary saved to: workflow-summary.json')
  
  // Final success message
  console.log('\n🎉 WORKFLOW COMPLETED SUCCESSFULLY!')
  console.log('='.repeat(50))
  console.log('✅ QR codes generated for all products')
  console.log('✅ Database backup created')
  console.log('✅ Workflow summary saved')
  console.log('')
  console.log('📁 Files created:')
  console.log('   • QR codes: scripts/qrcodes/')
  console.log('   • Database backup: scripts/backups/')
  console.log('   • Workflow summary: scripts/workflow-summary.json')
  console.log('')
  console.log('🔗 Next steps:')
  console.log('   • Print QR codes and attach to physical products')
  console.log('   • Store backup files in a safe location')
  console.log('   • Use backup to restore data if needed')
  
} catch (error) {
  console.error('\n💥 Workflow failed:', error.message)
  console.log('\n🔧 Troubleshooting:')
  console.log('   • Check if all dependencies are installed')
  console.log('   • Verify database connection')
  console.log('   • Ensure write permissions in scripts directory')
  process.exit(1)
} 