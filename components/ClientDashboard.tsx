import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import Sidebar from './Sidebar';
import { localStorageService, User } from '../services/localStorage';
import { 
  FolderOpen, 
  FileText, 
  Calendar,
  CheckCircle2, 
  Clock,
  MessageSquare,
  Download,
  Eye
} from 'lucide-react';

interface ClientDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentUser: User | null;
}

export default function ClientDashboard({ onNavigate, onLogout, currentUser }: ClientDashboardProps) {
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = () => {
    if (!currentUser) return;

    const projects = localStorageService.getProjectsByUser(currentUser.id, 'client');
    const events = localStorageService.getEvents();
    
    setMyProjects(projects);
    
    // Extrair arquivos pendentes de aprovação
    const pendingFiles = projects.flatMap(project => 
      (project.files || [])
        .filter((file: any) => file.status === 'pending')
        .map((file: any) => ({
          ...file,
          projectName: project.name,
          projectId: project.id
        }))
    );
    
    setPendingApprovals(pendingFiles);
    setUpcomingEvents(events.filter((event: any) => 
      event.participants?.includes(currentUser.id)
    ).slice(0, 3));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'approved':
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planning':
        return 'Planejamento';
      case 'in_progress':
        return 'Em Andamento';
      case 'review':
        return 'Em Revisão';
      case 'approved':
        return 'Aprovado';
      case 'delivered':
        return 'Entregue';
      default:
        return status;
    }
  };

  const completedProjects = myProjects.filter(p => p.status === 'delivered').length;
  const totalBudget = myProjects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType="client" 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Meus Projetos</h1>
              <p className="text-muted-foreground">
                Bem-vindo, {currentUser?.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => onNavigate('calendar')}>
                <Calendar className="mr-2 h-4 w-4" />
                Agenda
              </Button>
              <Button onClick={() => onNavigate('files')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <FileText className="mr-2 h-4 w-4" />
                Ver Arquivos
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meus Projetos</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{myProjects.length}</div>
                <p className="text-xs text-muted-foreground">
                  {completedProjects} finalizados
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  R$ {totalBudget.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-muted-foreground">
                  Em {myProjects.length} projetos
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aprovações Pendentes</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{pendingApprovals.length}</div>
                <p className="text-xs text-coffee">
                  Aguardando sua análise
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meus Projetos */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Status dos Projetos
                </CardTitle>
                <CardDescription>
                  Acompanhe o progresso dos seus projetos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myProjects.length > 0 ? (
                  myProjects.map((project) => (
                    <div key={project.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          Prazo: {new Date(project.endDate).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-sm font-medium">
                          R$ {project.budget.toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum projeto encontrado</p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('projects')}
                >
                  Ver Detalhes dos Projetos
                </Button>
              </CardContent>
            </Card>

            {/* Aprovações Pendentes */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Aprovações Pendentes
                </CardTitle>
                <CardDescription>
                  Arquivos aguardando sua aprovação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingApprovals.length > 0 ? (
                  pendingApprovals.slice(0, 4).map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-coffee/10 rounded-lg border border-coffee/20">
                      <div className="p-2 bg-coffee/20 rounded-lg">
                        <FileText className="h-4 w-4 text-coffee" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{file.name}</h4>
                        <p className="text-xs text-muted-foreground">{file.projectName}</p>
                        <p className="text-xs text-muted-foreground">
                          Enviado por {file.uploadedBy} • {file.size} MB
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma aprovação pendente</p>
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
          </div>

          {/* Eventos e Comunicação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Eventos
                </CardTitle>
                <CardDescription>
                  Reuniões e prazos importantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Calendar className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
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

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comunicação
                </CardTitle>
                <CardDescription>
                  Atualizações e comentários recentes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="p-1 bg-success rounded-full">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Wireframes aprovados com sucesso!</p>
                      <p className="text-xs text-muted-foreground">2 dias atrás</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="p-1 bg-accent rounded-full">
                      <FileText className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Novos designs enviados para revisão</p>
                      <p className="text-xs text-muted-foreground">1 semana atrás</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-coffee/10 rounded-lg border border-coffee/20">
                    <div className="p-1 bg-coffee rounded-full">
                      <MessageSquare className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Reunião de briefing agendada</p>
                      <p className="text-xs text-muted-foreground">2 semanas atrás</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('projects')}
                >
                  Ver Todas as Atualizações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}