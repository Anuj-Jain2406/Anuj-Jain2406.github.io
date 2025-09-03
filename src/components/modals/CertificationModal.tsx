import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certification: Certification) => void;
  certification?: Certification;
  title: string;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  certification,
  title
}) => {
  const [formData, setFormData] = useState<Certification>({
    id: '',
    title: '',
    issuer: '',
    date: '',
    credentialUrl: ''
  });

  useEffect(() => {
    if (certification) {
      setFormData(certification);
    } else {
      setFormData({
        id: Date.now().toString(),
        title: '',
        issuer: '',
        date: '',
        credentialUrl: ''
      });
    }
  }, [certification, isOpen]);

  const handleSave = () => {
    if (formData.title.trim() && formData.issuer.trim() && formData.date.trim()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-gradient-text">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="cert-title">Certification Title</Label>
            <Input
              id="cert-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter certification title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-issuer">Issuing Organization</Label>
            <Input
              id="cert-issuer"
              value={formData.issuer}
              onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
              placeholder="Organization that issued the certification..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-date">Issue Date</Label>
            <Input
              id="cert-date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cert-url">Credential URL (Optional)</Label>
            <Input
              id="cert-url"
              value={formData.credentialUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, credentialUrl: e.target.value }))}
              placeholder="Link to verify the certification..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.title.trim() || !formData.issuer.trim() || !formData.date.trim()}
            className="bg-gradient-button"
          >
            {certification ? 'Update' : 'Add'} Certification
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};