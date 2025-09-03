import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, Award, ExternalLink, Calendar, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { CertificationModal } from '@/components/modals/CertificationModal';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  onCertificationsChange: (certifications: Certification[]) => void;
  className?: string;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onCertificationsChange,
  className
}) => {
  const { isEditMode } = useEditMode();
  const [showModal, setShowModal] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  const handleAddCertification = () => {
    setEditingCertification(null);
    setShowModal(true);
  };

  const handleEditCertification = (certification: Certification) => {
    setEditingCertification(certification);
    setShowModal(true);
  };

  const handleSaveCertification = (certificationData: Certification) => {
    if (editingCertification) {
      onCertificationsChange(certifications.map(cert => 
        cert.id === editingCertification.id ? certificationData : cert
      ));
    } else {
      onCertificationsChange([...certifications, certificationData]);
    }
    setShowModal(false);
  };

  const removeCertification = (id: string) => {
    onCertificationsChange(certifications.filter(cert => cert.id !== id));
  };

  const openCredential = (url: string) => {
    if (url) {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
    }
  };

  return (
    <section id="certifications" className={cn('py-20', className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div className="text-center flex-1">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Certifications & Awards</h2>
            <p className="text-xl text-muted-foreground">
              Professional credentials and achievements
            </p>
          </div>
          {isEditMode && (
            <Button
              onClick={handleAddCertification}
              className="bg-gradient-button hover:scale-105 smooth-transition shadow-soft"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="glass-card border-none shadow-soft hover-lift group relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-10 rounded-bl-full" />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  {isEditMode && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 smooth-transition">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCertification(cert)}
                        className="h-8 w-8 p-0 text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCertification(cert.id)}
                        className="h-8 w-8 p-0 text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(cert.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {cert.credentialUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openCredential(cert.credentialUrl!)}
                    className="w-full justify-center glass-card hover:bg-gradient-primary hover:text-primary-foreground smooth-transition"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Credential
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {certifications.length === 0 && (
          <div className="text-center py-16">
            <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">No certifications added yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Click "Add Certification" to showcase your achievements!</p>
          </div>
        )}

        <CertificationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCertification}
          certification={editingCertification || undefined}
          title={editingCertification ? 'Edit Certification' : 'Add New Certification'}
        />
      </div>
    </section>
  );
};