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