import { Language } from '../lib/i18n';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'admin' | 'collaborator' | 'client';
  avatar?: string;
  department?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'approved' | 'delivered';
  budget: number;
  progress: number;
  clientId: string;
  clientName: string;
  assignedTo: string[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
  files?: File[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  projectId: string;
  dueDate: string;
  estimatedHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  projectId: string;
  uploadedBy: string;
  uploadedAt: string;
  url?: string;
  comments?: string[];
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
  category: string;
  projectId?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'event';
  participants: string[];
  location?: string;
  createdAt: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'project' | 'team' | 'direct';
  participants: string[];
  isPrivate: boolean;
  projectId?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  channelId: string;
  projectId?: string;
  timestamp: string;
  attachments?: string[];
  isEdited?: boolean;
}

export interface Settings {
  theme: 'light' | 'dark';
  language: Language;
  notifications: {
    email: boolean;
    push: boolean;
    projectUpdates: boolean;
    chatMessages: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reduceMotion: boolean;
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  };
}

const STORAGE_KEYS = {
  USERS: 'okawe_users',
  PROJECTS: 'okawe_projects',
  TASKS: 'okawe_tasks',
  FILES: 'okawe_files',
  TRANSACTIONS: 'okawe_transactions',
  EVENTS: 'okawe_events',
  CHANNELS: 'okawe_channels',
  MESSAGES: 'okawe_messages',
  CURRENT_USER: 'okawe_current_user',
  SETTINGS: 'okawe_settings',
  INITIALIZED: 'okawe_initialized'
};

class LocalStorageService {
  private getFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private saveToStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }

  initializeData(): void {
    const isInitialized = this.getFromStorage(STORAGE_KEYS.INITIALIZED, false);
    
    if (!isInitialized) {
      // Usuários demo
      const demoUsers: User[] = [
        {
          id: '1',
          name: 'Admin Silva',
          email: 'admin@okawe.com',
          type: 'admin',
          department: 'Administração',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'João Santos',
          email: 'joao@okawe.com',
          type: 'collaborator',
          department: 'Design',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Maria Oliveira',
          email: 'maria@okawe.com',
          type: 'collaborator',
          department: 'Desenvolvimento',
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Cliente Empresa',
          email: 'cliente@empresa.com',
          type: 'client',
          department: 'Marketing',
          createdAt: new Date().toISOString()
        }
      ];

      // Projetos demo
      const demoProjects: Project[] = [
        {
          id: '1',
          name: 'Redesign Website',
          description: 'Projeto de redesign completo do website corporativo',
          status: 'in_progress',
          budget: 25000,
          progress: 65,
          clientId: '4',
          clientName: 'Cliente Empresa',
          assignedTo: ['2', '3'],
          startDate: '2024-01-15',
          endDate: '2024-03-15',
          priority: 'high',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [
            {
              id: '1',
              title: 'Análise de Requisitos',
              description: 'Levantar todos os requisitos do projeto',
              status: 'done',
              priority: 'high',
              assignedTo: '2',
              projectId: '1',
              dueDate: '2024-01-20',
              estimatedHours: 8,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Design System',
              description: 'Criar o design system do projeto',
              status: 'in_progress',
              priority: 'medium',
              assignedTo: '2',
              projectId: '1',
              dueDate: '2024-02-15',
              estimatedHours: 16,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ],
          files: [
            {
              id: '1',
              name: 'wireframes-home.pdf',
              size: 2.5,
              type: 'pdf',
              status: 'approved',
              projectId: '1',
              uploadedBy: 'João Santos',
              uploadedAt: new Date().toISOString()
            },
            {
              id: '2',
              name: 'mockup-header.png',
              size: 1.8,
              type: 'image',
              status: 'pending',
              projectId: '1',
              uploadedBy: 'João Santos',
              uploadedAt: new Date().toISOString()
            }
          ]
        },
        {
          id: '2',
          name: 'Brand Identity',
          description: 'Desenvolvimento da identidade visual da marca',
          status: 'review',
          budget: 15000,
          progress: 85,
          clientId: '4',
          clientName: 'Cliente Empresa',
          assignedTo: ['2'],
          startDate: '2024-02-01',
          endDate: '2024-03-01',
          priority: 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      // Transações demo
      const demoTransactions: Transaction[] = [
        {
          id: '1',
          description: 'Pagamento projeto Website',
          amount: 12500,
          type: 'income',
          status: 'completed',
          date: '2024-01-15',
          category: 'Projetos',
          projectId: '1',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          description: 'Licenças software',
          amount: 299,
          type: 'expense',
          status: 'completed',
          date: '2024-01-10',
          category: 'Software',
          createdAt: new Date().toISOString()
        }
      ];

      // Eventos demo
      const demoEvents: Event[] = [
        {
          id: '1',
          title: 'Reunião Cliente',
          description: 'Apresentação dos wireframes',
          startDate: new Date(Date.now() + 86400000).toISOString(), // Amanhã
          endDate: new Date(Date.now() + 90000000).toISOString(),
          type: 'meeting',
          participants: ['1', '2', '4'],
          location: 'Zoom',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Deadline Design System',
          description: 'Entrega do design system completo',
          startDate: '2024-02-15T09:00:00.000Z',
          endDate: '2024-02-15T17:00:00.000Z',
          type: 'deadline',
          participants: ['2'],
          createdAt: new Date().toISOString()
        }
      ];

      // Canais de chat demo
      const demoChannels: ChatChannel[] = [
        {
          id: '1',
          name: 'Geral',
          type: 'team',
          participants: ['1', '2', '3'],
          isPrivate: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Projeto Website',
          type: 'project',
          participants: ['1', '2', '3', '4'],
          isPrivate: false,
          projectId: '1',
          createdAt: new Date().toISOString()
        }
      ];

      // Mensagens demo
      const demoMessages: ChatMessage[] = [
        {
          id: '1',
          text: 'Bom dia pessoal! Como estão os projetos hoje?',
          userId: '1',
          userName: 'Admin Silva',
          channelId: '1',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          text: 'Oi! Acabei de finalizar os wireframes do projeto.',
          userId: '2',
          userName: 'João Santos',
          channelId: '2',
          projectId: '1',
          timestamp: new Date().toISOString()
        }
      ];

      // Configurações padrão
      const defaultSettings: Settings = {
        theme: 'light',
        language: 'pt',
        notifications: {
          email: true,
          push: true,
          projectUpdates: true,
          chatMessages: true
        },
        accessibility: {
          highContrast: false,
          reduceMotion: false,
          fontSize: 'medium'
        }
      };

      // Salvar dados demo
      this.saveToStorage(STORAGE_KEYS.USERS, demoUsers);
      this.saveToStorage(STORAGE_KEYS.PROJECTS, demoProjects);
      this.saveToStorage(STORAGE_KEYS.TRANSACTIONS, demoTransactions);
      this.saveToStorage(STORAGE_KEYS.EVENTS, demoEvents);
      this.saveToStorage(STORAGE_KEYS.CHANNELS, demoChannels);
      this.saveToStorage(STORAGE_KEYS.MESSAGES, demoMessages);
      this.saveToStorage(STORAGE_KEYS.SETTINGS, defaultSettings);
      this.saveToStorage(STORAGE_KEYS.INITIALIZED, true);
    }
  }

  // Autenticação
  authenticate(email: string, password?: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);
    
    if (user) {
      this.saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
      return user;
    }
    
    return null;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  getCurrentUser(): User | null {
    return this.getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
  }

  // Usuários
  getUsers(): User[] {
    return this.getFromStorage(STORAGE_KEYS.USERS, []);
  }

  getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  // Projetos
  getProjects(): Project[] {
    return this.getFromStorage(STORAGE_KEYS.PROJECTS, []);
  }

  getProjectsByUser(userId: string, userType: 'admin' | 'collaborator' | 'client'): Project[] {
    const projects = this.getProjects();
    
    if (userType === 'admin') {
      return projects;
    } else if (userType === 'collaborator') {
      return projects.filter(p => p.assignedTo.includes(userId));
    } else if (userType === 'client') {
      return projects.filter(p => p.clientId === userId);
    }
    
    return [];
  }

  // Tarefas
  getTasksByUser(userId: string): Task[] {
    const projects = this.getProjects();
    const allTasks: Task[] = [];
    
    projects.forEach(project => {
      if (project.tasks) {
        const userTasks = project.tasks.filter(task => task.assignedTo === userId);
        allTasks.push(...userTasks);
      }
    });
    
    return allTasks;
  }

  // Transações
  getTransactions(): Transaction[] {
    return this.getFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
  }

  // Eventos
  getEvents(): Event[] {
    return this.getFromStorage(STORAGE_KEYS.EVENTS, []);
  }

  // Chat
  getChannels(): ChatChannel[] {
    return this.getFromStorage(STORAGE_KEYS.CHANNELS, []);
  }

  getMessages(channelId?: string): ChatMessage[] {
    const messages = this.getFromStorage(STORAGE_KEYS.MESSAGES, []);
    return channelId ? messages.filter(m => m.channelId === channelId) : messages;
  }

  addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage {
    const messages = this.getMessages();
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    this.saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    
    return newMessage;
  }

  // Configurações
  getSettings(): Settings {
    return this.getFromStorage(STORAGE_KEYS.SETTINGS, {
      theme: 'light',
      language: 'pt',
      notifications: {
        email: true,
        push: true,
        projectUpdates: true,
        chatMessages: true
      },
      accessibility: {
        highContrast: false,
        reduceMotion: false,
        fontSize: 'medium'
      }
    });
  }

  saveSettings(settings: Settings): void {
    this.saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  }

  // Estatísticas
  getStats(): any {
    const projects = this.getProjects();
    const users = this.getUsers();
    const tasks = this.getTasksByUser('all');
    
    return {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'in_progress').length,
      totalUsers: users.filter(u => u.type !== 'client').length,
      pendingTasks: tasks.filter(t => t.status !== 'done').length,
      overdueTasks: tasks.filter(t => 
        t.status !== 'done' && new Date(t.dueDate) < new Date()
      ).length
    };
  }
}

export const localStorageService = new LocalStorageService();