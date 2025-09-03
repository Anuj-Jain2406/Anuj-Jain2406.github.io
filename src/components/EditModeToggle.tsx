import React from 'react';
import { Edit, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEditMode } from '@/contexts/EditModeContext';

export const EditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {isEditMode && (
        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground animate-pulse">
          Edit Mode Active
        </Badge>
      )}
      
      <Button
        variant={isEditMode ? "default" : "ghost"}
        size="sm"
        onClick={toggleEditMode}
        className={`rounded-full w-12 h-12 p-0 glass-card hover-lift ${
          isEditMode 
            ? 'bg-gradient-button shadow-strong' 
            : 'hover:bg-muted'
        }`}
        title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      >
        {isEditMode ? (
          <Unlock className="h-5 w-5" />
        ) : (
          <Lock className="h-5 w-5" />
        )}
        <span className="sr-only">
          {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </span>
      </Button>
    </div>
  );
};