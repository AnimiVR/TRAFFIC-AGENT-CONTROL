// Simple test script for wallet connection
const { createClient } = require('@supabase/supabase-js');

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://kkejfircuhralbsvvpvd.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY_HERE'; // Replace with your actual key

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUserCreation() {
  try {
    console.log('Testing user creation...');
    
    // Test data
    const testWalletAddress = 'test_wallet_' + Date.now();
    const testUsername = 'test_user_' + Date.now();
    
    // Create user
    const { data, error } = await supabase
      .from('users')
      .insert({
        wallet_address: testWalletAddress,
        username: testUsername,
        total_points: 1,
        level: 1,
        experience_points: 1
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error creating user:', error);
      return;
    }
    
    console.log('✅ User created successfully:', data);
    
    // Test points transaction
    const { error: transactionError } = await supabase
      .from('points_transactions')
      .insert({
        user_id: data.id,
        amount: 1,
        type: 'bonus',
        description: 'Welcome bonus - Connected wallet for the first time!',
        metadata: {
          source: 'wallet_connection',
          bonus_type: 'welcome',
          timestamp: new Date().toISOString()
        }
      });
    
    if (transactionError) {
      console.error('❌ Error creating transaction:', transactionError);
    } else {
      console.log('✅ Points transaction created successfully!');
    }
    
    // Clean up test data
    await supabase.from('users').delete().eq('id', data.id);
    console.log('🧹 Test data cleaned up');
    
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

testUserCreation();
