import { useEffect } from 'react';
import { localStorageService, User } from '../../services/localStorage';
import { i18n, Language } from '../i18n';

export function useLanguage(currentLanguage: Language, currentUser: User | null) {
  useEffect(() => {
    i18n.setLanguage(currentLanguage);
    if (currentUser) {
      const settings = localStorageService.getSettings();
      localStorageService.saveSettings({
        ...settings,
        language: currentLanguage
      });
    }
  }, [currentLanguage, currentUser]);
}