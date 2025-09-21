import React from 'react';
import { Edit, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEditMode } from '@/contexts/EditModeContext';

export const EditModeToggle: React.FC = () => {
  const { isEditMode } = useEditMode();

  // Only show the toggle when already in edit mode - hidden from regular users
  if (!isEditMode) return null;

  return (
    <Badge 
      variant="secondary" 
      className="fixed bottom-6 left-6 z-50 bg-gradient-primary text-primary-foreground animate-pulse glass-card"
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit Mode Active
    </Badge>
  );
};