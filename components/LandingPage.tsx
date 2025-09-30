import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Shield, 
  Clock, 
  Zap,
  CheckCircle2,
  Star,
  Globe,
  Smartphone,
  Monitor,
  MessageSquare
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Equipe',
      description: 'Organize sua equipe, defina permissões e acompanhe o desempenho de cada colaborador em tempo real.',
      color: 'text-accent'
    },
    {
      icon: FileText,
      title: 'Projetos Organizados',
      description: 'Gerencie todos os seus projetos criativos com timelines claros, status detalhados e aprovações integradas.',
      color: 'text-olive'
    },
    {
      icon: Calendar,
      title: 'Calendário Integrado',
      description: 'Sincronize prazos, reuniões e entregas com integração nativa ao Google Calendar.',
      color: 'text-success'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Financeiros',
      description: 'Controle receitas, despesas e gere relatórios detalhados para sua gestão financeira.',
      color: 'text-coffee'
    },
    {
      icon: Shield,
      title: 'Aprovações Seguras',
      description: 'Sistema robusto de aprovação de arquivos com controle de versões e feedback organizado.',
      color: 'text-desert'
    },
    {
      icon: MessageSquare,
      title: 'Chat Integrado',
      description: 'Comunicação interna por projeto ou área, mantendo toda equipe sempre alinhada.',
      color: 'text-rock'
    }
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Diretora Criativa',
      company: 'Studio Design+',
      content: 'O Okawe transformou nossa gestão. Reduzimos o tempo gasto em administrativo em 60% e aumentamos nossa produtividade.',
      rating: 5
    },
    {
      name: 'Carlos Santos',
      role: 'CEO',
      company: 'Agência Digital Pro',
      content: 'Finalmente um sistema que entende as necessidades de uma agência criativa. Interface limpa e funcionalidades poderosas.',
      rating: 5
    },
    {
      name: 'Marina Costa',
      role: 'Gerente de Projetos',
      company: 'Creative Hub',
      content: 'A integração com o Google Calendar e o sistema de aprovações facilitaram muito nosso fluxo de trabalho remoto.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfeito para freelancers e pequenos projetos',
      price: 'Grátis',
      period: '',
      features: [
        'Até 3 projetos',
        '1 usuário',
        '1GB de armazenamento',
        'Suporte por email',
        'Dashboards básicos'
      ],
      popular: false,
      buttonText: 'Começar Grátis',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Pro',
      description: 'Ideal para pequenas e médias equipes',
      price: 'R$ 49',
      period: '/mês',
      features: [
        'Projetos ilimitados',
        'Até 10 usuários',
        '50GB de armazenamento',
        'Integrações avançadas',
        'Chat interno',
        'Relatórios detalhados',
        'Suporte prioritário'
      ],
      popular: true,
      buttonText: 'Testar Pro',
      buttonVariant: 'default' as const
    },
    {
      name: 'Enterprise',
      description: 'Para grandes agências e empresas',
      price: 'R$ 149',
      period: '/mês',
      features: [
        'Tudo do Pro',
        'Usuários ilimitados',
        '500GB de armazenamento',
        'API personalizada',
        'White-label',
        'Integração SSO',
        'Suporte 24/7',
        'Treinamento dedicado'
      ],
      popular: false,
      buttonText: 'Falar com Vendas',
      buttonVariant: 'outline' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/30 via-background to-muted/10">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-semibold text-accent-foreground">O</span>
          </div>
          <div>
            <span className="text-2xl font-semibold">Okawe</span>
            <p className="text-xs text-muted-foreground">Gestão Criativa</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('auth')} className="text-muted-foreground hover:text-foreground">
            Entrar
          </Button>
          <Button onClick={() => onNavigate('auth')} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
            Começar Grátis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            Novo: Chat interno integrado 🚀
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-semibold mb-8 text-foreground leading-tight">
            Sua gestão criativa
            <span className="block bg-gradient-to-r from-accent to-coffee bg-clip-text text-transparent">
              simplificada
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            <strong>Okawe</strong> é a plataforma completa para gerenciar projetos criativos, 
            equipes remotas e clientes em um só lugar. Feito especialmente para agências e estúdios modernos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => onNavigate('auth')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl text-lg px-8 py-6 rounded-2xl"
            >
              Começar Agora Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-2xl border-2 hover:bg-accent/5"
            >
              Ver Demo ao Vivo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Agências Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-olive mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Projetos Gerenciados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-coffee mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Tudo que sua equipe precisa
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas e intuitivas para impulsionar sua criatividade e produtividade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl group bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Amado por criativos
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja o que nossos usuários dizem sobre o Okawe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-foreground/80 text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Design Showcase */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Funciona em qualquer dispositivo
          </h2>
          <p className="text-xl text-muted-foreground">
            Design responsivo que se adapta perfeitamente ao seu fluxo de trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Desktop</h3>
            <p className="text-muted-foreground">Barra lateral fixa, máxima produtividade</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-olive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-olive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tablet</h3>
            <p className="text-muted-foreground">Menus colapsáveis, touch otimizado</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-coffee/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-coffee" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile</h3>
            <p className="text-muted-foreground">Menu inferior, conteúdo empilhado</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Planos que crescem com você
            </h2>
            <p className="text-xl text-muted-foreground">
              Comece grátis e escale conforme sua necessidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-border/50 ${
                  plan.popular 
                    ? 'border-accent bg-accent/5 scale-105 shadow-2xl' 
                    : 'bg-card/80 backdrop-blur-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground shadow-lg">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-6">
                    {plan.description}
                  </CardDescription>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full rounded-2xl ${
                      plan.popular 
                        ? 'bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg' 
                        : ''
                    }`}
                    variant={plan.buttonVariant}
                    onClick={() => onNavigate('auth')}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-24 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-accent/10 via-coffee/10 to-olive/10 rounded-3xl p-12 border border-accent/20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Pronto para revolucionar sua gestão criativa?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Junte-se a centenas de agências e criativos que já transformaram 
            seu fluxo de trabalho com o Okawe
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('auth')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl text-lg px-8 py-6 rounded-2xl"
            >
              Começar Agora - É Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-2xl border-2"
            >
              Agendar Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Sem cartão de crédito
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Configuração em 2 minutos
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Suporte 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-sm font-semibold text-accent-foreground">O</span>
              </div>
              <div>
                <span className="text-lg font-semibold">Okawe</span>
                <p className="text-xs text-muted-foreground">Gestão Criativa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Okawe. Todos os direitos reservados.</span>
              <span>Feito com ❤️ para criativos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}