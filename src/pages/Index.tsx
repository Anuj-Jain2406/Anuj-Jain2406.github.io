import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { EditModeToggle } from '@/components/EditModeToggle';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactsSection } from '@/components/sections/ContactsSection';
import { OngoingWorksSection } from '@/components/sections/OngoingWorksSection';
import { CoursesSection } from '@/components/sections/CoursesSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { usePortfolioData } from '@/hooks/usePortfolioData';

const Index = () => {
  const { data, updateField } = usePortfolioData();

  return (
    <ThemeProvider>
      <EditModeProvider>
        <div className="min-h-screen bg-background custom-scrollbar">
          <ThemeToggle />
          <EditModeToggle />
          <Navigation />

        {/* Hero Section */}
        <HeroSection
          name={data.name}
          bio={data.bio}
          profileImage={data.profileImage}
          onNameChange={(name) => updateField('name', name)}
          onBioChange={(bio) => updateField('bio', bio)}
          onImageChange={(profileImage) => updateField('profileImage', profileImage)}
        />

        {/* Skills Section */}
        <SkillsSection
          skills={data.skills}
          onSkillsChange={(skills) => updateField('skills', skills)}
        />

        {/* Ongoing Works Section */}
        <OngoingWorksSection
          works={data.ongoingWorks}
          onWorksChange={(ongoingWorks) => updateField('ongoingWorks', ongoingWorks)}
        />

        {/* Courses Section */}
        <CoursesSection
          courses={data.courses}
          onCoursesChange={(courses) => updateField('courses', courses)}
        />

        {/* Certifications Section */}
        <CertificationsSection
          certifications={data.certifications}
          onCertificationsChange={(certifications) => updateField('certifications', certifications)}
        />

        {/* Contacts Section */}
        <ContactsSection
          contacts={data.contacts}
          onContactsChange={(contacts) => updateField('contacts', contacts)}
        />

        {/* Footer */}
        <footer className="py-12 bg-gradient-hero/20 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground">
              © 2024 {data.name}. Built with ❤️ using React & TypeScript
            </p>
          </div>
        </footer>
        </div>
      </EditModeProvider>
    </ThemeProvider>
  );
};

export default Index;
