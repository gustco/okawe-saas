# 🔧 INTEGRAÇÕES GRATUITAS - Guia Completo

## 📋 SERVIÇOS GRATUITOS DISPONÍVEIS

### 🗃️ SUPABASE - Backend Completo (Gratuito até 50k MAU)
### 💳 STRIPE - Pagamentos (Gratuito até R$ 2.000/mês)
### 📅 GOOGLE CALENDAR - Agenda (Gratuito)
### 📧 RESEND - Emails (3.000 emails/mês grátis)
### 🖼️ UNSPLASH - Imagens (Gratuito)
### 📊 GOOGLE ANALYTICS - Métricas (Gratuito)

---

## 🗃️ 1. SUPABASE - BACKEND REAL

### Setup Inicial (5 minutos):
1. **Acesse:** [supabase.com](https://supabase.com)
2. **Sign up** com GitHub
3. **New Project:**
   - Name: `okawe-saas`
   - Organization: Personal
   - Database Password: Gere senha forte
   - Region: `South America (São Paulo)`

### Configurar Database (Copy & Paste):
```sql
-- Execute no SQL Editor do Supabase

-- =====================================
-- USUÁRIOS
-- =====================================
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  type VARCHAR CHECK (type IN ('admin', 'collaborator', 'client')) NOT NULL,
  avatar VARCHAR,
  department VARCHAR,
  plan VARCHAR DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  subscription_status VARCHAR DEFAULT 'active',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- PROJETOS
-- =====================================
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'review', 'approved', 'delivered')),
  budget DECIMAL(10,2),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  client_id UUID REFERENCES users(id),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- ARQUIVOS
-- =====================================
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  size BIGINT,
  type VARCHAR,
  url VARCHAR,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- TAREFAS
-- =====================================
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority VARCHAR DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- CHAT MESSAGES
-- =====================================
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  sender_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- SEGURANÇA (RLS)
-- =====================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- =====================================
-- POLÍTICAS DE ACESSO
-- =====================================

-- Usuários podem ver próprios dados
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Usuários podem editar próprios dados
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Membros podem ver projetos relacionados
CREATE POLICY "Users can view related projects" ON projects
  FOR SELECT USING (
    client_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND type IN ('admin', 'collaborator')
    )
  );

-- Similar para outras tabelas...
```

### Configurar Cliente Supabase:
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos TypeScript
export type User = {
  id: string
  email: string
  name: string
  type: 'admin' | 'collaborator' | 'client'
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
}

export type Project = {
  id: string
  name: string
  description?: string
  status: 'planning' | 'in_progress' | 'review' | 'approved' | 'delivered'
  budget?: number
  progress: number
  client_id?: string
  start_date?: string
  end_date?: string
}
```

### Hook de Autenticação:
```typescript
// lib/hooks/useSupabaseAuth.ts
import { useState, useEffect } from 'react'
import { supabase, type User } from '../supabase'

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
      setLoading(false)
    })

    // Escutar mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error loading user:', error)
      return
    }

    setUser(data)
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) return { data: null, error }

    // Criar perfil do usuário
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email,
          ...userData
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      }
    }

    return { data, error: null }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)
    return { error }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }
}
```

---

## 💳 2. STRIPE - SISTEMA DE PAGAMENTOS

### Setup Stripe (3 minutos):
1. **Acesse:** [stripe.com](https://stripe.com)
2. **Create account** (gratuito)
3. **Dashboard:** Developers → API Keys
4. **Copie:** Publishable key e Secret key

### Criar Produtos:
1. **Products:** Create Product
2. **Pro Plan:** R$ 49/mês - Recurring
3. **Enterprise:** R$ 149/mês - Recurring
4. **Copie:** Price IDs

### Configuração Frontend:
```typescript
// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!)

export const createCheckoutSession = async (priceId: string) => {
  const stripe = await stripePromise
  
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  })

  const session = await response.json()

  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  })

  if (result?.error) {
    console.error(result.error.message)
  }
}

// Componente de Preços
export const PricingCards = () => {
  const handleUpgrade = (priceId: string) => {
    createCheckoutSession(priceId)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-6">
        <h3>Pro Plan</h3>
        <div className="text-3xl font-bold">R$ 49<span className="text-sm">/mês</span></div>
        <button 
          onClick={() => handleUpgrade('price_1234567890')}
          className="w-full mt-4 bg-primary text-white p-2 rounded"
        >
          Assinar Pro
        </button>
      </div>
      
      <div className="border rounded-lg p-6">
        <h3>Enterprise</h3>
        <div className="text-3xl font-bold">R$ 149<span className="text-sm">/mês</span></div>
        <button 
          onClick={() => handleUpgrade('price_0987654321')}
          className="w-full mt-4 bg-primary text-white p-2 rounded"
        >
          Assinar Enterprise
        </button>
      </div>
    </div>
  )
}
```

### API Route (Vercel Function):
```typescript
// api/create-checkout-session.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { priceId } = req.body

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/pricing`,
      })

      res.status(200).json({ id: session.id })
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
```

### Webhook Handler:
```typescript
// api/stripe-webhook.ts
import Stripe from 'stripe'
import { supabase } from '../../lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature']
    
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      )

      switch (event.type) {
        case 'customer.subscription.created':
          // Atualizar plano do usuário
          const subscription = event.data.object
          await supabase
            .from('users')
            .update({ 
              plan: 'pro', // ou 'enterprise'
              subscription_status: 'active' 
            })
            .eq('stripe_customer_id', subscription.customer)
          break

        case 'customer.subscription.deleted':
          // Cancelar assinatura
          const canceledSub = event.data.object
          await supabase
            .from('users')
            .update({ 
              plan: 'free',
              subscription_status: 'canceled' 
            })
            .eq('stripe_customer_id', canceledSub.customer)
          break
      }

      res.json({ received: true })
    } catch (err: any) {
      console.error('Webhook error:', err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
```

---

## 📅 3. GOOGLE CALENDAR - INTEGRAÇÃO

### Setup Google Calendar (5 minutos):
1. **Acesse:** [console.cloud.google.com](https://console.cloud.google.com)
2. **New Project:** "Okawe Calendar"
3. **Enable APIs:** Google Calendar API
4. **Credentials:** Create OAuth 2.0 Client ID
5. **Authorized origins:** Sua URL da Vercel

### Configuração:
```typescript
// lib/calendar.ts
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = 'https://www.googleapis.com/auth/calendar'

declare global {
  interface Window {
    gapi: any
  }
}

export const initializeGoogleCalendar = () => {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', async () => {
      try {
        await window.gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

export const signInToGoogle = () => {
  const authInstance = window.gapi.auth2.getAuthInstance()
  return authInstance.signIn()
}

export const createCalendarEvent = async (event: {
  summary: string
  description: string
  start: { dateTime: string }
  end: { dateTime: string }
  attendees?: { email: string }[]
}) => {
  const request = window.gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  })

  return request.execute()
}

export const listUpcomingEvents = async (maxResults = 10) => {
  const response = await window.gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': maxResults,
    'orderBy': 'startTime'
  })

  return response.result.items || []
}
```

### Componente de Calendário:
```typescript
// components/CalendarIntegration.tsx
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Calendar, Clock, Users } from 'lucide-react'
import { initializeGoogleCalendar, signInToGoogle, createCalendarEvent, listUpcomingEvents } from '../lib/calendar'

export const CalendarIntegration = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    initializeGoogleCalendar().then(() => {
      const authInstance = window.gapi.auth2.getAuthInstance()
      setIsSignedIn(authInstance.isSignedIn.get())
    })
  }, [])

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signInToGoogle()
      setIsSignedIn(true)
      await loadEvents()
    } catch (error) {
      console.error('Erro ao conectar:', error)
    }
    setLoading(false)
  }

  const loadEvents = async () => {
    try {
      const eventList = await listUpcomingEvents()
      setEvents(eventList)
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
    }
  }

  const createProjectMeeting = async (project: any) => {
    const event = {
      summary: `Reunião - ${project.name}`,
      description: `Reunião do projeto: ${project.description}`,
      start: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Amanhã
      },
      end: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString() // 1h depois
      },
      attendees: [
        { email: 'cliente@empresa.com' },
        { email: 'joao@okawe.com' }
      ]
    }

    try {
      await createCalendarEvent(event)
      alert('Reunião criada com sucesso!')
      loadEvents()
    } catch (error) {
      console.error('Erro ao criar evento:', error)
    }
  }

  if (!isSignedIn) {
    return (
      <div className="p-6 border rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" />
          <h3>Google Calendar</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Conecte com Google Calendar para sincronizar reuniões e prazos.
        </p>
        <Button onClick={handleSignIn} disabled={loading}>
          {loading ? 'Conectando...' : 'Conectar Calendar'}
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-green-600" />
        <h3>Calendar Conectado</h3>
      </div>
      
      <div className="space-y-3">
        {events.slice(0, 3).map((event, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded">
            <Clock className="w-4 h-4" />
            <div>
              <div className="font-medium">{event.summary}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(event.start.dateTime || event.start.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button 
        onClick={() => createProjectMeeting({ name: 'Projeto Exemplo', description: 'Reunião de alinhamento' })}
        className="w-full mt-4"
        size="sm"
      >
        <Users className="w-4 h-4 mr-2" />
        Agendar Reunião
      </Button>
    </div>
  )
}
```

---

## 📧 4. RESEND - SISTEMA DE EMAILS

### Setup Resend (2 minutos):
1. **Acesse:** [resend.com](https://resend.com)
2. **Sign up** gratuito
3. **API Keys:** Criar nova chave
4. **Domain:** Adicionar seu domínio (opcional)

### Configuração:
```typescript
// lib/email.ts
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY

export const sendEmail = async (data: {
  to: string
  subject: string
  html: string
  from?: string
}) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: data.from || 'noreply@okawe.com',
      to: data.to,
      subject: data.subject,
      html: data.html
    })
  })

  return response.json()
}

// Templates de email
export const emailTemplates = {
  welcome: (name: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #164E63;">Bem-vindo ao Okawe!</h1>
      <p>Olá ${name},</p>
      <p>Seja bem-vindo à plataforma de gestão criativa mais completa do mercado.</p>
      <p>Você já pode começar a criar seus projetos e gerenciar sua equipe.</p>
      <a href="https://okawe.com/dashboard" style="background: #164E63; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Acessar Dashboard
      </a>
      <p>Att,<br>Equipe Okawe</p>
    </div>
  `,
  
  projectApproval: (projectName: string, clientName: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #164E63;">Projeto Aprovado!</h1>
      <p>Olá ${clientName},</p>
      <p>Seu projeto <strong>${projectName}</strong> foi aprovado e está pronto para a próxima fase.</p>
      <a href="https://okawe.com/projects" style="background: #16A34A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Ver Projeto
      </a>
    </div>
  `,

  paymentSuccess: (planName: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #16A34A;">Pagamento Confirmado!</h1>
      <p>Seu plano ${planName} está ativo.</p>
      <p>Agora você tem acesso a todos os recursos premium do Okawe.</p>
    </div>
  `
}

// Funções específicas
export const sendWelcomeEmail = (email: string, name: string) =>
  sendEmail({
    to: email,
    subject: 'Bem-vindo ao Okawe!',
    html: emailTemplates.welcome(name)
  })

export const sendProjectApprovalEmail = (email: string, projectName: string, clientName: string) =>
  sendEmail({
    to: email,
    subject: `Projeto ${projectName} Aprovado!`,
    html: emailTemplates.projectApproval(projectName, clientName)
  })
```

### Integração com Supabase:
```typescript
// lib/hooks/useEmailNotifications.ts
import { useEffect } from 'react'
import { supabase } from '../supabase'
import { sendProjectApprovalEmail, sendWelcomeEmail } from '../email'

export const useEmailNotifications = () => {
  useEffect(() => {
    // Escutar novos usuários
    const userSubscription = supabase
      .channel('users')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'users'
      }, (payload) => {
        const newUser = payload.new
        sendWelcomeEmail(newUser.email, newUser.name)
      })
      .subscribe()

    // Escutar aprovações de projeto
    const projectSubscription = supabase
      .channel('projects')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'projects',
        filter: 'status=eq.approved'
      }, async (payload) => {
        const project = payload.new
        
        // Buscar dados do cliente
        const { data: client } = await supabase
          .from('users')
          .select('name, email')
          .eq('id', project.client_id)
          .single()

        if (client) {
          sendProjectApprovalEmail(client.email, project.name, client.name)
        }
      })
      .subscribe()

    return () => {
      userSubscription.unsubscribe()
      projectSubscription.unsubscribe()
    }
  }, [])
}
```

---

## 📊 5. GOOGLE ANALYTICS - MÉTRICAS

### Setup Analytics (3 minutos):
1. **Acesse:** [analytics.google.com](https://analytics.google.com)
2. **Create Account:** "Okawe SaaS"
3. **Create Property:** Nome do site
4. **Data Stream:** Web
5. **Copie:** Measurement ID

### Configuração:
```html
<!-- Adicionar ao index.html -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Eventos Customizados:
```typescript
// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Eventos específicos
export const analytics = {
  // Signup
  trackSignup: (method: string) =>
    trackEvent('sign_up', { method }),

  // Login
  trackLogin: (method: string) =>
    trackEvent('login', { method }),

  // Upgrade
  trackUpgrade: (planName: string, value: number) =>
    trackEvent('purchase', {
      currency: 'BRL',
      value,
      items: [{ item_name: planName }]
    }),

  // Project Created
  trackProjectCreated: () =>
    trackEvent('project_created'),

  // File Upload
  trackFileUpload: (fileType: string) =>
    trackEvent('file_upload', { file_type: fileType }),

  // Page View
  trackPageView: (pageName: string) =>
    trackEvent('page_view', { page_title: pageName })
}
```

### Usar nos Componentes:
```typescript
// components/AuthPage.tsx
import { analytics } from '../lib/analytics'

const handleLogin = async (email: string, password: string) => {
  try {
    const result = await signIn(email, password)
    if (result.data?.user) {
      analytics.trackLogin('email')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithGoogle()
    if (result.data?.user) {
      analytics.trackLogin('google')
    }
  } catch (error) {
    console.error('Google login error:', error)
  }
}
```

---

## 📁 6. VARIÁVEIS DE AMBIENTE

### .env (Local):
```env
# =====================================
# APLICAÇÃO
# =====================================
VITE_APP_NAME=Okawe
VITE_APP_URL=http://localhost:3000

# =====================================
# SUPABASE
# =====================================
VITE_SUPABASE_URL=https://seuprojetoid.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =====================================
# STRIPE
# =====================================
VITE_STRIPE_PUBLIC_KEY=pk_test_51234567890...
STRIPE_SECRET_KEY=sk_test_51234567890...
STRIPE_WEBHOOK_SECRET=whsec_1234567890...

# =====================================
# GOOGLE
# =====================================
VITE_GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=AIzaSyA1234567890...

# =====================================
# RESEND
# =====================================
VITE_RESEND_API_KEY=re_1234567890...

# =====================================
# ANALYTICS
# =====================================
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# =====================================
# UNSPLASH (OPCIONAL)
# =====================================
VITE_UNSPLASH_ACCESS_KEY=1234567890...
```

### Configurar na Vercel:
1. **Vercel Dashboard:** Settings → Environment Variables
2. **Adicionar todas as variáveis** (exceto as que começam com STRIPE_SECRET)
3. **Para production:** Trocar URLs de teste por produção

---

## ✅ CHECKLIST DE INTEGRAÇÃO

### Supabase:
- [ ] ✅ Projeto criado
- [ ] ✅ Database configurado
- [ ] ✅ RLS habilitado
- [ ] ✅ Cliente configurado
- [ ] ✅ Auth funcionando

### Stripe:
- [ ] 💳 Conta criada
- [ ] 💳 Produtos configurados
- [ ] 💳 Checkout funcionando
- [ ] 💳 Webhooks configurados
- [ ] 💳 Teste de pagamento ok

### Google Calendar:
- [ ] 📅 API habilitada
- [ ] 📅 OAuth configurado
- [ ] 📅 Cliente funcionando
- [ ] 📅 Eventos sendo criados
- [ ] 📅 Integração testada

### Resend:
- [ ] 📧 Conta criada
- [ ] 📧 API key configurada
- [ ] 📧 Templates prontos
- [ ] 📧 Emails sendo enviados
- [ ] 📧 Notificações funcionando

### Analytics:
- [ ] 📊 GA4 configurado
- [ ] 📊 Eventos customizados
- [ ] 📊 Tracking funcionando
- [ ] 📊 Métricas visíveis
- [ ] 📊 Relatórios ok

---

## 🎯 PRÓXIMOS PASSOS

### Hoje:
1. ✅ Configure Supabase
2. ✅ Implemente auth real
3. ✅ Teste todas integrações

### Esta Semana:
1. 💳 Configure Stripe
2. 📧 Implemente emails
3. 📊 Configure analytics
4. 🧪 Teste com usuários reais

### Próximo Mês:
1. 📈 Analise métricas
2. 🚀 Lance planos pagos
3. 📱 Desenvolva app mobile
4. 🤖 Adicione automações

**🎉 Com essas integrações, você terá um SaaS completo e profissional!**