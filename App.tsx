import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import PageRouter from './components/PageRouter';
import { useAppInitialization } from './lib/hooks/useAppInitialization';
import { useTheme } from './lib/hooks/useTheme';
import { useLanguage } from './lib/hooks/useLanguage';
import { handleLogin, handleLogout } from './lib/auth';
import { PageType } from './lib/types';
import { Language } from './lib/i18n';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  
  const {
    currentUser,
    setCurrentUser,
    userType,
    setUserType,
    isDarkMode,
    setIsDarkMode,
    currentLanguage,
    setCurrentLanguage,
    isLoading
  } = useAppInitialization();

  // Initialize hooks
  useTheme(isDarkMode, currentUser);
  useLanguage(currentLanguage, currentUser);

  // Check if user is logged in and set appropriate page
  React.useEffect(() => {
    if (currentUser && currentPage === 'landing') {
      setCurrentPage('dashboard');
    }
  }, [currentUser, currentPage]);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  const onLogin = (email: string, password?: string) => {
    return handleLogin(
      email, 
      password, 
      setCurrentUser, 
      setUserType, 
      setCurrentPage, 
      setIsDarkMode, 
      setCurrentLanguage
    );
  };

  const onLogout = () => {
    handleLogout(
      setCurrentUser, 
      setUserType, 
      setCurrentPage, 
      setIsDarkMode, 
      setCurrentLanguage
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <PageRouter
        currentPage={currentPage}
        userType={userType}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        currentLanguage={currentLanguage}
        onNavigate={navigateTo}
        onLogin={onLogin}
        onLogout={onLogout}
        onToggleTheme={toggleTheme}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}