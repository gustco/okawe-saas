import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { User } from '../services/localStorage';
import { useTranslation } from '../lib/i18n';
import OkaweLogo from './ui/OkaweLogo';
import AvatarUpload from './ui/AvatarUpload';
import {
  Home,
  FolderOpen,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  Hash,
  Lock,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';

interface SidebarProps {
  userType: 'admin' | 'collaborator' | 'client';
  currentUser: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function Sidebar({ 
  userType, 
  currentUser, 
  onNavigate, 
  onLogout, 
  isDarkMode = false, 
  onToggleTheme 
}: SidebarProps) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['workspace', 'projects']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navigationItems = {
    admin: [
      { id: 'dashboard', label: t('nav.overview'), icon: Home, page: 'dashboard', count: null },
      { id: 'projects', label: t('nav.projects'), icon: FolderOpen, page: 'projects', count: 8 },
      { id: 'clients', label: t('nav.clients'), icon: Users, page: 'clients', count: null },
      { id: 'team', label: t('nav.team'), icon: Users, page: 'team', count: null },
      { id: 'files', label: t('nav.files'), icon: FileText, page: 'files', count: 15 },
      { id: 'financial', label: t('nav.financial'), icon: DollarSign, page: 'financial', count: null },
      { id: 'calendar', label: t('nav.calendar'), icon: Calendar, page: 'calendar', count: 3 },
      { id: 'chat', label: t('nav.chat'), icon: MessageSquare, page: 'chat', count: 12 },
    ],
    collaborator: [
      { id: 'dashboard', label: t('nav.overview'), icon: Home, page: 'dashboard', count: null },
      { id: 'projects', label: t('projects.myProjects'), icon: FolderOpen, page: 'projects', count: 4 },
      { id: 'files', label: t('nav.files'), icon: FileText, page: 'files', count: 8 },
      { id: 'calendar', label: t('nav.calendar'), icon: Calendar, page: 'calendar', count: 2 },
      { id: 'chat', label: t('nav.chat'), icon: MessageSquare, page: 'chat', count: 5 },
    ],
    client: [
      { id: 'dashboard', label: t('projects.myProjects'), icon: Home, page: 'dashboard', count: null },
      { id: 'files', label: t('nav.files'), icon: FileText, page: 'files', count: 3 },
      { id: 'calendar', label: t('nav.calendar'), icon: Calendar, page: 'calendar', count: 1 },
    ]
  };

  const projectItems = [
    { id: 'redesign', name: 'Website Redesign', isPrivate: false, unread: 3 },
    { id: 'branding', name: 'Brand Identity', isPrivate: true, unread: 0 },
    { id: 'marketing', name: 'Marketing Campaign', isPrivate: false, unread: 1 },
  ];

  const teamChannels = [
    { id: 'general', name: 'Geral', isPrivate: false, unread: 5 },
    { id: 'design', name: 'Equipe Design', isPrivate: true, unread: 2 },
    { id: 'dev', name: 'Desenvolvimento', isPrivate: true, unread: 0 },
  ];

  const currentItems = navigationItems[userType] || [];

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'admin':
        return t('userType.admin');
      case 'collaborator':
        return t('userType.collaborator');
      case 'client':
        return t('userType.client');
      default:
        return type;
    }
  };

  const handleAvatarChange = (avatarUrl: string) => {
    // Aqui você pode atualizar o estado do usuário ou salvar no localStorage
    console.log('Avatar atualizado:', avatarUrl);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsCollapsed(true)} />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        ${isCollapsed ? 'w-16' : 'w-72'}
        bg-sidebar border-r border-sidebar-border
        transition-all duration-300 ease-in-out
        transform ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            {!isCollapsed ? (
              <OkaweLogo size="md" variant="full" />
            ) : (
              <OkaweLogo size="md" variant="icon" />
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-b border-sidebar-border ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <AvatarUpload 
              currentUser={currentUser}
              onAvatarChange={handleAvatarChange}
              size={isCollapsed ? 'sm' : 'md'}
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentUser?.name || 'User'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {getUserTypeLabel(userType)}
                  </Badge>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Theme Controls */}
        {!isCollapsed && onToggleTheme && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sidebar-foreground">Tema</span>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onToggleTheme}
                  className="data-[state=checked]:bg-accent"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {/* Search */}
            {!isCollapsed && (
              <div className="px-2 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('common.search') + '...'}
                    className="w-full h-8 pl-9 pr-3 bg-input border border-input-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {/* Workspace Section */}
            <div className="px-2">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection('workspace')}
                  className="flex items-center gap-2 w-full px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {expandedSections.includes('workspace') ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                  WORKSPACE
                </button>
              )}
              
              {(isCollapsed || expandedSections.includes('workspace')) && (
                <div className="mt-1 space-y-1">
                  {currentItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.page)}
                      className={`
                        flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm transition-colors
                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.count && (
                            <Badge variant="secondary" className="text-xs h-5 min-w-[20px] px-1">
                              {item.count}
                            </Badge>
                          )}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {userType !== 'client' && (
              <>
                <Separator className="my-2" />
                
                {/* Projects Section */}
                <div className="px-2">
                  {!isCollapsed && (
                    <button
                      onClick={() => toggleSection('projects')}
                      className="flex items-center gap-2 w-full px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {expandedSections.includes('projects') ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                      PROJETOS
                      <Button variant="ghost" size="sm" className="ml-auto h-4 w-4 p-0">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </button>
                  )}
                  
                  {(isCollapsed || expandedSections.includes('projects')) && (
                    <div className="mt-1 space-y-1">
                      {projectItems.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => onNavigate('projects')}
                          className={`
                            flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm transition-colors
                            hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                            ${isCollapsed ? 'justify-center' : ''}
                          `}
                        >
                          <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-left truncate">{project.name}</span>
                              <div className="flex items-center gap-1">
                                {project.isPrivate && (
                                  <Lock className="h-3 w-3 text-muted-foreground" />
                                )}
                                {project.unread > 0 && (
                                  <Badge variant="destructive" className="text-xs h-4 min-w-[16px] px-1">
                                    {project.unread}
                                  </Badge>
                                )}
                              </div>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Separator className="my-2" />

                {/* Team Channels Section */}
                <div className="px-2">
                  {!isCollapsed && (
                    <button
                      onClick={() => toggleSection('channels')}
                      className="flex items-center gap-2 w-full px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {expandedSections.includes('channels') ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                      CANAIS DA EQUIPE
                      <Button variant="ghost" size="sm" className="ml-auto h-4 w-4 p-0">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </button>
                  )}
                  
                  {(isCollapsed || expandedSections.includes('channels')) && (
                    <div className="mt-1 space-y-1">
                      {teamChannels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => onNavigate('chat')}
                          className={`
                            flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm transition-colors
                            hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                            ${isCollapsed ? 'justify-center' : ''}
                          `}
                        >
                          <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-left truncate">{channel.name}</span>
                              <div className="flex items-center gap-1">
                                {channel.isPrivate && (
                                  <Lock className="h-3 w-3 text-muted-foreground" />
                                )}
                                {channel.unread > 0 && (
                                  <Badge variant="destructive" className="text-xs h-4 min-w-[16px] px-1">
                                    {channel.unread}
                                  </Badge>
                                )}
                              </div>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings')}
            className={`w-full ${isCollapsed ? 'px-2' : 'justify-start'} text-sidebar-foreground hover:bg-sidebar-accent`}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && <span className="ml-3">{t('nav.settings')}</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className={`w-full ${isCollapsed ? 'px-2' : 'justify-start'} text-destructive hover:bg-destructive/10`}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-3">{t('nav.logout')}</span>}
          </Button>
        </div>
      </div>
    </>
  );
}