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