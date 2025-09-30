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