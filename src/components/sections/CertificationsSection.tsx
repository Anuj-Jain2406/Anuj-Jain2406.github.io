import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Award, ExternalLink, Calendar, Building } from 'lucide-react';
import { EditableText } from '../EditableText';
import { cn } from '@/lib/utils';

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
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      title: 'New Certification',
      issuer: 'Certification Body',
      date: new Date().toISOString().split('T')[0],
      credentialUrl: ''
    };
    onCertificationsChange([...certifications, newCert]);
  };

  const removeCertification = (id: string) => {
    onCertificationsChange(certifications.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onCertificationsChange(certifications.map(cert => 
      cert.id === id ? { ...cert, ...updates } : cert
    ));
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
          <Button
            onClick={addCertification}
            className="bg-gradient-button hover:scale-105 smooth-transition shadow-soft"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-destructive smooth-transition"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <EditableText
                  value={cert.title}
                  onChange={(title) => updateCertification(cert.id, { title })}
                  as="h3"
                  className="text-lg font-semibold mb-2"
                />
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <EditableText
                      value={cert.issuer}
                      onChange={(issuer) => updateCertification(cert.id, { issuer })}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <input
                      type="date"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                      className="bg-transparent border-none text-sm text-muted-foreground cursor-pointer hover:text-primary smooth-transition"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Credential URL (optional)
                  </label>
                  <input
                    value={cert.credentialUrl || ''}
                    onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })}
                    placeholder="https://credential-url.com"
                    className="w-full p-2 rounded-md bg-background border border-border smooth-transition focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
                
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
      </div>
    </section>
  );
};