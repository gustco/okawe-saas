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