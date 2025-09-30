export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  pt: {
    // Navigation
    'nav.overview': 'Visão Geral',
    'nav.projects': 'Projetos',
    'nav.clients': 'Clientes',
    'nav.team': 'Equipe',
    'nav.files': 'Arquivos',
    'nav.financial': 'Financeiro',
    'nav.calendar': 'Calendário',
    'nav.chat': 'Chat',
    'nav.settings': 'Configurações',
    'nav.logout': 'Sair',
    
    // Landing Page
    'landing.title': 'Okawe',
    'landing.subtitle': 'Seu sistema de gestão criativa para empresas remotas',
    'landing.login': 'Entrar',
    'landing.signup': 'Criar Conta',
    'landing.description': 'Gerencie projetos criativos, equipes remotas e clientes em um só lugar. Desenvolvido especialmente para agências, estúdios e criativos modernos.',
    
    // Authentication
    'auth.login': 'Entrar',
    'auth.signup': 'Criar Conta',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.name': 'Nome Completo',
    'auth.userType': 'Tipo de Usuário',
    'auth.forgotPassword': 'Esqueci minha senha',
    'auth.createAccount': 'Criar conta',
    'auth.hasAccount': 'Já tem uma conta?',
    'auth.noAccount': 'Não tem uma conta?',
    'auth.googleLogin': 'Entrar com Google',
    
    // User Types
    'userType.admin': 'Administrador',
    'userType.collaborator': 'Colaborador',
    'userType.client': 'Cliente',
    
    // Dashboard
    'dashboard.welcome': 'Bem-vindo',
    'dashboard.admin.title': 'Dashboard Administrativo',
    'dashboard.admin.subtitle': 'Aqui está o resumo do seu negócio',
    'dashboard.collaborator.title': 'Meu Workspace',
    'dashboard.collaborator.subtitle': 'Vamos ser produtivos hoje!',
    'dashboard.client.title': 'Meus Projetos',
    'dashboard.client.subtitle': 'Acompanhe o progresso dos seus projetos',
    
    // Metrics
    'metrics.activeProjects': 'Projetos Ativos',
    'metrics.monthlyRevenue': 'Receita Mensal',
    'metrics.activeTeam': 'Equipe Ativa',
    'metrics.pendingTasks': 'Tarefas Pendentes',
    'metrics.completedTasks': 'Tarefas Concluídas',
    'metrics.inProgress': 'Em Andamento',
    'metrics.recentUploads': 'Uploads Recentes',
    
    // Projects
    'projects.title': 'Projetos',
    'projects.description': 'Gerencie e organize seus projetos criativos',
    'projects.new': 'Novo Projeto',
    'projects.all': 'Todos os Projetos',
    'projects.myProjects': 'Meus Projetos',
    'projects.status.planning': 'Planejamento',
    'projects.status.inProgress': 'Em Andamento',
    'projects.status.review': 'Em Revisão',
    'projects.status.approved': 'Aprovado',
    'projects.status.delivered': 'Entregue',
    
    // Files
    'files.title': 'Arquivos',
    'files.description': 'Gerencie e organize os arquivos do projeto',
    'files.upload': 'Enviar',
    'files.dropFiles': 'Solte arquivos aqui',
    'files.dropDescription': 'PDF, DOC, XLSX, imagem, vídeo, etc.\narquivos com tamanho máximo de 15 MB.',
    'files.folders': 'Pastas',
    'files.noFiles': 'Nenhum arquivo encontrado',
    'files.noFilesDescription': 'Envie seu primeiro arquivo para começar',
    
    // Chat
    'chat.title': 'Conversas',
    'chat.search': 'Buscar',
    'chat.newConversation': 'Nova Conversa',
    'chat.typeMessage': 'Digite sua mensagem aqui...',
    'chat.selectConversation': 'Selecione uma conversa',
    'chat.selectDescription': 'Escolha uma conversa da barra lateral para começar a interagir',
    'chat.teams': 'Equipes',
    'chat.directMessages': 'Mensagens Diretas',
    'chat.dailyMessages': 'Mensagens Diárias',
    'chat.group': 'Grupo',
    
    // Calendar
    'calendar.title': 'Calendário',
    'calendar.description': 'Gerencie seus eventos e compromissos',
    'calendar.newEvent': 'Novo Evento',
    'calendar.today': 'Hoje',
    'calendar.week': 'Semana',
    'calendar.month': 'Mês',
    
    // Financial
    'financial.title': 'Financeiro',
    'financial.description': 'Controle suas receitas e despesas',
    'financial.income': 'Receitas',
    'financial.expenses': 'Despesas',
    'financial.profit': 'Lucro Líquido',
    'financial.newTransaction': 'Nova Transação',
    
    // Team
    'team.title': 'Equipe',
    'team.description': 'Gerencie os membros da sua equipe',
    'team.newMember': 'Novo Membro',
    'team.performance': 'Performance da Equipe',
    
    // Clients
    'clients.title': 'Clientes',
    'clients.description': 'Gerencie seus clientes e relacionamentos',
    'clients.newClient': 'Novo Cliente',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.general': 'Geral',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.notifications': 'Notificações',
    'settings.security': 'Segurança',
    'settings.save': 'Salvar',
    'settings.cancel': 'Cancelar',
    
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.view': 'Visualizar',
    'common.download': 'Baixar',
    'common.upload': 'Enviar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.loading': 'Carregando...',
    'common.noData': 'Nenhum dado encontrado',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
    'common.confirm': 'Confirmar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.close': 'Fechar',
    'common.open': 'Abrir',
    'common.select': 'Selecionar',
    'common.all': 'Todos',
    'common.none': 'Nenhum',
    'common.yes': 'Sim',
    'common.no': 'Não',
    'common.today': 'Hoje',
    'common.yesterday': 'Ontem',
    'common.thisWeek': 'Esta semana',
    'common.thisMonth': 'Este mês',
    'common.ago': 'atrás',
    'common.now': 'Agora',
    'common.online': 'Online',
    'common.offline': 'Offline',
    'common.active': 'Ativo',
    'common.inactive': 'Inativo',
    'common.completed': 'Concluído',
    'common.pending': 'Pendente',
    'common.approved': 'Aprovado',
    'common.rejected': 'Rejeitado',
    'common.draft': 'Rascunho',
    'common.published': 'Publicado',
    'common.archived': 'Arquivado',
  },
  
  en: {
    // Navigation
    'nav.overview': 'Overview',
    'nav.projects': 'Projects',
    'nav.clients': 'Clients',
    'nav.team': 'Team',
    'nav.files': 'Files',
    'nav.financial': 'Financial',
    'nav.calendar': 'Calendar',
    'nav.chat': 'Chat',
    'nav.settings': 'Settings',
    'nav.logout': 'Sign Out',
    
    // Landing Page
    'landing.title': 'Okawe',
    'landing.subtitle': 'Your creative management system for remote companies',
    'landing.login': 'Sign In',
    'landing.signup': 'Sign Up',
    'landing.description': 'Manage creative projects, remote teams and clients in one place. Built especially for agencies, studios and modern creatives.',
    
    // Authentication
    'auth.login': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.userType': 'User Type',
    'auth.forgotPassword': 'Forgot password',
    'auth.createAccount': 'Create account',
    'auth.hasAccount': 'Already have an account?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.googleLogin': 'Sign in with Google',
    
    // User Types
    'userType.admin': 'Administrator',
    'userType.collaborator': 'Collaborator',
    'userType.client': 'Client',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.admin.title': 'Administrative Dashboard',
    'dashboard.admin.subtitle': 'Here\'s your business overview',
    'dashboard.collaborator.title': 'My Workspace',
    'dashboard.collaborator.subtitle': 'Let\'s be productive today!',
    'dashboard.client.title': 'My Projects',
    'dashboard.client.subtitle': 'Track the progress of your projects',
    
    // Metrics
    'metrics.activeProjects': 'Active Projects',
    'metrics.monthlyRevenue': 'Monthly Revenue',
    'metrics.activeTeam': 'Active Team',
    'metrics.pendingTasks': 'Pending Tasks',
    'metrics.completedTasks': 'Completed Tasks',
    'metrics.inProgress': 'In Progress',
    'metrics.recentUploads': 'Recent Uploads',
    
    // Projects
    'projects.title': 'Projects',
    'projects.description': 'Manage and organize your creative projects',
    'projects.new': 'New Project',
    'projects.all': 'All Projects',
    'projects.myProjects': 'My Projects',
    'projects.status.planning': 'Planning',
    'projects.status.inProgress': 'In Progress',
    'projects.status.review': 'In Review',
    'projects.status.approved': 'Approved',
    'projects.status.delivered': 'Delivered',
    
    // Files
    'files.title': 'Files',
    'files.description': 'Manage and organize your project files',
    'files.upload': 'Upload',
    'files.dropFiles': 'Drop files here',
    'files.dropDescription': 'PDF, DOC, XLSX, image, video, etc.\nfiles with max size of 15 MB.',
    'files.folders': 'Folders',
    'files.noFiles': 'No files found',
    'files.noFilesDescription': 'Upload your first file to get started',
    
    // Chat
    'chat.title': 'Conversations',
    'chat.search': 'Search',
    'chat.newConversation': 'New Conversation',
    'chat.typeMessage': 'Type your message here...',
    'chat.selectConversation': 'Select a conversation',
    'chat.selectDescription': 'Choose a conversation from the sidebar to start chatting',
    'chat.teams': 'Teams',
    'chat.directMessages': 'Direct Messages',
    'chat.dailyMessages': 'Daily Messages',
    'chat.group': 'Group',
    
    // Calendar
    'calendar.title': 'Calendar',
    'calendar.description': 'Manage your events and appointments',
    'calendar.newEvent': 'New Event',
    'calendar.today': 'Today',
    'calendar.week': 'Week',
    'calendar.month': 'Month',
    
    // Financial
    'financial.title': 'Financial',
    'financial.description': 'Control your income and expenses',
    'financial.income': 'Income',
    'financial.expenses': 'Expenses',
    'financial.profit': 'Net Profit',
    'financial.newTransaction': 'New Transaction',
    
    // Team
    'team.title': 'Team',
    'team.description': 'Manage your team members',
    'team.newMember': 'New Member',
    'team.performance': 'Team Performance',
    
    // Clients
    'clients.title': 'Clients',
    'clients.description': 'Manage your clients and relationships',
    'clients.newClient': 'New Client',
    
    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.notifications': 'Notifications',
    'settings.security': 'Security',
    'settings.save': 'Save',
    'settings.cancel': 'Cancel',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.loading': 'Loading...',
    'common.noData': 'No data found',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.select': 'Select',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.today': 'Today',
    'common.yesterday': 'Yesterday',
    'common.thisWeek': 'This week',
    'common.thisMonth': 'This month',
    'common.ago': 'ago',
    'common.now': 'Now',
    'common.online': 'Online',
    'common.offline': 'Offline',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.completed': 'Completed',
    'common.pending': 'Pending',
    'common.approved': 'Approved',
    'common.rejected': 'Rejected',
    'common.draft': 'Draft',
    'common.published': 'Published',
    'common.archived': 'Archived',
  },
  
  es: {
    // Navigation
    'nav.overview': 'Resumen',
    'nav.projects': 'Proyectos',
    'nav.clients': 'Clientes',
    'nav.team': 'Equipo',
    'nav.files': 'Archivos',
    'nav.financial': 'Financiero',
    'nav.calendar': 'Calendario',
    'nav.chat': 'Chat',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    
    // Landing Page
    'landing.title': 'Okawe',
    'landing.subtitle': 'Tu sistema de gestión creativa para empresas remotas',
    'landing.login': 'Iniciar Sesión',
    'landing.signup': 'Registrarse',
    'landing.description': 'Gestiona proyectos creativos, equipos remotos y clientes en un solo lugar. Construido especialmente para agencias, estudios y creativos modernos.',
    
    // Authentication
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre Completo',
    'auth.userType': 'Tipo de Usuario',
    'auth.forgotPassword': 'Olvidé mi contraseña',
    'auth.createAccount': 'Crear cuenta',
    'auth.hasAccount': '¿Ya tienes una cuenta?',
    'auth.noAccount': '¿No tienes una cuenta?',
    'auth.googleLogin': 'Iniciar sesión con Google',
    
    // User Types
    'userType.admin': 'Administrador',
    'userType.collaborator': 'Colaborador',
    'userType.client': 'Cliente',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido',
    'dashboard.admin.title': 'Panel Administrativo',
    'dashboard.admin.subtitle': 'Aquí tienes el resumen de tu negocio',
    'dashboard.collaborator.title': 'Mi Espacio de Trabajo',
    'dashboard.collaborator.subtitle': '¡Seamos productivos hoy!',
    'dashboard.client.title': 'Mis Proyectos',
    'dashboard.client.subtitle': 'Sigue el progreso de tus proyectos',
    
    // Metrics
    'metrics.activeProjects': 'Proyectos Activos',
    'metrics.monthlyRevenue': 'Ingresos Mensuales',
    'metrics.activeTeam': 'Equipo Activo',
    'metrics.pendingTasks': 'Tareas Pendientes',
    'metrics.completedTasks': 'Tareas Completadas',
    'metrics.inProgress': 'En Progreso',
    'metrics.recentUploads': 'Subidas Recientes',
    
    // Projects
    'projects.title': 'Proyectos',
    'projects.description': 'Gestiona y organiza tus proyectos creativos',
    'projects.new': 'Nuevo Proyecto',
    'projects.all': 'Todos los Proyectos',
    'projects.myProjects': 'Mis Proyectos',
    'projects.status.planning': 'Planificación',
    'projects.status.inProgress': 'En Progreso',
    'projects.status.review': 'En Revisión',
    'projects.status.approved': 'Aprobado',
    'projects.status.delivered': 'Entregado',
    
    // Files
    'files.title': 'Archivos',
    'files.description': 'Gestiona y organiza los archivos del proyecto',
    'files.upload': 'Subir',
    'files.dropFiles': 'Suelta archivos aquí',
    'files.dropDescription': 'PDF, DOC, XLSX, imagen, video, etc.\narchivos con tamaño máximo de 15 MB.',
    'files.folders': 'Carpetas',
    'files.noFiles': 'No se encontraron archivos',
    'files.noFilesDescription': 'Sube tu primer archivo para comenzar',
    
    // Chat
    'chat.title': 'Conversaciones',
    'chat.search': 'Buscar',
    'chat.newConversation': 'Nueva Conversación',
    'chat.typeMessage': 'Escribe tu mensaje aquí...',
    'chat.selectConversation': 'Selecciona una conversación',
    'chat.selectDescription': 'Elige una conversación de la barra lateral para comenzar a chatear',
    'chat.teams': 'Equipos',
    'chat.directMessages': 'Mensajes Directos',
    'chat.dailyMessages': 'Mensajes Diarios',
    'chat.group': 'Grupo',
    
    // Calendar
    'calendar.title': 'Calendario',
    'calendar.description': 'Gestiona tus eventos y citas',
    'calendar.newEvent': 'Nuevo Evento',
    'calendar.today': 'Hoy',
    'calendar.week': 'Semana',
    'calendar.month': 'Mes',
    
    // Financial
    'financial.title': 'Financiero',
    'financial.description': 'Controla tus ingresos y gastos',
    'financial.income': 'Ingresos',
    'financial.expenses': 'Gastos',
    'financial.profit': 'Beneficio Neto',
    'financial.newTransaction': 'Nueva Transacción',
    
    // Team
    'team.title': 'Equipo',
    'team.description': 'Gestiona los miembros de tu equipo',
    'team.newMember': 'Nuevo Miembro',
    'team.performance': 'Rendimiento del Equipo',
    
    // Clients
    'clients.title': 'Clientes',
    'clients.description': 'Gestiona tus clientes y relaciones',
    'clients.newClient': 'Nuevo Cliente',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.general': 'General',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.notifications': 'Notificaciones',
    'settings.security': 'Seguridad',
    'settings.save': 'Guardar',
    'settings.cancel': 'Cancelar',
    
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.view': 'Ver',
    'common.download': 'Descargar',
    'common.upload': 'Subir',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.loading': 'Cargando...',
    'common.noData': 'No se encontraron datos',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.warning': 'Advertencia',
    'common.info': 'Información',
    'common.confirm': 'Confirmar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.close': 'Cerrar',
    'common.open': 'Abrir',
    'common.select': 'Seleccionar',
    'common.all': 'Todos',
    'common.none': 'Ninguno',
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.today': 'Hoy',
    'common.yesterday': 'Ayer',
    'common.thisWeek': 'Esta semana',
    'common.thisMonth': 'Este mes',
    'common.ago': 'hace',
    'common.now': 'Ahora',
    'common.online': 'En línea',
    'common.offline': 'Desconectado',
    'common.active': 'Activo',
    'common.inactive': 'Inactivo',
    'common.completed': 'Completado',
    'common.pending': 'Pendiente',
    'common.approved': 'Aprobado',
    'common.rejected': 'Rechazado',
    'common.draft': 'Borrador',
    'common.published': 'Publicado',
    'common.archived': 'Archivado',
  }
};

class I18n {
  private currentLanguage: Language = 'pt';
  
  setLanguage(language: Language) {
    this.currentLanguage = language;
    if (typeof window !== 'undefined') {
      localStorage.setItem('okawe_language', language);
    }
  }
  
  getLanguage(): Language {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('okawe_language') as Language;
      if (saved && translations[saved]) {
        this.currentLanguage = saved;
      }
    }
    return this.currentLanguage;
  }
  
  t(key: string): string {
    const translation = translations[this.currentLanguage]?.[key];
    return translation || key;
  }
  
  getAllTranslations(): Translations {
    return translations[this.currentLanguage] || translations.pt;
  }
}

export const i18n = new I18n();

export const useTranslation = () => {
  return {
    t: i18n.t.bind(i18n),
    language: i18n.getLanguage(),
    setLanguage: i18n.setLanguage.bind(i18n)
  };
};