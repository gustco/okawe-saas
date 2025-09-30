import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckSquare,
  Clock,
  User
} from 'lucide-react';
import Sidebar from './Sidebar';

interface TeamPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: 'admin' | 'collaborator' | 'client' | null;
}

export default function TeamPage({ onNavigate, onLogout, userType }: TeamPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const team = [
    {
      id: 1,
      name: 'Ana Silva',
      role: 'Designer Sênior',
      department: 'Design',
      email: 'ana.silva@okawe.com',
      phone: '(11) 99999-1111',
      location: 'São Paulo, SP',
      status: 'online',
      workload: 85,
      activeTasks: 5,
      completedTasks: 23,
      joinDate: '2023-06-15',
      skills: ['UI/UX', 'Branding', 'Figma'],
      avatar: 'AS',
      currentProject: 'Identidade Visual - TechCorp'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Desenvolvedor Frontend',
      department: 'Desenvolvimento',
      email: 'joao.santos@okawe.com',
      phone: '(11) 99999-2222',
      location: 'Rio de Janeiro, RJ',
      status: 'offline',
      workload: 70,
      activeTasks: 3,
      completedTasks: 18,
      joinDate: '2023-08-10',
      skills: ['React', 'Next.js', 'TypeScript'],
      avatar: 'JS',
      currentProject: 'Website - StartupXYZ'
    },
    {
      id: 3,
      name: 'Maria Costa',
      role: 'Copywriter',
      department: 'Conteúdo',
      email: 'maria.costa@okawe.com',
      phone: '(11) 99999-3333',
      location: 'Belo Horizonte, MG',
      status: 'online',
      workload: 60,
      activeTasks: 4,
      completedTasks: 31,
      joinDate: '2023-05-20',
      skills: ['Copywriting', 'SEO', 'Conteúdo'],
      avatar: 'MC',
      currentProject: 'Material Gráfico - Empresa ABC'
    },
    {
      id: 4,
      name: 'Pedro Lima',
      role: 'Designer Júnior',
      department: 'Design',
      email: 'pedro.lima@okawe.com',
      phone: '(11) 99999-4444',
      location: 'Porto Alegre, RS',
      status: 'online',
      workload: 45,
      activeTasks: 2,
      completedTasks: 12,
      joinDate: '2024-01-15',
      skills: ['Ilustração', 'Photoshop', 'InDesign'],
      avatar: 'PL',
      currentProject: 'Website - StartupXYZ'
    },
  ];

  const filteredTeam = team.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-success' : 'bg-muted';
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'text-destructive';
    if (workload >= 60) return 'text-coffee';
    return 'text-success';
  };

  // Only admin and collaborators can see this page
  if (userType === 'client') {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar 
          currentPage="team" 
          onNavigate={onNavigate} 
          onLogout={onLogout} 
          userType={userType} 
        />
        <main className="flex-1 flex items-center justify-center">
          <Card className="rounded-2xl border-border/50 max-w-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">Acesso Restrito</h3>
              <p className="text-muted-foreground">
                Clientes não podem acessar informações da equipe.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        currentPage="team" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userType={userType} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold">Equipe</h1>
              <p className="text-muted-foreground">Gerencie todos os colaboradores</p>
            </div>
            {userType === 'admin' && (
              <Button className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Colaborador
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar colaboradores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold">{team.length}</p>
                <p className="text-sm text-muted-foreground">Total da Equipe</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold text-success">
                  {team.filter(m => m.status === 'online').length}
                </p>
                <p className="text-sm text-muted-foreground">Online Agora</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold text-accent">
                  {team.reduce((sum, m) => sum + m.activeTasks, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Tarefas Ativas</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold text-coffee">
                  {Math.round(team.reduce((sum, m) => sum + m.workload, 0) / team.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Carga Média</p>
              </CardContent>
            </Card>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeam.map((member) => (
              <Card key={member.id} className="rounded-2xl border-border/50 hover:border-accent transition-colors duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-accent/10 text-accent">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {member.department}
                      </Badge>
                      {userType === 'admin' && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{member.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Na equipe desde {member.joinDate}</span>
                    </div>
                  </div>

                  {/* Workload */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Carga de Trabalho</span>
                      <span className={`font-medium ${getWorkloadColor(member.workload)}`}>
                        {member.workload}%
                      </span>
                    </div>
                    <Progress value={member.workload} className="h-2" />
                  </div>

                  {/* Current Project */}
                  <div className="p-3 bg-accent/5 rounded-xl">
                    <p className="text-sm font-medium">Projeto Atual</p>
                    <p className="text-xs text-muted-foreground">{member.currentProject}</p>
                  </div>

                  {/* Tasks Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4 text-accent" />
                        <p className="text-lg font-semibold">{member.activeTasks}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Tarefas Ativas</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <CheckSquare className="w-4 h-4 text-success" />
                        <p className="text-lg font-semibold">{member.completedTasks}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Concluídas</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Habilidades</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                      <Mail className="w-4 h-4 mr-1" />
                      Contatar
                    </Button>
                    {userType === 'admin' && (
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                        <User className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeam.length === 0 && (
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhum colaborador encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Não encontramos colaboradores com os critérios de busca especificados.
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Limpar busca
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}