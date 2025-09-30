import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import Sidebar from './Sidebar';
import { localStorageService, User } from '../services/localStorage';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  FolderOpen,
  Image as ImageIcon,
  FileVideo,
  FileAudio,
  Paperclip,
  Calendar,
  User as UserIcon,
  Check,
  X,
  Clock,
  AlertCircle,
  Star,
  Grid3X3,
  List,
  SortAsc,
  Plus,
  Users
} from 'lucide-react';

interface FilesPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: string | null;
  currentUser: User | null;
}

export default function FilesPage({ onNavigate, onLogout, userType, currentUser }: FilesPageProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const projectFolders = [
    {
      id: '1',
      name: 'Medical',
      date: 'May 12, 2021',
      files: 15,
      avatars: [
        { id: '1', name: 'John Doe', initials: 'JD' },
        { id: '2', name: 'Jane Smith', initials: 'JS' },
        { id: '3', name: 'Mike Johnson', initials: 'MJ' },
      ],
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'HR',
      date: 'April 28, 2021',
      files: 8,
      avatars: [
        { id: '4', name: 'Sarah Wilson', initials: 'SW' },
        { id: '5', name: 'Tom Brown', initials: 'TB' },
      ],
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'Administrator',
      date: 'September 24, 2021',
      files: 12,
      avatars: [
        { id: '6', name: 'Admin User', initials: 'AU' },
        { id: '7', name: 'System Admin', initials: 'SA' },
      ],
      color: 'bg-purple-500'
    }
  ];

  useEffect(() => {
    loadFiles();
  }, [currentUser, userType]);

  useEffect(() => {
    filterFiles();
  }, [files, searchTerm, statusFilter, sortBy]);

  const loadFiles = () => {
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

      const allFiles = userProjects
        .filter(project => project && project.files)
        .flatMap(project => 
          (project.files || []).map((file: any) => ({
            ...file,
            projectName: project.name || 'Projeto sem nome',
            projectId: project.id || 'unknown',
            clientName: project.clientName || 'Cliente não informado'
          }))
        );

      setFiles(allFiles);
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
      setFiles([]);
    }
  };

  const filterFiles = () => {
    let filtered = files;

    if (searchTerm) {
      filtered = filtered.filter(file => 
        (file.name && file.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (file.projectName && file.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(file => file.status === statusFilter);
    }

    // Sort files
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'size':
          return (b.size || 0) - (a.size || 0);
        case 'date':
        default:
          return new Date(b.uploadedAt || 0).getTime() - new Date(a.uploadedAt || 0).getTime();
      }
    });

    setFilteredFiles(filtered);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', droppedFiles);
    // Here you would handle file upload
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return ImageIcon;
      case 'mp4':
      case 'avi':
      case 'mov':
        return FileVideo;
      case 'mp3':
      case 'wav':
        return FileAudio;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return Check;
      case 'pending':
        return Clock;
      case 'rejected':
        return X;
      default:
        return AlertCircle;
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1) return `${Math.round(size * 1000)} KB`;
    return `${size.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
              <h1 className="text-2xl font-semibold">Files</h1>
              <p className="text-muted-foreground">
                Manage and organize your project files
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
              {(userType === 'admin' || userType === 'collaborator') && (
                <Button onClick={handleFileSelect} className="bg-accent hover:bg-accent/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              )}
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Area */}
          {(userType === 'admin' || userType === 'collaborator') && (
            <Card 
              className={`
                border-2 border-dashed transition-all duration-200 cursor-pointer
                ${isDragging 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border hover:border-accent/50 hover:bg-accent/5'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
            >
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Drop files here</h3>
                <p className="text-sm text-muted-foreground text-center">
                  PDF, DOC, XLSX, image, movie, etc.<br />
                  files with max size of 15 MB.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Project Folders */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projectFolders.map((folder) => (
                <Card key={folder.id} className="hover-card cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-10 ${folder.color} rounded-lg flex items-center justify-center mb-3`}>
                        <FolderOpen className="h-6 w-6 text-white" />
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <h3 className="font-medium mb-1">{folder.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{folder.files} Files</p>
                    
                    <div className="flex items-center gap-1">
                      {folder.avatars.slice(0, 3).map((avatar, index) => (
                        <Avatar key={avatar.id} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                            {avatar.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {folder.avatars.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">+{folder.avatars.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Files Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Files</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredFiles.length} files</span>
              </div>
            </div>

            {viewMode === 'list' ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 font-medium text-muted-foreground text-sm">Name</th>
                          <th className="text-left p-4 font-medium text-muted-foreground text-sm">Added By</th>
                          <th className="text-left p-4 font-medium text-muted-foreground text-sm">Date</th>
                          <th className="text-left p-4 font-medium text-muted-foreground text-sm">Size</th>
                          <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
                          <th className="w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFiles.map((file) => {
                          const FileIcon = getFileIcon(file.name);
                          const StatusIcon = getStatusIcon(file.status);
                          
                          return (
                            <tr key={file.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                                    <FileIcon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{file.projectName}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {file.uploadedBy?.charAt(0)?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{file.uploadedBy}</span>
                                </div>
                              </td>
                              <td className="p-4 text-sm text-muted-foreground">
                                {formatDate(file.uploadedAt)}
                              </td>
                              <td className="p-4 text-sm text-muted-foreground">
                                {formatFileSize(file.size || 0)}
                              </td>
                              <td className="p-4">
                                <Badge className={getStatusColor(file.status)}>
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {file.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map((file) => {
                  const FileIcon = getFileIcon(file.name);
                  const StatusIcon = getStatusIcon(file.status);
                  
                  return (
                    <Card key={file.id} className="hover-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <FileIcon className="h-5 w-5" />
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <h3 className="font-medium text-sm mb-1 truncate">{file.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{file.projectName}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>{formatFileSize(file.size || 0)}</span>
                          <span>{formatDate(file.uploadedAt)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(file.status)} size="sm">
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {file.status}
                          </Badge>
                          
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredFiles.length === 0 && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-medium mb-2">No files found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {files.length === 0 
                        ? 'Upload your first file to get started'
                        : 'Try adjusting your search or filters'
                      }
                    </p>
                    {(userType === 'admin' || userType === 'collaborator') && files.length === 0 && (
                      <Button onClick={handleFileSelect}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files || []);
          console.log('Files selected:', selectedFiles);
          // Handle file upload
        }}
      />
    </div>
  );
}