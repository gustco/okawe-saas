import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import Sidebar from './Sidebar';
import { localStorageService, User } from '../services/localStorage';
import { 
  CheckSquare, 
  FolderOpen, 
  Calendar,
  Clock,
  Upload,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  FileText,
  Users,
  Target,
  Activity,
  Plus,
  Filter,
  ArrowRight
} from 'lucide-react';

interface CollaboratorDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentUser: User | null;
}

export default function CollaboratorDashboard({ onNavigate, onLogout, currentUser }: CollaboratorDashboardProps) {
  const [myTasks, setMyTasks] = useState<any[]>([]);
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<any>({});
  const [recentUploads, setRecentUploads] = useState<any[]>([]);
  const [teamMessages, setTeamMessages] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = () => {
    if (!currentUser) return;

    try {
      // Carregar tarefas do usuário
      const allTasks = localStorageService.getTasksByUser(currentUser.id);
      setMyTasks(allTasks.slice(0, 6));

      // Carregar projetos do usuário
      const userProjects = localStorageService.getProjectsByUser(currentUser.id, 'collaborator');
      setMyProjects(userProjects.slice(0, 4));

      // Carregar eventos próximos
      const events = localStorageService.getEvents();
      const userEvents = events
        .filter(event => event.participants.includes(currentUser.id))
        .filter(event => new Date(event.startDate) > new Date())
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 3);
      setUpcomingEvents(userEvents);

      // Calcular estatísticas semanais
      const completedTasks = allTasks.filter(t => t.status === 'done').length;
      const totalTasks = allTasks.length;
      const inProgressTasks = allTasks.filter(t => t.status === 'in_progress').length;
      const overdueTasks = allTasks.filter(t => 
        t.status !== 'done' && new Date(t.dueDate) < new Date()
      ).length;

      setWeeklyStats({
        completedTasks,
        totalTasks,
        inProgressTasks,
        overdueTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        activeProjects: userProjects.filter(p => p.status === 'in_progress').length
      });

      // Simular uploads recentes
      const uploads = userProjects
        .flatMap(p => p.files || [])
        .filter(f => f.uploadedBy === currentUser.name)
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .slice(0, 3);
      setRecentUploads(uploads);

      // Carregar mensagens recentes da equipe
      const messages = localStorageService.getMessages()
        .filter(m => m.userId !== currentUser.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 4);
      setTeamMessages(messages);

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard colaborador:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-coffee text-coffee-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'Urgente';
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-success text-success-foreground';
      case 'in_progress':
        return 'bg-accent text-accent-foreground';
      case 'todo':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo':
        return 'A Fazer';
      case 'in_progress':
        return 'Em Andamento';
      case 'done':
        return 'Concluída';
      default:
        return status;
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'in_progress':
        return 'bg-accent text-accent-foreground';
      case 'review':
        return 'bg-coffee text-coffee-foreground';
      case 'planning':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isTaskOverdue = (dueDate: string, status: string) => {
    return status !== 'done' && new Date(dueDate) < new Date();
  };

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Agora há pouco';
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType="collaborator" 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Meu Workspace</h1>
              <p className="text-muted-foreground">
                Bem-vindo, {currentUser?.name}. Vamos ser produtivos hoje!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => onNavigate('calendar')}>
                <Calendar className="mr-2 h-4 w-4" />
                Agenda
              </Button>
              <Button onClick={() => onNavigate('chat')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat da Equipe
              </Button>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{weeklyStats.completedTasks || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {weeklyStats.completionRate || 0}% de conclusão
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{weeklyStats.inProgressTasks || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {weeklyStats.overdueTasks > 0 ? (
                    <span className="text-coffee flex items-center">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      {weeklyStats.overdueTasks} em atraso
                    </span>
                  ) : (
                    <span className="text-success">Tudo em dia!</span>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{weeklyStats.activeProjects || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {myProjects.length} projetos total
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uploads Recentes</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{recentUploads.length}</div>
                <p className="text-xs text-muted-foreground">
                  Esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Minhas Tarefas */}
            <Card className="lg:col-span-2 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5" />
                      Minhas Tarefas
                    </CardTitle>
                    <CardDescription>
                      Tarefas atribuídas a você ordenadas por prioridade
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('projects')}>
                    Ver Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {myTasks.length > 0 ? (
                  myTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`p-4 rounded-lg border transition-colors hover:bg-muted/30 cursor-pointer ${
                        isTaskOverdue(task.dueDate, task.status) 
                          ? 'border-destructive/30 bg-destructive/5' 
                          : 'border-border/50 bg-muted/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={getPriorityColor(task.priority)}>
                              {getPriorityLabel(task.priority)}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {getStatusLabel(task.status)}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {task.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            {task.estimatedHours && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{task.estimatedHours}h estimadas</span>
                              </div>
                            )}
                          </div>
                          
                          {isTaskOverdue(task.dueDate, task.status) && (
                            <div className="flex items-center gap-1 mt-2 text-destructive text-xs">
                              <AlertCircle className="h-3 w-3" />
                              <span>Tarefa em atraso</span>
                            </div>
                          )}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="ml-4">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma tarefa atribuída</p>
                    <p className="text-sm mt-1">Você está livre para novas atribuições!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progresso Semanal */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progresso Semanal
                </CardTitle>
                <CardDescription>
                  Sua performance esta semana
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Conclusão de Tarefas</span>
                      <span className="text-sm font-medium">{weeklyStats.completionRate || 0}%</span>
                    </div>
                    <Progress value={weeklyStats.completionRate || 0} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Concluídas</span>
                      <span className="font-medium text-success">{weeklyStats.completedTasks || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Em andamento</span>
                      <span className="font-medium text-accent">{weeklyStats.inProgressTasks || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Em atraso</span>
                      <span className="font-medium text-destructive">{weeklyStats.overdueTasks || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Projetos ativos</span>
                    <span className="font-medium">{weeklyStats.activeProjects || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meus Projetos */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      Meus Projetos
                    </CardTitle>
                    <CardDescription>
                      Projetos nos quais você está trabalhando
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('projects')}>
                    Ver Todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {myProjects.length > 0 ? (
                  myProjects.map((project) => (
                    <div key={project.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{project.clientName}</p>
                        </div>
                        <Badge className={getProjectStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                        <span>Prazo: {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                        <span>R$ {project.budget.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum projeto atribuído</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Eventos
                </CardTitle>
                <CardDescription>
                  Sua agenda dos próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Calendar className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.startDate).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(event.startDate).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {event.location && (
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        )}
                        <Badge size="sm" className="mt-1">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum evento próximo</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('calendar')}
                >
                  Ver Calendário Completo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Uploads Recentes e Chat da Equipe */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Uploads Recentes
                </CardTitle>
                <CardDescription>
                  Seus arquivos enviados recentemente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUploads.length > 0 ? (
                  recentUploads.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <FileText className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{file.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(file.uploadedAt)} • {file.size} MB
                        </p>
                      </div>
                      <Badge className={
                        file.status === 'approved' ? 'bg-success text-success-foreground' :
                        file.status === 'pending' ? 'bg-coffee text-coffee-foreground' :
                        'bg-destructive text-destructive-foreground'
                      }>
                        {file.status === 'approved' ? 'Aprovado' :
                         file.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum upload recente</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('files')}
                >
                  Ver Todos os Arquivos
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat da Equipe
                </CardTitle>
                <CardDescription>
                  Últimas mensagens da equipe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMessages.length > 0 ? (
                  teamMessages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {message.userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma mensagem recente</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('chat')}
                >
                  Abrir Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}