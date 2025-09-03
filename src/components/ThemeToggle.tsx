import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 rounded-full w-12 h-12 p-0 glass-card hover-lift"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 smooth-transition" />
      ) : (
        <Sun className="h-5 w-5 smooth-transition" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};