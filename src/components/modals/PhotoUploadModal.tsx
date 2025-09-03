import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, Link } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
  currentImage?: string;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentImage
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const [urlInput, setUrlInput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        setUrlInput('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    setPreviewUrl(url);
  };

  const handleSave = () => {
    if (previewUrl) {
      onSave(previewUrl);
      onClose();
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gradient-text">Update Profile Photo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Preview */}
          <div className="flex justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={previewUrl} alt="Preview" />
              <AvatarFallback className="text-2xl">
                <User className="w-16 h-16" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Upload Options */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Upload from Device</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <div>
              <Label htmlFor="image-url" className="text-sm font-medium mb-2 block">
                <Link className="w-4 h-4 inline mr-2" />
                Image URL
              </Label>
              <Input
                id="image-url"
                value={urlInput}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste image URL here..."
              />
            </div>
          </div>

          {previewUrl && (
            <Button 
              variant="outline" 
              onClick={handleRemove}
              className="w-full"
            >
              Remove Photo
            </Button>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!previewUrl}
            className="bg-gradient-button"
          >
            Save Photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};