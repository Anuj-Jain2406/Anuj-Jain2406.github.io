import React, { createContext, useContext, useEffect, useState } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  enableEditMode: (password: string) => boolean;
  disableEditMode: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};

interface EditModeProviderProps {
  children: React.ReactNode;
}

// Simple password for demo - in production, use proper authentication
const EDIT_PASSWORD = 'portfolio2024';

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const savedEditMode = localStorage.getItem('portfolio-edit-mode');
    if (savedEditMode === 'true') {
      setIsEditMode(true);
    }
  }, []);

  const enableEditMode = (password: string): boolean => {
    if (password === EDIT_PASSWORD) {
      setIsEditMode(true);
      localStorage.setItem('portfolio-edit-mode', 'true');
      return true;
    }
    return false;
  };

  const disableEditMode = () => {
    setIsEditMode(false);
    localStorage.removeItem('portfolio-edit-mode');
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      disableEditMode();
    } else {
      // Will need to prompt for password
      const password = window.prompt('Enter edit mode password:');
      if (password) {
        const success = enableEditMode(password);
        if (!success) {
          alert('Incorrect password!');
        }
      }
    }
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode, 
      enableEditMode, 
      disableEditMode 
    }}>
      {children}
    </EditModeContext.Provider>
  );
};