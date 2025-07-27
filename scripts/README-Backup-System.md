# Database Backup System for IBC Educational Network

This system provides comprehensive database backup and restore functionality for your educational network platform.

## 🚀 Quick Start

### Complete Workflow (QR Codes + Backup):
```bash
npm run qr-workflow
```

### Database Backup Only:
```bash
npm run backup-db
```

### Products Backup Only:
```bash
npm run backup-products
```

## 📋 Available Commands

### **Complete Database Backup:**
```bash
node scripts/backup-database.js
```
- Backs up all tables: products, orders, announcements, events
- Creates timestamped backup folder
- Generates backup summary

### **Products-Only Backup:**
```bash
node scripts/backup-database.js --products
```
- Backs up only products table
- Perfect for QR code workflow
- Smaller, focused backup

### **List Available Backups:**
```bash
node scripts/backup-database.js --list
```
- Shows all available backup folders
- Displays backup statistics
- Helps identify which backup to restore

### **Restore from Backup:**
```bash
node scripts/backup-database.js --restore <backup-folder>
```
- Restores complete database from backup
- Replaces existing data
- Use with caution!

## 🔄 Complete Workflow (Recommended)

### **QR Code Generation + Database Backup:**
```bash
npm run qr-workflow
```

This single command will:
1. ✅ Generate QR codes for all products
2. ✅ Create database backup
3. ✅ Generate workflow summary

## 📁 Backup Structure

### **Backup Directory:**
```
scripts/backups/
├── 2024-01-15T10-30-45/           # Complete backup
│   ├── products_2024-01-15T10-30-45.json
│   ├── orders_2024-01-15T10-30-45.json
│   ├── announcements_2024-01-15T10-30-45.json
│   ├── events_2024-01-15T10-30-45.json
│   └── backup_summary.json
├── products_2024-01-15T10-30-45/   # Products-only backup
│   ├── products_2024-01-15T10-30-45.json
│   └── backup_summary.json
└── ...
```

### **Backup File Format:**
```json
{
  "table": "products",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "recordCount": 100,
  "data": [
    {
      "id": "abc123-def456-ghi789",
      "title": "Step 1 English Book",
      "price": 650,
      "category": "Class 1",
      "subject": "English",
      "createdAt": "2024-01-15T10:30:45.123Z",
      // ... all product fields
    }
    // ... more products
  ]
}
```

## 🎯 Use Cases

### **After Adding New Products:**
```bash
# 1. Add your products to the database
# 2. Generate QR codes and backup
npm run qr-workflow
```

### **Regular Database Backup:**
```bash
# Create complete backup of all data
npm run backup-db
```

### **Before Major Changes:**
```bash
# Backup before making changes
npm run backup-products
# Make your changes
# If something goes wrong, restore from backup
```

### **Database Migration:**
```bash
# 1. Create backup on old system
npm run backup-db
# 2. Copy backup files to new system
# 3. Restore on new system
node scripts/backup-database.js --restore 2024-01-15T10-30-45
```

## 📊 Sample Output

### **Complete Backup:**
```
🚀 Starting complete database backup...

📊 Backing up products...
✅ Backed up 100 products records to /backups/2024-01-15T10-30-45/products_2024-01-15T10-30-45.json

📊 Backing up orders...
✅ Backed up 25 orders records to /backups/2024-01-15T10-30-45/orders_2024-01-15T10-30-45.json

📊 Backing up announcements...
✅ Backed up 5 announcements records to /backups/2024-01-15T10-30-45/announcements_2024-01-15T10-30-45.json

📊 Backing up events...
✅ Backed up 8 events records to /backups/2024-01-15T10-30-45/events_2024-01-15T10-30-45.json

============================================================
📋 DATABASE BACKUP SUMMARY
============================================================
📅 Backup Date: 1/15/2024, 10:30:45 AM
📁 Backup Location: /backups/2024-01-15T10-30-45
✅ Successful Tables: 4/4
❌ Failed Tables: 0
📊 Total Records: 138
============================================================
✅ products: 100 records
✅ orders: 25 records
✅ announcements: 5 records
✅ events: 8 records

✅ Complete database backup finished!
```

### **List Backups:**
```
📋 Available Backups:
============================================================
📅 2024-01-15T10-30-45
   📊 Records: 138
   ✅ Tables: 4/4
   🕐 Date: 1/15/2024, 10:30:45 AM

📅 2024-01-14T15-20-30
   📊 Records: 125
   ✅ Tables: 4/4
   🕐 Date: 1/14/2024, 3:20:30 PM
```

## 🔧 Technical Details

### **Backup Process:**
1. **Connect to Database**: Uses Prisma client
2. **Fetch Data**: Retrieves all records from each table
3. **Create Backup Files**: Saves data as JSON with metadata
4. **Generate Summary**: Creates backup summary with statistics
5. **Organize Files**: Places files in timestamped folders

### **Restore Process:**
1. **Validate Backup**: Checks backup folder and files
2. **Clear Existing Data**: Removes current data from tables
3. **Restore Data**: Inserts backup data into database
4. **Verify Restoration**: Confirms data was restored correctly

### **Data Integrity:**
- **Complete Records**: All fields are preserved
- **Relationships**: Maintains data relationships
- **Timestamps**: Preserves creation and update times
- **Metadata**: Includes backup information and statistics

## 🛡️ Safety Features

### **Backup Safety:**
- ✅ **Non-destructive**: Never deletes existing data
- ✅ **Timestamped**: Each backup has unique identifier
- ✅ **Organized**: Files stored in structured folders
- ✅ **Validated**: Checks data integrity before saving

### **Restore Safety:**
- ⚠️ **Destructive**: Replaces existing data
- ✅ **Confirmation**: Shows what will be restored
- ✅ **Validation**: Checks backup file integrity
- ✅ **Rollback**: Keep old backups for safety

## 📈 Backup Strategy

### **Recommended Schedule:**
- **Daily**: After adding new products
- **Weekly**: Complete database backup
- **Monthly**: Archive old backups
- **Before Updates**: Backup before major changes

### **Storage Strategy:**
- **Local**: Keep recent backups on server
- **Cloud**: Upload important backups to cloud storage
- **Offsite**: Store critical backups in separate location
- **Archive**: Move old backups to long-term storage

## 🚨 Important Notes

### **Before Restoring:**
- ⚠️ **Backup Current Data**: Always backup before restore
- ⚠️ **Verify Backup**: Check backup file integrity
- ⚠️ **Test Environment**: Test restore in development first
- ⚠️ **Downtime**: Plan for brief service interruption

### **Backup Management:**
- 📁 **Organize**: Keep backups in logical folders
- 🗂️ **Label**: Use descriptive names for backups
- 🗑️ **Cleanup**: Remove old backups periodically
- 🔒 **Secure**: Protect backup files from unauthorized access

## 🔄 Workflow Integration

### **QR Code Workflow:**
```bash
# Complete workflow: QR codes + backup
npm run qr-workflow
```

### **Manual Workflow:**
```bash
# Step 1: Generate QR codes
npm run generate-qr

# Step 2: Backup database
npm run backup-products
```

### **Automated Workflow:**
```bash
# Add to your deployment scripts
npm run qr-workflow && echo "Workflow completed successfully"
```

## 📞 Support

### **Common Issues:**
1. **"Permission denied"**: Check file permissions
2. **"Database connection failed"**: Verify database connection
3. **"Backup folder not found"**: Check backup directory path
4. **"Restore failed"**: Verify backup file integrity

### **Troubleshooting:**
- Check console output for error messages
- Verify database connection and permissions
- Ensure sufficient disk space for backups
- Test backup/restore in development environment

## 🎯 Best Practices

### **Backup Best Practices:**
- ✅ **Regular Backups**: Schedule automatic backups
- ✅ **Multiple Locations**: Store backups in different places
- ✅ **Test Restores**: Periodically test restore functionality
- ✅ **Documentation**: Keep backup procedures documented

### **Security Best Practices:**
- 🔒 **Encrypt Backups**: Use encryption for sensitive data
- 🔒 **Access Control**: Limit access to backup files
- 🔒 **Network Security**: Secure backup transfer methods
- 🔒 **Audit Logs**: Keep logs of backup/restore activities

## 📊 Monitoring

### **Backup Monitoring:**
- 📈 **Size Tracking**: Monitor backup file sizes
- 📈 **Frequency**: Track backup frequency
- 📈 **Success Rate**: Monitor backup success/failure
- 📈 **Storage Usage**: Track backup storage consumption

### **Health Checks:**
- 🔍 **File Integrity**: Verify backup file integrity
- 🔍 **Data Completeness**: Check for missing data
- 🔍 **Restore Testing**: Periodically test restore process
- 🔍 **Performance**: Monitor backup/restore performance 