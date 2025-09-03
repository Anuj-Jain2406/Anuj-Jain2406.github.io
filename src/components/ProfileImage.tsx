import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';
import { PhotoUploadModal } from '@/components/modals/PhotoUploadModal';

interface ProfileImageProps {
  src?: string;
  alt: string;
  onChange: (imageUrl: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32', 
  lg: 'w-48 h-48',
  xl: 'w-64 h-64'
};

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  onChange,
  className,
  size = 'lg'
}) => {
  const { isEditMode } = useEditMode();
  const [showModal, setShowModal] = useState(false);

  const handleSavePhoto = (imageUrl: string) => {
    onChange(imageUrl);
    setShowModal(false);
  };

  return (
    <div className={cn('relative group', className)}>
      <div className={cn(
        'profile-image-container animate-float',
        sizeClasses[size]
      )}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-hero rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-primary-foreground" />
          </div>
        )}
        
        {/* Upload overlay - only show in edit mode */}
        {isEditMode && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModal(true)}
              className="text-white hover:text-white hover:bg-white/20"
            >
              <Edit className="w-5 h-5 mr-2" />
              Change
            </Button>
          </div>
        )}
      </div>

      <PhotoUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSavePhoto}
        currentImage={src}
      />
    </div>
  );
};