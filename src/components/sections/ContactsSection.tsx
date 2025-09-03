import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Instagram, Linkedin, Mail, MessageCircle, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactsData {
  instagram?: string;
  linkedin?: string;
  email?: string;
  whatsapp?: string;
  github?: string;
}

interface ContactsSectionProps {
  contacts: ContactsData;
  onContactsChange: (contacts: ContactsData) => void;
  className?: string;
}

const contactFields = [
  { key: 'email' as keyof ContactsData, label: 'Email', icon: Mail, placeholder: 'your.email@example.com' },
  { key: 'github' as keyof ContactsData, label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
  { key: 'linkedin' as keyof ContactsData, label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { key: 'instagram' as keyof ContactsData, label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
  { key: 'whatsapp' as keyof ContactsData, label: 'WhatsApp', icon: MessageCircle, placeholder: '+1234567890' },
];

export const ContactsSection: React.FC<ContactsSectionProps> = ({
  contacts,
  onContactsChange,
  className
}) => {
  const updateContact = (field: keyof ContactsData, value: string) => {
    onContactsChange({
      ...contacts,
      [field]: value
    });
  };

  const openContact = (field: keyof ContactsData, value: string) => {
    let url = value;
    
    if (field === 'email') {
      url = `mailto:${value}`;
    } else if (field === 'whatsapp') {
      const cleanNumber = value.replace(/\D/g, '');
      url = `https://wa.me/${cleanNumber}`;
    } else if (!value.startsWith('http')) {
      url = `https://${value}`;
    }
    
    window.open(url, '_blank');
  };

  return (
    <section id="contacts" className={cn('py-20 bg-gradient-hero/20', className)}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Get In Touch</h2>
        <p className="text-xl text-center text-muted-foreground mb-16">
          Let's connect and create something amazing together
        </p>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-none shadow-strong">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text text-center">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Update Your Contact Info</h3>
                  {contactFields.map(({ key, label, icon: Icon, placeholder }) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        {label}
                      </Label>
                      <Input
                        id={key}
                        value={contacts[key] || ''}
                        onChange={(e) => updateContact(key, e.target.value)}
                        placeholder={placeholder}
                        className="smooth-transition focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>

                {/* Contact Links */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                  <div className="grid gap-4">
                    {contactFields.map(({ key, label, icon: Icon }) => {
                      const value = contacts[key];
                      if (!value) return null;

                      return (
                        <Button
                          key={key}
                          variant="ghost"
                          onClick={() => openContact(key, value)}
                          className="justify-start h-auto p-4 glass-card hover-lift group"
                        >
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-medium">{label}</div>
                              <div className="text-sm text-muted-foreground truncate">
                                {value}
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary smooth-transition" />
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};