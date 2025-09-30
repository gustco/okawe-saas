import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import Sidebar from './Sidebar';
import { localStorageService, User, Client } from '../services/localStorage';
import { 
  Users, 
  Plus, 
  Search, 
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FolderOpen,
  MoreHorizontal
} from 'lucide-react';

interface ClientsPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: string | null;
  currentUser: User | null;
}

export default function ClientsPage({ onNavigate, onLogout, userType, currentUser }: ClientsPageProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userType === 'admin') {
      loadClients();
    }
  }, [userType]);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm]);

  const loadClients = () => {
    const allClients = localStorageService.getClients();
    setClients(allClients);
  };

  const filterClients = () => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      default:
        return status;
    }
  };

  // Apenas admins podem ver esta página
  if (userType !== 'admin') {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar 
          userType={userType as any} 
          currentUser={currentUser}
          onNavigate={onNavigate} 
          onLogout={onLogout} 
        />
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Acesso Restrito</h3>
            <p className="text-muted-foreground">
              Apenas administradores podem acessar a gestão de clientes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType={userType as any} 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Clientes</h1>
              <p className="text-muted-foreground">
                Gerencie seus clientes e relacionamentos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Novo Cliente
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Lista de Clientes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card key={client.id} className="border-border/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {client.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{client.name}</CardTitle>
                        <CardDescription className="truncate">
                          {client.company}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={getStatusColor(client.status)}>
                      {getStatusLabel(client.status)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {client.projects.length} projeto(s)
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{client.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{client.phone}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground text-xs leading-relaxed">
                        {client.address}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Total Investido</span>
                      </div>
                      <span className="font-medium">
                        R$ {client.totalBudget.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FolderOpen className="mr-1 h-3 w-3" />
                      Projetos
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estado Vazio */}
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                {clients.length === 0 ? 'Nenhum cliente cadastrado' : 'Nenhum cliente encontrado'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {clients.length === 0 
                  ? 'Comece cadastrando seu primeiro cliente'
                  : 'Tente ajustar os termos de busca'
                }
              </p>
              {clients.length === 0 && (
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  Cadastrar Primeiro Cliente
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}