import { localStorageService } from '../services/localStorage';
import { i18n, Language } from './i18n';

export const handleLogin = async (
  email: string, 
  password?: string,
  setCurrentUser: (user: any) => void,
  setUserType: (type: any) => void,
  setCurrentPage: (page: any) => void,
  setIsDarkMode: (dark: boolean) => void,
  setCurrentLanguage: (lang: Language) => void
): Promise<boolean> => {
  try {
    const user = localStorageService.authenticate(email, password);
    if (user) {
      setCurrentUser(user);
      setUserType(user.type);
      setCurrentPage('dashboard');
      
      // Load user settings
      const settings = localStorageService.getSettings();
      setIsDarkMode(settings.theme === 'dark');
      
      const savedLanguage = (settings.language as Language) || 'pt';
      setCurrentLanguage(savedLanguage);
      i18n.setLanguage(savedLanguage);
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const handleLogout = (
  setCurrentUser: (user: any) => void,
  setUserType: (type: any) => void,
  setCurrentPage: (page: any) => void,
  setIsDarkMode: (dark: boolean) => void,
  setCurrentLanguage: (lang: Language) => void
) => {
  localStorageService.logout();
  setCurrentUser(null);
  setUserType(null);
  setCurrentPage('landing');
  
  // Reset settings to default
  setIsDarkMode(false);
  setCurrentLanguage('pt');
  i18n.setLanguage('pt');
};