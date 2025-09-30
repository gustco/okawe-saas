import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import Sidebar from './Sidebar';
import { localStorageService, User } from '../services/localStorage';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Folder,
  Calendar,
  User as UserIcon,
  Tag,
  Target,
  ArrowUp,
  ArrowDown,
  Circle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  Star,
  Archive,
  Settings,
  FolderOpen,
  Hash,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: string | null;
  currentUser: User | null;
}

export default function ProjectsPage({ onNavigate, onLogout, userType, currentUser }: ProjectsPageProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'projects' | 'tasks'>('projects');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const statusOptions = [
    { value: 'planning', label: 'Planning', color: 'bg-muted', icon: Circle },
    { value: 'in_progress', label: 'In Progress', color: 'bg-blue-500', icon: Clock },
    { value: 'review', label: 'In Review', color: 'bg-yellow-500', icon: Eye },
    { value: 'approved', label: 'Approved', color: 'bg-green-500', icon: CheckCircle2 },
    { value: 'delivered', label: 'Delivered', color: 'bg-purple-500', icon: CheckCircle2 },
  ];

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'low', label: 'Low', color: 'bg-gray-500' },
  ];

  const teamMembers = [
    { id: '1', name: 'Harshith Mullapudi', initials: 'HM', color: 'bg-blue-500' },
    { id: '2', name: 'Manik Aggarwal', initials: 'MA', color: 'bg-green-500' },
    { id: '3', name: 'Manoj Reddy', initials: 'MR', color: 'bg-purple-500' },
  ];

  useEffect(() => {
    loadData();
  }, [currentUser, userType]);

  useEffect(() => {
    filterData();
  }, [projects, tasks, searchTerm, statusFilter, priorityFilter, assigneeFilter, viewMode]);

  const loadData = () => {
    if (!currentUser) return;

    try {
      let userProjects: any[] = [];
      
      if (userType === 'admin') {
        userProjects = localStorageService.getProjects();
      } else if (userType === 'collaborator') {
        userProjects = localStorageService.getProjectsByUser(currentUser.id, 'collaborator');
      } else if (userType === 'client') {
        userProjects = localStorageService.getProjectsByUser(currentUser.id, 'client');
      }

      setProjects(userProjects);

      // Extract tasks from projects
      const allTasks = userProjects.flatMap(project => 
        (project.tasks || []).map((task: any) => ({
          ...task,
          projectName: project.name,
          projectId: project.id
        }))
      );
      setTasks(allTasks);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setProjects([]);
      setTasks([]);
    }
  };

  const filterData = () => {
    const dataToFilter = viewMode === 'projects' ? projects : tasks;
    let filtered = dataToFilter;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        (item.name || item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.clientName || item.projectName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(item => item.priority === priorityFilter);
    }

    // Assignee filter
    if (assigneeFilter !== 'all') {
      filtered = filtered.filter(item => 
        (item.assignedTo && item.assignedTo.includes && item.assignedTo.includes(assigneeFilter)) ||
        item.assignedTo === assigneeFilter
      );
    }

    setFilteredProjects(filtered);
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find(s => s.value === status) || statusOptions[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorityOptions.find(p => p.value === priority) || priorityOptions[3];
  };

  const getMemberInfo = (memberId: string) => {
    return teamMembers.find(m => m.id === memberId);
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredProjects.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProjects.map(item => item.id));
    }
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (priorityFilter !== 'all') count++;
    if (assigneeFilter !== 'all') count++;
    return count;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType={userType as any} 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Breadcrumb */}
        <div className="h-12 border-b border-border flex items-center px-6 bg-card">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Engineering</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">•</span>
            <span className="font-medium">{viewMode === 'projects' ? 'All Projects' : 'All Issues'}</span>
          </div>
        </div>

        {/* Header */}
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">
                {viewMode === 'projects' ? 'Projects' : 'Issues'}
              </h1>
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === 'projects' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('projects')}
                  className="rounded-r-none"
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button
                  variant={viewMode === 'tasks' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tasks')}
                  className="rounded-l-none border-l"
                >
                  <Hash className="mr-2 h-4 w-4" />
                  Issues
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                Starred
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </Button>
              {(userType === 'admin' || userType === 'collaborator') && (
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New {viewMode === 'projects' ? 'Project' : 'Issue'}
                </Button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Filter ${viewMode}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Target className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <status.icon className="h-3 w-3" />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <ArrowUp className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Priority</SelectItem>
                {priorityOptions.map(priority => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[140px]">
                <UserIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">No assignee</SelectItem>
                {teamMembers.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className={`text-xs ${member.color} text-white`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      {member.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="gap-1">
                <Filter className="h-3 w-3" />
                {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Status Columns (Projects View) */}
            {viewMode === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statusOptions.map(status => {
                  const statusProjects = filteredProjects.filter(p => p.status === status.value);
                  const StatusIcon = status.icon;
                  
                  return (
                    <div key={status.value} className="space-y-4">
                      <div className="flex items-center gap-3 pb-2 border-b border-border">
                        <div className={`w-3 h-3 rounded-full ${status.color}`} />
                        <h3 className="font-medium text-sm">{status.label}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {statusProjects.length}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {statusProjects.map(project => (
                          <div
                            key={project.id}
                            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-medium text-sm line-clamp-2">{project.name}</h4>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{project.progress || 0}%</span>
                              </div>
                              <Progress value={project.progress || 0} className="h-1" />
                            </div>
                            
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                              <div className="flex -space-x-1">
                                {(project.assignedTo || []).slice(0, 3).map((memberId: string, index: number) => {
                                  const member = getMemberInfo(memberId);
                                  return member ? (
                                    <Avatar key={memberId} className="h-6 w-6 border-2 border-background">
                                      <AvatarFallback className={`text-xs ${member.color} text-white`}>
                                        {member.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                  ) : null;
                                })}
                                {project.assignedTo && project.assignedTo.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                    <span className="text-xs font-medium">+{project.assignedTo.length - 3}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {project.priority && (
                                  <div className={`w-2 h-2 rounded-full ${getPriorityInfo(project.priority).color}`} />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {statusProjects.length === 0 && (
                          <div className="p-4 text-center text-muted-foreground">
                            <StatusIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">No {status.label.toLowerCase()} projects</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Issues List View */}
            {viewMode === 'tasks' && (
              <div className="space-y-4">
                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {selectedItems.length} issue{selectedItems.length > 1 ? 's' : ''} selected
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Tag className="mr-2 h-4 w-4" />
                          Label
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserIcon className="mr-2 h-4 w-4" />
                          Assignee
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="mr-2 h-4 w-4" />
                          Status
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Issues Table */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="border-b border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedItems.length === filteredProjects.length && filteredProjects.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4" />
                        Status
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserIcon className="h-4 w-4" />
                        Assignee
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tag className="h-4 w-4" />
                        Label
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowUp className="h-4 w-4" />
                        Priority
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-border">
                    {filteredProjects.map(task => {
                      const statusInfo = getStatusInfo(task.status);
                      const priorityInfo = getPriorityInfo(task.priority);
                      const assignee = getMemberInfo(task.assignedTo);
                      const StatusIcon = statusInfo.icon;
                      
                      return (
                        <div
                          key={task.id}
                          className="flex items-center gap-4 p-3 hover:bg-muted/30 transition-colors"
                        >
                          <Checkbox
                            checked={selectedItems.includes(task.id)}
                            onCheckedChange={() => toggleSelectItem(task.id)}
                          />
                          
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <StatusIcon className={`h-4 w-4 ${statusInfo.color === 'bg-muted' ? 'text-muted-foreground' : 'text-white'}`} />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-sm truncate">{task.title || task.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{task.projectName}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm">
                            {assignee && (
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className={`text-xs ${assignee.color} text-white`}>
                                  {assignee.initials}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`w-2 h-2 rounded-full ${priorityInfo.color}`} />
                            
                            <span className="text-xs text-muted-foreground min-w-[60px]">
                              {task.dueDate && new Date(task.dueDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                            
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <Hash className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-medium mb-2">No issues found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try adjusting your filters or create a new issue
                    </p>
                    {(userType === 'admin' || userType === 'collaborator') && (
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Issue
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}