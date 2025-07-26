const { sendOrderNotificationToAdmin } = require('../lib/email');

// Test email data
const testOrderData = {
  orderNumber: 'IBC123456789',
  customerName: 'Test Customer',
  customerEmail: 'test@example.com',
  items: [
    { title: 'Mathematics Book Class 1', price: 500, quantity: 2 },
    { title: 'English Reader KG', price: 300, quantity: 1 }
  ],
  total: 1300,
  shippingAddress: '123 Test Street, Test Area',
  shippingCity: 'Karachi',
  shippingArea: 'Clifton'
};

async function testEmail() {
  console.log('📧 Testing email functionality...');
  
  try {
    const result = await sendOrderNotificationToAdmin(testOrderData);
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log('📬 Check your admin email inbox for the test order notification');
    } else {
      console.log('❌ Failed to send email:', result.error);
    }
  } catch (error) {
    console.error('❌ Error testing email:', error);
  }
}

testEmail(); 