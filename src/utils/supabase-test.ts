import { supabase } from '../integrations/supabase/client';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase.from('topics').select('count').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Supabase connection successful');
    
    // Test 2: Authentication status
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('❌ Auth check failed:', authError);
      return { success: false, error: authError.message };
    }
    
    if (session) {
      console.log('✅ User is authenticated:', session.user.email);
    } else {
      console.log('ℹ️ No active session found');
    }
    
    // Test 3: Database tables access
    const tables = ['topics', 'questions', 'exam_sessions', 'scenarios'];
    const tableResults = {};
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('count').limit(1);
        if (error) {
          tableResults[table] = { success: false, error: error.message };
        } else {
          tableResults[table] = { success: true, accessible: true };
        }
      } catch (err) {
        tableResults[table] = { success: false, error: err.message };
      }
    }
    
    console.log('📊 Table access results:', tableResults);
    
    return {
      success: true,
      session: session ? {
        user: session.user.email,
        authenticated: true
      } : {
        authenticated: false
      },
      tables: tableResults
    };
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return { success: false, error: error.message };
  }
};

export const testSupabaseAuth = async (email: string, password: string) => {
  try {
    console.log('🔐 Testing Supabase authentication...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('❌ Authentication failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Authentication successful:', data.user.email);
    return { success: true, user: data.user };
    
  } catch (error) {
    console.error('❌ Unexpected auth error:', error);
    return { success: false, error: error.message };
  }
};

export const createTestUser = async (email: string, password: string, fullName: string) => {
  try {
    console.log('👤 Creating test user...');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) {
      console.error('❌ User creation failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ User created successfully:', data.user?.email);
    return { success: true, user: data.user };
    
  } catch (error) {
    console.error('❌ Unexpected user creation error:', error);
    return { success: false, error: error.message };
  }
};

// Função para verificar e corrigir problemas comuns
export const diagnoseSupabaseIssues = async () => {
  const issues = [];
  const fixes = [];
  
  // Verificar variáveis de ambiente
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl) {
    issues.push('VITE_SUPABASE_URL não está definida');
    fixes.push('Adicionar VITE_SUPABASE_URL ao arquivo .env');
  }
  
  if (!supabaseKey) {
    issues.push('VITE_SUPABASE_ANON_KEY não está definida');
    fixes.push('Adicionar VITE_SUPABASE_ANON_KEY ao arquivo .env');
  }
  
  // Verificar formato das URLs
  if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
    issues.push('URL do Supabase deve começar com https://');
    fixes.push('Verificar se a URL está correta no .env');
  }
  
  // Testar conectividade
  try {
    const response = await fetch(supabaseUrl + '/rest/v1/', {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    if (!response.ok) {
      issues.push(`Erro de conectividade: ${response.status}`);
      fixes.push('Verificar se o projeto Supabase está ativo e as credenciais estão corretas');
    }
  } catch (error) {
    issues.push(`Erro de rede: ${error.message}`);
    fixes.push('Verificar conexão com a internet e configurações de firewall');
  }
  
  return { issues, fixes };
};

