import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  enableEditMode: (password: string) => boolean;
  disableEditMode: () => void;
  showPasswordModal: boolean;
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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const savedEditMode = localStorage.getItem('portfolio-edit-mode');
    if (savedEditMode === 'true') {
      setIsEditMode(true);
    }
  }, []);

  // Windows+Ctrl+P shortcut to trigger password modal
  useKeyboardShortcut(
    { key: 'p', ctrlKey: true, metaKey: true },
    () => setShowPasswordModal(true)
  );

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

  const handlePasswordSubmit = () => {
    const success = enableEditMode(passwordInput);
    if (success) {
      setShowPasswordModal(false);
      setPasswordInput('');
    } else {
      // Keep modal open for retry
      setPasswordInput('');
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      disableEditMode();
    } else {
      setShowPasswordModal(true);
    }
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode, 
      enableEditMode, 
      disableEditMode,
      showPasswordModal
    }}>
      {children}
      
      {/* Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Enter the password to access edit mode.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit();
                }
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handlePasswordCancel}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit} disabled={!passwordInput}>
              Enter Edit Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EditModeContext.Provider>
  );
};