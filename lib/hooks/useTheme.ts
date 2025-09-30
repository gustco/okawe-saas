import { useEffect } from 'react';
import { localStorageService, User } from '../../services/localStorage';

export function useTheme(isDarkMode: boolean, currentUser: User | null) {
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference
    if (currentUser) {
      const settings = localStorageService.getSettings();
      localStorageService.saveSettings({
        ...settings,
        theme: isDarkMode ? 'dark' : 'light'
      });
    }
  }, [isDarkMode, currentUser]);
}