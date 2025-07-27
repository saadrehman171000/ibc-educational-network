# QR Code Generator for IBC Educational Network

This script generates QR codes for all products in your database, linking directly to each product's detail page on your website.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install qrcode
```

### 2. Generate QR Codes for All Products
```bash
npm run generate-qr
```

## 📋 Usage Options

### Generate QR codes for all products:
```bash
node scripts/generate-qr-codes.js
```

### Generate QR code for a specific product by ID:
```bash
node scripts/generate-qr-codes.js --id <product-id>
```

### Generate QR codes for products matching a search term:
```bash
node scripts/generate-qr-codes.js --search "english"
```

## 📁 Output

- **Location**: `scripts/qrcodes/` folder
- **Format**: PNG files
- **Naming**: Slugified product titles (e.g., `step_1_english.png`)
- **Size**: 300x300 pixels
- **Quality**: High quality with error correction

## 🔗 Generated URLs

Each QR code links to:
```
https://www.ibcedu.com/collections/{product-id}
```

## 📊 Features

### ✅ **Automatic Features:**
- Creates `qrcodes/` directory if it doesn't exist
- Slugifies product titles for clean filenames
- High-quality PNG output with error correction
- Progress tracking and detailed logging
- Error handling for failed generations

### ✅ **QR Code Specifications:**
- **Size**: 300x300 pixels
- **Format**: PNG
- **Error Correction**: Medium level (M)
- **Margin**: 1 unit
- **Colors**: Black QR on white background

### ✅ **File Naming:**
- Converts product titles to URL-friendly format
- Removes special characters and spaces
- Limits filename length to 50 characters
- Adds `.png` extension

## 🛠️ Examples

### Generate all QR codes:
```bash
npm run generate-qr
```

### Generate QR code for specific product:
```bash
node scripts/generate-qr-codes.js --id abc123-def456-ghi789
```

### Generate QR codes for English books:
```bash
node scripts/generate-qr-codes.js --search "english"
```

### Generate QR codes for Mathematics books:
```bash
node scripts/generate-qr-codes.js --search "mathematics"
```

## 📈 Sample Output

```
🚀 Starting QR code generation for all products...

📊 Fetching products from database...
📦 Found 25 products to process

✅ Created directory: /path/to/scripts/qrcodes

🔄 Processing 1/25: Step 1 English Book
✅ Generated QR code for: Step 1 English Book
   📁 File: step_1_english_book.png
   🔗 URL: https://www.ibcedu.com/collections/abc123-def456-ghi789

🔄 Processing 2/25: Mathematics Class 5
✅ Generated QR code for: Mathematics Class 5
   📁 File: mathematics_class_5.png
   🔗 URL: https://www.ibcedu.com/collections/def456-ghi789-jkl012

============================================================
📋 QR CODE GENERATION SUMMARY
============================================================
✅ Successfully generated: 25 QR codes
❌ Failed to generate: 0 QR codes
📁 QR codes saved in: /path/to/scripts/qrcodes
============================================================

✅ QR code generation completed!
```

## 🔧 Technical Details

### **Dependencies:**
- `@prisma/client` - Database access
- `qrcode` - QR code generation
- `fs` - File system operations
- `path` - Path manipulation

### **Database Query:**
```javascript
const products = await prisma.product.findMany({
  select: {
    id: true,
    title: true,
    category: true,
    subject: true
  },
  orderBy: {
    title: 'asc'
  }
})
```

### **QR Code Options:**
```javascript
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
```

## 🎯 Use Cases

### **For Physical Books:**
- Print QR codes and attach to book covers
- Students can scan to access digital resources
- Quick access to product details and pricing

### **For Marketing:**
- Include QR codes in catalogs and brochures
- Direct customers to specific product pages
- Track engagement through QR code scans

### **For Inventory Management:**
- Label physical inventory with QR codes
- Quick product identification and lookup
- Streamline inventory processes

## 🚨 Troubleshooting

### **Common Issues:**

1. **"No products found"**
   - Check your database connection
   - Ensure products exist in the database
   - Verify Prisma schema is up to date

2. **"Permission denied"**
   - Ensure write permissions for the scripts directory
   - Check if the qrcodes folder can be created

3. **"Invalid product ID"**
   - Verify the product ID exists in the database
   - Check the ID format (should be a valid UUID)

4. **"QR code generation failed"**
   - Check available disk space
   - Ensure the qrcode package is installed
   - Verify product title is not empty

### **Error Recovery:**
- The script continues processing even if individual QR codes fail
- Failed generations are logged with specific error messages
- Successfully generated QR codes are still saved

## 📞 Support

If you encounter any issues:
1. Check the console output for error messages
2. Verify your database connection
3. Ensure all dependencies are installed
4. Check file permissions in the scripts directory

## 🔄 Updating QR Codes

To regenerate QR codes:
1. Delete the existing `qrcodes/` folder
2. Run the script again
3. New QR codes will be generated with current product data

## 📝 Notes

- QR codes are generated with high quality for optimal scanning
- Filenames are automatically sanitized for compatibility
- The script includes progress tracking for large product catalogs
- Error handling ensures the script continues even if some products fail 