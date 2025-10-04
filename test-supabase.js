// Test Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Thay thế bằng thông tin thực tế của bạn
const supabaseUrl = 'https://kkejfircuhralbsvvpvd.supabase.co';
const supabaseKey = 'YOUR_FULL_ANON_KEY_HERE'; // Thay thế bằng key đầy đủ

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test query để kiểm tra kết nối
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('Database is accessible');
    }
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
  }
}

testConnection();
