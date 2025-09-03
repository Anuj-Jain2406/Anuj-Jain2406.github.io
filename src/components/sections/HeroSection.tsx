import React from 'react';
import { ProfileImage } from '../ProfileImage';
import { EditableText } from '../EditableText';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  name: string;
  bio: string;
  profileImage?: string;
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  bio,
  profileImage,
  onNameChange,
  onBioChange,
  onImageChange,
  className
}) => {
  return (
    <section className={cn('relative min-h-screen flex items-center justify-center', className)}>
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-20 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 -z-10" />
      
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="flex-shrink-0 animate-slide-up">
            <ProfileImage
              src={profileImage}
              alt={name}
              onChange={onImageChange}
              size="xl"
              className="animate-pulse-glow"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left animate-slide-up">
            <EditableText
              value={name}
              onChange={onNameChange}
              as="h1"
              className="text-5xl lg:text-7xl font-bold mb-6 gradient-text"
              placeholder="Your Name"
            />
            
            <EditableText
              value={bio}
              onChange={onBioChange}
              as="p"
              multiline
              className="text-xl lg:text-2xl text-muted-foreground leading-relaxed"
              placeholder="Write your bio here..."
            />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};