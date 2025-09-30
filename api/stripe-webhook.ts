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