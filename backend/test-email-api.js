// test-email-api.js - Test script for send-email API
const testEmailAPI = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Email API",
    message: "This is a test message to verify the email API is working correctly."
  };

  try {
    console.log('🧪 Testing /api/send-email endpoint...\n');
    console.log('Test Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('\n📊 Response Status:', response.status);
    console.log('📊 Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('\n✅ SUCCESS! Email API is working correctly!');
    } else {
      console.log('\n❌ ERROR! Something went wrong.');
    }
  } catch (error) {
    console.error('\n❌ Request failed:', error.message);
  }
};

testEmailAPI();
