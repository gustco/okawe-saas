import React from 'react';
import { useTranslation } from '../lib/i18n';

export default function LoadingScreen() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center animate-pulse">
          <span className="text-xl font-semibold text-accent-foreground">O</span>
        </div>
        <p className="text-muted-foreground animate-pulse">{t('common.loading')}</p>
      </div>
    </div>
  );
}