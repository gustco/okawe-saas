import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock,
  Users,
  Video,
  MapPin
} from 'lucide-react';
import Sidebar from './Sidebar';

interface CalendarPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: 'admin' | 'collaborator' | 'client' | null;
}

export default function CalendarPage({ onNavigate, onLogout, userType }: CalendarPageProps) {
  const [currentDate] = useState(new Date());

  const meetings = [
    {
      id: 1,
      title: 'Daily Standup',
      time: '09:00 - 09:30',
      date: '2024-02-12',
      type: 'team',
      attendees: ['Ana Silva', 'João Santos', 'Maria Costa'],
      location: 'Google Meet',
      project: 'Geral'
    },
    {
      id: 2,
      title: 'Reunião Cliente - TechCorp',
      time: '14:00 - 15:00',
      date: '2024-02-12',
      type: 'client',
      attendees: ['Ana Silva', 'João Silva (Cliente)'],
      location: 'Google Meet',
      project: 'Identidade Visual - TechCorp'
    },
    {
      id: 3,
      title: 'Review de Design',
      time: '16:30 - 17:30',
      date: '2024-02-12',
      type: 'review',
      attendees: ['Ana Silva', 'Pedro Lima'],
      location: 'Escritório',
      project: 'Website - StartupXYZ'
    },
    {
      id: 4,
      title: 'Apresentação Final',
      time: '10:00 - 11:00',
      date: '2024-02-15',
      type: 'client',
      attendees: ['Ana Silva', 'Maria Costa', 'Pedro Costa (Cliente)'],
      location: 'Google Meet',
      project: 'Material Gráfico - Empresa ABC'
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'team': return 'default';
      case 'client': return 'destructive';
      case 'review': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'team': return Users;
      case 'client': return Video;
      case 'review': return CalendarIcon;
      default: return CalendarIcon;
    }
  };

  const todayMeetings = meetings.filter(m => m.date === '2024-02-12');
  const upcomingMeetings = meetings.filter(m => new Date(m.date) > new Date('2024-02-12'));

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        currentPage="calendar" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userType={userType} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold">Calendário</h1>
              <p className="text-muted-foreground">
                {userType === 'client' 
                  ? 'Suas reuniões agendadas'
                  : 'Gerencie reuniões e compromissos'
                }
              </p>
            </div>
            {userType !== 'client' && (
              <Button className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Nova Reunião
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold">{todayMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Reuniões Hoje</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold">{upcomingMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Próximas Reuniões</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-semibold">{meetings.filter(m => m.type === 'client').length}</p>
                <p className="text-sm text-muted-foreground">Com Clientes</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle>Hoje - 12 de Fevereiro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayMeetings.map((meeting) => {
                  const IconComponent = getTypeIcon(meeting.type);
                  
                  return (
                    <div key={meeting.id} className="flex items-start gap-4 p-4 bg-accent/5 rounded-xl">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{meeting.title}</h4>
                          <Badge variant={getTypeColor(meeting.type)} className="text-xs">
                            {meeting.type === 'team' ? 'Equipe' : 
                             meeting.type === 'client' ? 'Cliente' : 'Review'}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{meeting.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            <span>{meeting.attendees.length} participantes</span>
                          </div>
                          <p className="text-xs">{meeting.project}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Entrar
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle>Próximas Reuniões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMeetings.map((meeting) => {
                  const IconComponent = getTypeIcon(meeting.type);
                  
                  return (
                    <div key={meeting.id} className="flex items-start gap-4 p-4 border border-border/50 rounded-xl">
                      <div className="w-10 h-10 bg-coffee/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-coffee" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{meeting.title}</h4>
                          <Badge variant={getTypeColor(meeting.type)} className="text-xs">
                            {meeting.type === 'team' ? 'Equipe' : 
                             meeting.type === 'client' ? 'Cliente' : 'Review'}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-3 h-3" />
                            <span>{meeting.date} às {meeting.time.split(' - ')[0]}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{meeting.location}</span>
                          </div>
                          <p className="text-xs">{meeting.project}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Integração com Google Calendar</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Conecte seu Google Calendar</h3>
              <p className="text-muted-foreground mb-6">
                Sincronize automaticamente suas reuniões e compromissos
              </p>
              <Button className="rounded-xl">
                Conectar Google Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}