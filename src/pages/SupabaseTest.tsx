import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  testSupabaseConnection, 
  testSupabaseAuth, 
  createTestUser, 
  diagnoseSupabaseIssues 
} from '@/utils/supabase-test';
import { CheckCircle, XCircle, AlertCircle, Database, User, Settings } from 'lucide-react';

const SupabaseTest: React.FC = () => {
  const [connectionResult, setConnectionResult] = useState<any>(null);
  const [authResult, setAuthResult] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('calebeluis20@gmail.com');
  const [password, setPassword] = useState('637664asdf');
  const [fullName, setFullName] = useState('Caleb Luis');

  useEffect(() => {
    // Executar diagnóstico automático ao carregar
    handleDiagnosis();
  }, []);

  const handleConnectionTest = async () => {
    setLoading(true);
    try {
      const result = await testSupabaseConnection();
      setConnectionResult(result);
    } catch (error) {
      setConnectionResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  const handleAuthTest = async () => {
    setLoading(true);
    try {
      const result = await testSupabaseAuth(email, password);
      setAuthResult(result);
    } catch (error) {
      setAuthResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const result = await createTestUser(email, password, fullName);
      setAuthResult(result);
    } catch (error) {
      setAuthResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  const handleDiagnosis = async () => {
    setLoading(true);
    try {
      const result = await diagnoseSupabaseIssues();
      setDiagnosis(result);
    } catch (error) {
      setDiagnosis({ issues: [error.message], fixes: ['Verificar configuração'] });
    }
    setLoading(false);
  };

  const StatusIcon = ({ success }: { success: boolean }) => {
    return success ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Integration Test</h1>
        <p className="text-gray-600">
          Teste e diagnóstico da integração com o Supabase para identificar e resolver problemas de conexão.
        </p>
      </div>

      {/* Diagnóstico */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Diagnóstico Automático
          </CardTitle>
          <CardDescription>
            Verificação automática de configurações e problemas comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDiagnosis} disabled={loading} className="mb-4">
            Executar Diagnóstico
          </Button>
          
          {diagnosis && (
            <div className="space-y-4">
              {diagnosis.issues.length > 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Problemas encontrados:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {diagnosis.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Nenhum problema de configuração encontrado.
                  </AlertDescription>
                </Alert>
              )}
              
              {diagnosis.fixes.length > 0 && (
                <Alert>
                  <AlertDescription>
                    <strong>Soluções recomendadas:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {diagnosis.fixes.map((fix, index) => (
                        <li key={index}>{fix}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teste de Conexão */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Teste de Conexão
          </CardTitle>
          <CardDescription>
            Verificar conectividade com o banco de dados Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleConnectionTest} disabled={loading} className="mb-4">
            Testar Conexão
          </Button>
          
          {connectionResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusIcon success={connectionResult.success} />
                <span className={connectionResult.success ? 'text-green-600' : 'text-red-600'}>
                  {connectionResult.success ? 'Conexão bem-sucedida' : 'Falha na conexão'}
                </span>
              </div>
              
              {connectionResult.error && (
                <Alert>
                  <AlertDescription>
                    <strong>Erro:</strong> {connectionResult.error}
                  </AlertDescription>
                </Alert>
              )}
              
              {connectionResult.session && (
                <div>
                  <h4 className="font-medium mb-2">Status da Sessão:</h4>
                  <Badge variant={connectionResult.session.authenticated ? 'default' : 'secondary'}>
                    {connectionResult.session.authenticated ? 
                      `Autenticado: ${connectionResult.session.user}` : 
                      'Não autenticado'
                    }
                  </Badge>
                </div>
              )}
              
              {connectionResult.tables && (
                <div>
                  <h4 className="font-medium mb-2">Acesso às Tabelas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(connectionResult.tables).map(([table, result]: [string, any]) => (
                      <div key={table} className="flex items-center gap-2">
                        <StatusIcon success={result.success} />
                        <span className="text-sm">{table}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teste de Autenticação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Teste de Autenticação
          </CardTitle>
          <CardDescription>
            Testar login e criação de usuário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="sua senha"
              />
            </div>
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu Nome Completo"
              />
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button onClick={handleAuthTest} disabled={loading}>
              Testar Login
            </Button>
            <Button onClick={handleCreateUser} disabled={loading} variant="outline">
              Criar Usuário
            </Button>
          </div>
          
          {authResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusIcon success={authResult.success} />
                <span className={authResult.success ? 'text-green-600' : 'text-red-600'}>
                  {authResult.success ? 'Autenticação bem-sucedida' : 'Falha na autenticação'}
                </span>
              </div>
              
              {authResult.error && (
                <Alert>
                  <AlertDescription>
                    <strong>Erro:</strong> {authResult.error}
                  </AlertDescription>
                </Alert>
              )}
              
              {authResult.user && (
                <Alert>
                  <AlertDescription>
                    <strong>Usuário:</strong> {authResult.user.email}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseTest;

