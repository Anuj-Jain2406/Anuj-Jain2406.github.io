import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, Clock, Code, TestTube, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { ProjectModal } from '@/components/modals/ProjectModal';

interface OngoingWork {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'review';
}

interface OngoingWorksSectionProps {
  works: OngoingWork[];
  onWorksChange: (works: OngoingWork[]) => void;
  className?: string;
}

const statusConfig = {
  planning: { label: 'Planning', icon: Clock, color: 'bg-yellow-500' },
  development: { label: 'Development', icon: Code, color: 'bg-blue-500' },
  testing: { label: 'Testing', icon: TestTube, color: 'bg-orange-500' },
  review: { label: 'Review', icon: Eye, color: 'bg-green-500' }
};

export const OngoingWorksSection: React.FC<OngoingWorksSectionProps> = ({
  works,
  onWorksChange,
  className
}) => {
  const { isEditMode } = useEditMode();
  const [showModal, setShowModal] = useState(false);
  const [editingWork, setEditingWork] = useState<OngoingWork | null>(null);

  const handleAddWork = () => {
    setEditingWork(null);
    setShowModal(true);
  };

  const handleEditWork = (work: OngoingWork) => {
    setEditingWork(work);
    setShowModal(true);
  };

  const handleSaveWork = (workData: OngoingWork) => {
    if (editingWork) {
      onWorksChange(works.map(work => 
        work.id === editingWork.id ? workData : work
      ));
    } else {
      onWorksChange([...works, workData]);
    }
    setShowModal(false);
  };

  const removeWork = (id: string) => {
    onWorksChange(works.filter(work => work.id !== id));
  };

  return (
    <section id="ongoing" className={cn('py-20', className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div className="text-center flex-1">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Ongoing Works</h2>
            <p className="text-xl text-muted-foreground">
              Current projects and experiments in progress
            </p>
          </div>
          {isEditMode && (
            <Button
              onClick={handleAddWork}
              className="bg-gradient-button hover:scale-105 smooth-transition shadow-soft"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => {
            const statusInfo = statusConfig[work.status];
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={work.id} className="glass-card border-none shadow-soft hover-lift group">
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
                      <Badge variant="secondary" className={cn(
                        'text-white',
                        statusInfo.color
                      )}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    {isEditMode && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 smooth-transition">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditWork(work)}
                          className="h-8 w-8 p-0 text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWork(work.id)}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{work.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <ProjectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveWork}
          project={editingWork || undefined}
          title={editingWork ? 'Edit Project' : 'Add New Project'}
        />
      </div>
    </section>
  );
};