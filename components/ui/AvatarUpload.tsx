import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';
import { Camera, Upload, User, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';
import { useTranslation } from '../../lib/i18n';

interface AvatarUploadProps {
  currentUser: any;
  onAvatarChange?: (avatarUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-20 w-20'
};

export default function AvatarUpload({ currentUser, onAvatarChange, size = 'md' }: AvatarUploadProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sizeClass = sizeClasses[size];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter menos de 5MB.');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewUrl && onAvatarChange) {
      onAvatarChange(previewUrl);
      // Aqui você salvaria no localStorage ou Supabase
      localStorage.setItem(`okawe_avatar_${currentUser?.id}`, previewUrl);
    }
    setIsOpen(false);
    setPreviewUrl(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = () => {
    if (onAvatarChange) {
      onAvatarChange('');
    }
    localStorage.removeItem(`okawe_avatar_${currentUser?.id}`);
    setIsOpen(false);
  };

  const currentAvatar = currentUser?.avatar || localStorage.getItem(`okawe_avatar_${currentUser?.id}`);

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <Avatar className={`${sizeClass} ring-2 ring-border group-hover:ring-accent transition-all duration-200`}>
          {currentAvatar ? (
            <img 
              src={currentAvatar} 
              alt={currentUser?.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-accent text-accent-foreground group-hover:bg-accent/80">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          )}
        </Avatar>
        
        {/* Camera overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Camera className="h-4 w-4 text-white" />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alterar Foto de Perfil</DialogTitle>
            <DialogDescription>
              Escolha uma nova foto para seu perfil. Recomendamos imagens quadradas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview Area */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-32 w-32 ring-2 ring-border">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : currentAvatar ? (
                    <img 
                      src={currentAvatar} 
                      alt={currentUser?.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                      {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Escolher Nova Foto
              </Button>

              {currentAvatar && (
                <Button
                  onClick={handleRemoveAvatar}
                  className="w-full"
                  variant="outline"
                  size="sm"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remover Foto Atual
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              
              {previewUrl && (
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  Salvar Foto
                </Button>
              )}
            </div>

            {/* File size info */}
            <p className="text-xs text-muted-foreground text-center">
              JPG, PNG ou GIF até 5MB
            </p>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}