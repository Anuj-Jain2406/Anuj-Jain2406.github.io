import React from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useThemePalette } from '@/contexts/ThemePaletteContext';
import { useEditMode } from '@/contexts/EditModeContext';

export const AdminPanel: React.FC = () => {
  const { theme, palette, toggleTheme, setPalette } = useThemePalette();
  const { isEditMode, disableEditMode } = useEditMode();

  if (!isEditMode) return null;

  return (
    <Card className="fixed bottom-20 right-6 z-50 p-4 glass-card">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
            Admin Panel
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={disableEditMode}
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
        
        <div className="flex flex-col gap-2">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>

          {/* Palette Switcher */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Color Palette:</span>
            <div className="flex gap-1">
              <Button
                variant={palette === 'blue-violet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPalette('blue-violet')}
                className="flex items-center gap-2 text-xs"
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
                Blue-Violet
              </Button>
              <Button
                variant={palette === 'sunset' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPalette('sunset')}
                className="flex items-center gap-2 text-xs"
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                Sunset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};