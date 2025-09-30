import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import Sidebar from './Sidebar';
import { localStorageService, User } from '../services/localStorage';
import { useTranslation } from '../lib/i18n';
import { 
  Users, 
  FolderOpen, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Calendar,
  MessageSquare,
  FileText,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentUser: User | null;
  userType?: string;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function AdminDashboard({ 
  onNavigate, 
  onLogout, 
  currentUser, 
  isDarkMode, 
  onToggleTheme 
}: AdminDashboardProps) {
  const { t } = useTranslation();
  const [stats, setStats] = useState<any>({});
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [teamActivity, setTeamActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    try {
      // Load stats
      const dashboardStats = localStorageService.getStats();
      setStats(dashboardStats);

      // Load recent projects
      const projects = localStorageService.getProjects().slice(0, 5);
      setRecentProjects(projects);

      // Load recent tasks
      const allTasks = localStorageService.getTasksByUser('all').slice(0, 6);
      setRecentTasks(allTasks);

      // Mock team activity
      setTeamActivity([
        { id: 1, user: 'João Santos', action: 'completou', target: 'Design System', time: '2 min atrás', type: 'task' },
        { id: 2, user: 'Maria Oliveira', action: 'enviou', target: 'Wireframes Mobile', time: '15 min atrás', type: 'file' },
        { id: 3, user: 'Cliente Empresa', action: 'aprovou', target: 'Logo Principal', time: '1h atrás', type: 'approval' },
        { id: 4, user: 'João Santos', action: 'criou', target: 'Reunião Semanal', time: '2h atrás', type: 'meeting' },
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'delivered':
        return 'text-success';
      case 'in_progress':
      case 'review':
        return 'text-warning';
      case 'planning':
        return 'text-info';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'delivered':
        return 'default';
      case 'in_progress':
      case 'review':
        return 'secondary';
      case 'planning':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType="admin" 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{t('dashboard.welcome')}, {currentUser?.name}!</h1>
              <p className="text-muted-foreground">{t('dashboard.admin.subtitle')}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => onNavigate('projects')} className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.activeProjects')}</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeProjects || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">+12%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.monthlyRevenue')}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45.231</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">+8%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.activeTeam')}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">+2</span> novos membros este mês
                </p>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('metrics.pendingTasks')}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingTasks || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-warning">{stats.overdueTasks || 0}</span> em atraso
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Projetos Recentes</CardTitle>
                  <CardDescription>Últimos projetos em andamento</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate('projects')}>
                  Ver Todos
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.clientName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        {t(`projects.status.${project.status}`) || project.status}
                      </Badge>
                      <div className="w-16">
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Atividade da Equipe</CardTitle>
                  <CardDescription>Últimas ações realizadas</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate('chat')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                        {activity.user.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {activity.type === 'task' && <CheckCircle className="h-4 w-4 text-success" />}
                      {activity.type === 'file' && <FileText className="h-4 w-4 text-info" />}
                      {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-success" />}
                      {activity.type === 'meeting' && <Calendar className="h-4 w-4 text-warning" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2" 
                  onClick={() => onNavigate('projects')}
                >
                  <FolderOpen className="h-6 w-6" />
                  Projetos
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2" 
                  onClick={() => onNavigate('clients')}
                >
                  <Users className="h-6 w-6" />
                  Clientes
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2" 
                  onClick={() => onNavigate('financial')}
                >
                  <DollarSign className="h-6 w-6" />
                  Financeiro
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2" 
                  onClick={() => onNavigate('calendar')}
                >
                  <Calendar className="h-6 w-6" />
                  Calendário
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}