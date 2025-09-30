import React from 'react';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import AdminDashboard from './AdminDashboard';
import CollaboratorDashboard from './CollaboratorDashboard';
import ClientDashboard from './ClientDashboard';
import ProjectsPage from './ProjectsPage';
import ClientsPage from './ClientsPage';
import TeamPage from './TeamPage';
import FilesPage from './FilesPage';
import FinancialPage from './FinancialPage';
import CalendarPage from './CalendarPage';
import ChatPage from './ChatPage';
import SettingsPage from './SettingsPage';
import { User } from '../services/localStorage';
import { PageType, UserType } from '../lib/types';
import { Language } from '../lib/i18n';

interface PageRouterProps {
  currentPage: PageType;
  userType: UserType;
  currentUser: User | null;
  isDarkMode: boolean;
  currentLanguage: Language;
  onNavigate: (page: PageType) => void;
  onLogin: (email: string, password?: string) => Promise<boolean>;
  onLogout: () => void;
  onToggleTheme: () => void;
  onLanguageChange: (language: Language) => void;
}

export default function PageRouter({
  currentPage,
  userType,
  currentUser,
  isDarkMode,
  currentLanguage,
  onNavigate,
  onLogin,
  onLogout,
  onToggleTheme,
  onLanguageChange
}: PageRouterProps) {
  // Common props for pages with sidebar
  const commonProps = {
    onNavigate,
    onLogout,
    userType,
    currentUser,
    isDarkMode,
    onToggleTheme
  };

  switch (currentPage) {
    case 'landing':
      return <LandingPage onNavigate={onNavigate} />;
    
    case 'auth':
      return <AuthPage onLogin={onLogin} onNavigate={onNavigate} />;
    
    case 'dashboard':
      if (userType === 'admin') {
        return <AdminDashboard {...commonProps} />;
      } else if (userType === 'collaborator') {
        return <CollaboratorDashboard {...commonProps} />;
      } else if (userType === 'client') {
        return <ClientDashboard {...commonProps} />;
      }
      return <LandingPage onNavigate={onNavigate} />;
    
    case 'projects':
      return <ProjectsPage {...commonProps} />;
    
    case 'clients':
      return <ClientsPage {...commonProps} />;
    
    case 'team':
      return <TeamPage {...commonProps} />;
    
    case 'files':
      return <FilesPage {...commonProps} />;
    
    case 'financial':
      return <FinancialPage {...commonProps} />;
    
    case 'calendar':
      return <CalendarPage {...commonProps} />;
    
    case 'chat':
      return <ChatPage {...commonProps} />;
    
    case 'settings':
      return (
        <SettingsPage 
          {...commonProps}
          onLanguageChange={onLanguageChange}
          currentLanguage={currentLanguage}
        />
      );
    
    default:
      return <LandingPage onNavigate={onNavigate} />;
  }
}