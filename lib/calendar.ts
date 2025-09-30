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