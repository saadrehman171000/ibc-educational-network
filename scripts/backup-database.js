const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

// Initialize Prisma client
const prisma = new PrismaClient()

// Function to ensure backup directory exists
function ensureBackupDirectoryExists(backupDir) {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
    console.log(`✅ Created backup directory: ${backupDir}`)
  }
}

// Function to create timestamp for backup
function createBackupTimestamp() {
  const now = new Date()
  return now.toISOString().replace(/[:.]/g, '-').slice(0, 19) // Format: 2024-01-15T10-30-45
}

// Function to backup a specific table
async function backupTable(tableName, backupDir, timestamp) {
  try {
    console.log(`📊 Backing up ${tableName}...`)
    
    let data = []
    
    switch (tableName) {
      case 'products':
        data = await prisma.product.findMany({
          orderBy: { createdAt: 'asc' }
        })
        break
        
      case 'orders':
        data = await prisma.order.findMany({
          orderBy: { createdAt: 'asc' }
        })
        break
        
      case 'announcements':
        data = await prisma.announcement.findMany({
          orderBy: { createdAt: 'asc' }
        })
        break
        
      case 'events':
        data = await prisma.event.findMany({
          orderBy: { createdAt: 'asc' }
        })
        break
        
      default:
        throw new Error(`Unknown table: ${tableName}`)
    }
    
    // Create backup file path
    const backupFile = path.join(backupDir, `${tableName}_${timestamp}.json`)
    
    // Create backup object with metadata
    const backupData = {
      table: tableName,
      timestamp: new Date().toISOString(),
      recordCount: data.length,
      data: data
    }
    
    // Write backup to file
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2))
    
    console.log(`✅ Backed up ${data.length} ${tableName} records to ${backupFile}`)
    
    return {
      success: true,
      table: tableName,
      recordCount: data.length,
      filePath: backupFile
    }
    
  } catch (error) {
    console.error(`❌ Error backing up ${tableName}:`, error.message)
    return {
      success: false,
      table: tableName,
      error: error.message
    }
  }
}

// Function to create complete database backup
async function createCompleteBackup() {
  try {
    console.log('🚀 Starting complete database backup...\n')
    
    // Create backup directory with timestamp
    const timestamp = createBackupTimestamp()
    const backupDir = path.join(__dirname, 'backups', timestamp)
    ensureBackupDirectoryExists(backupDir)
    
    // Define tables to backup
    const tables = ['products', 'orders', 'announcements', 'events']
    
    const results = []
    let totalRecords = 0
    let successCount = 0
    let errorCount = 0
    
    // Backup each table
    for (const table of tables) {
      const result = await backupTable(table, backupDir, timestamp)
      results.push(result)
      
      if (result.success) {
        successCount++
        totalRecords += result.recordCount
      } else {
        errorCount++
      }
    }
    
    // Create backup summary
    const summary = {
      backupTimestamp: timestamp,
      backupDate: new Date().toISOString(),
      totalTables: tables.length,
      successfulTables: successCount,
      failedTables: errorCount,
      totalRecords: totalRecords,
      results: results
    }
    
    // Save backup summary
    const summaryFile = path.join(backupDir, 'backup_summary.json')
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2))
    
    // Print summary
    console.log('\n' + '='.repeat(60))
    console.log('📋 DATABASE BACKUP SUMMARY')
    console.log('='.repeat(60))
    console.log(`📅 Backup Date: ${new Date().toLocaleString()}`)
    console.log(`📁 Backup Location: ${backupDir}`)
    console.log(`✅ Successful Tables: ${successCount}/${tables.length}`)
    console.log(`❌ Failed Tables: ${errorCount}`)
    console.log(`📊 Total Records: ${totalRecords.toLocaleString()}`)
    console.log('='.repeat(60))
    
    // Print detailed results
    results.forEach(result => {
      if (result.success) {
        console.log(`✅ ${result.table}: ${result.recordCount.toLocaleString()} records`)
      } else {
        console.log(`❌ ${result.table}: ${result.error}`)
      }
    })
    
    console.log('\n✅ Complete database backup finished!')
    console.log(`📁 Backup files saved in: ${backupDir}`)
    
    return summary
    
  } catch (error) {
    console.error('💥 Fatal error during backup:', error)
    throw error
  }
}

// Function to backup only products (for QR code workflow)
async function backupProductsOnly() {
  try {
    console.log('📚 Starting products-only backup...\n')
    
    const timestamp = createBackupTimestamp()
    const backupDir = path.join(__dirname, 'backups', `products_${timestamp}`)
    ensureBackupDirectoryExists(backupDir)
    
    const result = await backupTable('products', backupDir, timestamp)
    
    if (result.success) {
      console.log('\n✅ Products backup completed!')
      console.log(`📁 Backup file: ${result.filePath}`)
      console.log(`📊 Total products: ${result.recordCount.toLocaleString()}`)
    } else {
      console.log('\n❌ Products backup failed!')
    }
    
    return result
    
  } catch (error) {
    console.error('💥 Error during products backup:', error)
    throw error
  }
}

// Function to list all available backups
async function listBackups() {
  try {
    const backupsDir = path.join(__dirname, 'backups')
    
    if (!fs.existsSync(backupsDir)) {
      console.log('📁 No backups found.')
      return
    }
    
    const backupFolders = fs.readdirSync(backupsDir)
      .filter(item => fs.statSync(path.join(backupsDir, item)).isDirectory())
      .sort((a, b) => b.localeCompare(a)) // Sort newest first
    
    if (backupFolders.length === 0) {
      console.log('📁 No backup folders found.')
      return
    }
    
    console.log('📋 Available Backups:')
    console.log('='.repeat(60))
    
    backupFolders.forEach(folder => {
      const folderPath = path.join(backupsDir, folder)
      const summaryFile = path.join(folderPath, 'backup_summary.json')
      
      if (fs.existsSync(summaryFile)) {
        try {
          const summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8'))
          console.log(`📅 ${folder}`)
          console.log(`   📊 Records: ${summary.totalRecords.toLocaleString()}`)
          console.log(`   ✅ Tables: ${summary.successfulTables}/${summary.totalTables}`)
          console.log(`   🕐 Date: ${new Date(summary.backupDate).toLocaleString()}`)
          console.log('')
        } catch (error) {
          console.log(`📅 ${folder} (summary file corrupted)`)
        }
      } else {
        console.log(`📅 ${folder} (no summary file)`)
      }
    })
    
  } catch (error) {
    console.error('💥 Error listing backups:', error)
  }
}

// Function to restore database from backup
async function restoreFromBackup(backupFolder) {
  try {
    console.log(`🔄 Starting database restore from: ${backupFolder}`)
    
    const backupDir = path.join(__dirname, 'backups', backupFolder)
    
    if (!fs.existsSync(backupDir)) {
      throw new Error(`Backup folder not found: ${backupFolder}`)
    }
    
    // Check if backup folder contains data files
    const files = fs.readdirSync(backupDir)
    const dataFiles = files.filter(file => file.endsWith('.json') && !file.includes('summary'))
    
    if (dataFiles.length === 0) {
      throw new Error('No backup data files found')
    }
    
    console.log(`📁 Found ${dataFiles.length} backup files`)
    
    // Restore each table
    for (const file of dataFiles) {
      const filePath = path.join(backupDir, file)
      const tableName = file.split('_')[0]
      
      console.log(`📊 Restoring ${tableName}...`)
      
      try {
        const backupData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        const records = backupData.data
        
        if (records.length === 0) {
          console.log(`⚠️  No records to restore for ${tableName}`)
          continue
        }
        
        // Clear existing data for this table
        switch (tableName) {
          case 'products':
            await prisma.product.deleteMany({})
            break
          case 'orders':
            await prisma.order.deleteMany({})
            break
          case 'announcements':
            await prisma.announcement.deleteMany({})
            break
          case 'events':
            await prisma.event.deleteMany({})
            break
        }
        
        // Restore data
        switch (tableName) {
          case 'products':
            await prisma.product.createMany({ data: records })
            break
          case 'orders':
            await prisma.order.createMany({ data: records })
            break
          case 'announcements':
            await prisma.announcement.createMany({ data: records })
            break
          case 'events':
            await prisma.event.createMany({ data: records })
            break
        }
        
        console.log(`✅ Restored ${records.length} ${tableName} records`)
        
      } catch (error) {
        console.error(`❌ Error restoring ${tableName}:`, error.message)
      }
    }
    
    console.log('\n✅ Database restore completed!')
    
  } catch (error) {
    console.error('💥 Error during restore:', error)
    throw error
  }
}

// Handle command line arguments
const args = process.argv.slice(2)

async function main() {
  try {
    if (args.length === 0) {
      // No arguments - create complete backup
      await createCompleteBackup()
    } else if (args[0] === '--products') {
      // Backup only products
      await backupProductsOnly()
    } else if (args[0] === '--list') {
      // List available backups
      await listBackups()
    } else if (args[0] === '--restore' && args[1]) {
      // Restore from backup
      await restoreFromBackup(args[1])
    } else {
      console.log('📖 Database Backup Tool Usage:')
      console.log('')
      console.log('Create complete database backup:')
      console.log('  node scripts/backup-database.js')
      console.log('')
      console.log('Backup only products:')
      console.log('  node scripts/backup-database.js --products')
      console.log('')
      console.log('List available backups:')
      console.log('  node scripts/backup-database.js --list')
      console.log('')
      console.log('Restore from backup:')
      console.log('  node scripts/backup-database.js --restore <backup-folder>')
      console.log('')
      console.log('Examples:')
      console.log('  node scripts/backup-database.js')
      console.log('  node scripts/backup-database.js --products')
      console.log('  node scripts/backup-database.js --list')
      console.log('  node scripts/backup-database.js --restore 2024-01-15T10-30-45')
    }
  } catch (error) {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 