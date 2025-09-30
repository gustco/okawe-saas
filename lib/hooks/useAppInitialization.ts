import { useState, useEffect } from 'react';
import { localStorageService, User } from '../../services/localStorage';
import { i18n, Language } from '../i18n';
import { UserType } from '../types';

export function useAppInitialization() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');
  const [isLoading, setIsLoading] = useState(true);

  const initializeApp = async () => {
    try {
      // Initialize demo data on first run
      localStorageService.initializeData();
      
      // Check for logged in user
      const savedUser = localStorageService.getCurrentUser();
      if (savedUser) {
        setCurrentUser(savedUser);
        setUserType(savedUser.type);
      }

      // Load saved settings
      const settings = localStorageService.getSettings();
      setIsDarkMode(settings.theme === 'dark');
      
      // Load saved language
      const savedLanguage = (settings.language as Language) || i18n.getLanguage();
      setCurrentLanguage(savedLanguage);
      i18n.setLanguage(savedLanguage);
      
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return {
    currentUser,
    setCurrentUser,
    userType,
    setUserType,
    isDarkMode,
    setIsDarkMode,
    currentLanguage,
    setCurrentLanguage,
    isLoading,
    initializeApp
  };
}