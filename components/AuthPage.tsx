import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Building, Phone } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password?: string) => Promise<boolean>;
  onNavigate: (page: string) => void;
}

export default function AuthPage({ onLogin, onNavigate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'admin' | 'collaborator' | 'client'>('collaborator');

  const demoUsers = [
    { 
      email: 'admin@okawe.com', 
      type: 'Admin', 
      description: 'Acesso completo ao sistema',
      color: 'bg-accent text-accent-foreground'
    },
    { 
      email: 'joao@okawe.com', 
      type: 'Colaborador', 
      description: 'Gestão de projetos e arquivos',
      color: 'bg-olive text-olive-foreground'
    },
    { 
      email: 'cliente@empresa.com', 
      type: 'Cliente', 
      description: 'Visualização e aprovação de projetos',
      color: 'bg-coffee text-coffee-foreground'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email) {
        throw new Error('Email é obrigatório');
      }

      if (!isLogin) {
        // Validações para registro
        if (!fullName.trim()) {
          throw new Error('Nome completo é obrigatório');
        }
        
        if (!password || password.length < 6) {
          throw new Error('Senha deve ter pelo menos 6 caracteres');
        }
        
        if (password !== confirmPassword) {
          throw new Error('Senhas não coincidem');
        }

        // Simular registro (em produção, integraria com Supabase)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Após registro bem-sucedido, fazer login automático
        const success = await onLogin(email, password);
        if (!success) {
          throw new Error('Erro ao criar conta. Tente novamente.');
        }
      } else {
        // Login
        const success = await onLogin(email, password);
        if (!success) {
          throw new Error('Email ou senha incorretos');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const success = await onLogin(demoEmail, 'demo123');
      if (!success) {
        throw new Error('Erro ao fazer login com usuário demo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login demo');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setUserType('collaborator');
    setError('');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/30 via-background to-muted/10 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('landing')}
            className="mb-6 hover:bg-accent/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-semibold text-accent-foreground">O</span>
            </div>
            <div>
              <span className="text-3xl font-semibold">Okawe</span>
              <p className="text-sm text-muted-foreground">Gestão Criativa</p>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {isLogin 
              ? 'Entre na sua conta para continuar gerenciando seus projetos criativos' 
              : 'Comece sua jornada criativa hoje mesmo'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Formulário Principal */}
          <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl text-center">
                {isLogin ? 'Entrar na conta' : 'Criar conta'}
              </CardTitle>
              <CardDescription className="text-center text-base">
                {isLogin 
                  ? 'Use suas credenciais para acessar o sistema' 
                  : 'Preencha os dados para começar'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Seu nome completo"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 h-12 rounded-xl"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userType">Tipo de Usuário</Label>
                      <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              Administrador
                            </div>
                          </SelectItem>
                          <SelectItem value="collaborator">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-olive rounded-full"></div>
                              Colaborador
                            </div>
                          </SelectItem>
                          <SelectItem value="client">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-coffee rounded-full"></div>
                              Cliente
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha (mín. 6 caracteres)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-12 h-12 rounded-xl"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirme sua senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                    <p className="text-destructive text-sm font-medium">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    isLogin ? 'Entrar' : 'Criar Conta'
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-accent font-medium hover:text-accent/80"
                    onClick={toggleAuthMode}
                  >
                    {isLogin ? 'Criar conta gratuita' : 'Fazer login'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Usuários Demo */}
          <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl text-center">Acesso Demo</CardTitle>
              <CardDescription className="text-center text-base">
                Teste o sistema com diferentes tipos de usuário
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {demoUsers.map((user, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                          <User className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <Badge className={user.color}>
                            {user.type}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDemoLogin(user.email)}
                        disabled={isLoading}
                        className="rounded-lg"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                        ) : (
                          'Testar'
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {user.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-accent/10 to-coffee/10 rounded-xl border border-accent/20">
                <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  💡 Dica de Teste
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Experimente os diferentes perfis para ver como cada tipo de usuário 
                  interage com o sistema. Cada perfil tem permissões e dashboards únicos.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-accent rounded-full"></div>
                    Admin: Controle total
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-olive rounded-full"></div>
                    Colaborador: Projetos
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-coffee rounded-full"></div>
                    Cliente: Aprovações
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>🔒 100% Seguro</span>
            <span>⚡ Configuração em 2min</span>
            <span>💰 Grátis para começar</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
          </p>
        </div>
      </div>
    </div>
  );
}