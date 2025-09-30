import React from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Moon, Sun, Settings } from 'lucide-react';
import { PageType } from '../lib/types';

interface HeaderControlsProps {
  onNavigateToSettings: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function HeaderControls({ 
  onNavigateToSettings, 
  isDarkMode, 
  onToggleTheme 
}: HeaderControlsProps) {
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      {/* Settings Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onNavigateToSettings}
        className="bg-card/80 backdrop-blur-sm border border-border hover:bg-accent hover:text-accent-foreground"
      >
        <Settings className="h-4 w-4" />
      </Button>
      
      {/* Theme Toggle */}
      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={isDarkMode}
          onCheckedChange={onToggleTheme}
          className="data-[state=checked]:bg-accent"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}