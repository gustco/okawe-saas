import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import Sidebar from './Sidebar';
import { User } from '../services/localStorage';
import { useTranslation, Language } from '../lib/i18n';
import {
  Settings,
  Globe,
  Moon,
  Sun,
  Bell,
  Shield,
  User as UserIcon,
  Save,
  Check
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: string | null;
  currentUser: User | null;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLanguageChange: (language: Language) => void;
  currentLanguage: Language;
}

export default function SettingsPage({ 
  onNavigate, 
  onLogout, 
  userType, 
  currentUser,
  isDarkMode,
  onToggleTheme,
  onLanguageChange,
  currentLanguage
}: SettingsPageProps) {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const languageOptions = [
    { value: 'pt' as Language, label: 'Português', flag: '🇧🇷' },
    { value: 'en' as Language, label: 'English', flag: '🇺🇸' },
    { value: 'es' as Language, label: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType={userType as any} 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{t('settings.title')}</h1>
              <p className="text-muted-foreground">
                Gerencie suas preferências e configurações do sistema
              </p>
            </div>
            <Button 
              onClick={handleSave}
              className="bg-accent hover:bg-accent/90"
              disabled={saved}
            >
              {saved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Salvo
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t('settings.save')}
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settings Navigation */}
            <div className="space-y-2">
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start bg-accent/10 text-accent">
                  <Settings className="mr-2 h-4 w-4" />
                  {t('settings.general')}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  {t('settings.notifications')}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  {t('settings.security')}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Perfil
                </Button>
              </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Language Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {t('settings.language')}
                  </CardTitle>
                  <CardDescription>
                    Escolha o idioma da interface do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma da Interface</Label>
                    <Select 
                      value={currentLanguage} 
                      onValueChange={(value: Language) => onLanguageChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <span>{option.flag}</span>
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    As alterações de idioma serão aplicadas imediatamente em toda a interface.
                  </p>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    {t('settings.theme')}
                  </CardTitle>
                  <CardDescription>
                    Personalize a aparência do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Modo Escuro</Label>
                      <p className="text-sm text-muted-foreground">
                        Ative o tema escuro para reduzir o cansaço visual
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-muted-foreground" />
                      <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={onToggleTheme}
                        className="data-[state=checked]:bg-accent"
                      />
                      <Moon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Prévia do Tema</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="rounded-lg border p-4 bg-background">
                          <div className="space-y-2">
                            <div className="h-2 bg-accent rounded w-3/4"></div>
                            <div className="h-2 bg-muted rounded w-1/2"></div>
                            <div className="h-2 bg-muted rounded w-2/3"></div>
                          </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          {isDarkMode ? 'Tema Escuro' : 'Tema Claro'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-lg border p-4 bg-card">
                          <div className="space-y-2">
                            <div className="h-6 bg-accent rounded flex items-center px-2">
                              <div className="h-2 bg-accent-foreground rounded w-8"></div>
                            </div>
                            <div className="h-2 bg-muted rounded w-full"></div>
                            <div className="h-2 bg-muted rounded w-4/5"></div>
                          </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Cards e Componentes
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accessibility Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Acessibilidade</CardTitle>
                  <CardDescription>
                    Configurações para melhorar a acessibilidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-contrast">Alto Contraste</Label>
                      <p className="text-sm text-muted-foreground">
                        Aumenta o contraste para melhor legibilidade
                      </p>
                    </div>
                    <Switch id="high-contrast" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduce-motion">Reduzir Animações</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimiza animações e transições
                      </p>
                    </div>
                    <Switch id="reduce-motion" />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="font-size">Tamanho da Fonte</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio (Padrão)</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                        <SelectItem value="extra-large">Extra Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    {t('settings.notifications')}
                  </CardTitle>
                  <CardDescription>
                    Gerencie como você recebe notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba atualizações importantes por e-mail
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações em tempo real no navegador
                      </p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="project-updates">Atualizações de Projeto</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações sobre mudanças em projetos
                      </p>
                    </div>
                    <Switch id="project-updates" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="chat-notifications">Mensagens de Chat</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações de novas mensagens
                      </p>
                    </div>
                    <Switch id="chat-notifications" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Data and Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Dados e Privacidade
                  </CardTitle>
                  <CardDescription>
                    Controle seus dados e configurações de privacidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Coleta de Dados de Uso</Label>
                      <p className="text-sm text-muted-foreground">
                        Ajude-nos a melhorar o produto compartilhando dados de uso anônimos
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Exportar Dados</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Baixe uma cópia de todos os seus dados
                    </p>
                    <Button variant="outline" size="sm">
                      Solicitar Exportação
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-destructive">Zona de Perigo</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ações irreversíveis que afetam sua conta
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                        Limpar Todos os Dados
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                        Excluir Conta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}