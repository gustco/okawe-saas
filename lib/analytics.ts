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