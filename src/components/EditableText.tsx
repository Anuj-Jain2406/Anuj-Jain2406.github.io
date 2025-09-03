import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Edit3, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className,
  placeholder = 'Click to edit...',
  multiline = false,
  as: Component = 'p'
}) => {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    
    return (
      <div className="relative group">
        <InputComponent
          ref={inputRef as any}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full bg-background border-2 border-primary rounded-lg px-3 py-2 resize-none',
            className
          )}
          placeholder={placeholder}
          rows={multiline ? 3 : undefined}
        />
        <div className="absolute -top-2 -right-2 flex gap-1">
          <Button
            size="sm"
            variant="default"
            onClick={handleSave}
            className="h-8 w-8 p-0 bg-gradient-button"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (!isEditMode) {
    return (
      <Component className={className}>
        {value || <span className="text-muted-foreground">{placeholder}</span>}
      </Component>
    );
  }

  return (
    <div className="group relative cursor-pointer" onClick={() => setIsEditing(true)}>
      <Component className={cn(className, 'smooth-transition group-hover:opacity-80')}>
        {value || <span className="text-muted-foreground">{placeholder}</span>}
      </Component>
      <Edit3 className="absolute -top-2 -right-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 smooth-transition" />
    </div>
  );
};