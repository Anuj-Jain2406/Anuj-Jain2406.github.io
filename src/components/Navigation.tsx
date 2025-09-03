import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  User, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  GraduationCap, 
  Award,
  Github,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'skills', label: 'Skills', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'ongoing', label: 'Ongoing Works', icon: Settings },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'contacts', label: 'Contacts', icon: MessageSquare },
];

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'projects') {
      // Open GitHub in new tab
      window.open('https://github.com', '_blank');
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn(
        'hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-soft' 
          : 'bg-transparent',
        className
      )}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant="ghost"
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'relative px-4 py-2 rounded-full smooth-transition',
                    activeSection === id
                      ? 'bg-gradient-primary text-primary-foreground shadow-soft'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                  {id === 'projects' && <Github className="h-4 w-4 ml-2" />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-6 left-6 z-50 rounded-full w-12 h-12 p-0 glass-card hover-lift"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[80vw] bg-background border-r border-border shadow-strong">
              <div className="p-6 pt-20">
                <h3 className="text-lg font-semibold mb-6 gradient-text">Navigation</h3>
                <div className="space-y-2">
                  {navItems.map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      variant="ghost"
                      onClick={() => scrollToSection(id)}
                      className={cn(
                        'w-full justify-start px-4 py-3 rounded-lg smooth-transition',
                        activeSection === id
                          ? 'bg-gradient-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      )}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {label}
                      {id === 'projects' && <Github className="h-4 w-4 ml-auto" />}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};