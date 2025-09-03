import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Clock, Code, TestTube, Eye } from 'lucide-react';
import { EditableText } from '../EditableText';
import { cn } from '@/lib/utils';

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
  const addWork = () => {
    const newWork: OngoingWork = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description...',
      status: 'planning'
    };
    onWorksChange([...works, newWork]);
  };

  const removeWork = (id: string) => {
    onWorksChange(works.filter(work => work.id !== id));
  };

  const updateWork = (id: string, updates: Partial<OngoingWork>) => {
    onWorksChange(works.map(work => 
      work.id === id ? { ...work, ...updates } : work
    ));
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
          <Button
            onClick={addWork}
            className="bg-gradient-button hover:scale-105 smooth-transition shadow-soft"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
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
                      <EditableText
                        value={work.title}
                        onChange={(title) => updateWork(work.id, { title })}
                        as="h3"
                        className="text-lg font-semibold"
                      />
                      <Badge variant="secondary" className={cn(
                        'mt-2 text-white',
                        statusInfo.color
                      )}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWork(work.id)}
                      className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-destructive smooth-transition"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <EditableText
                    value={work.description}
                    onChange={(description) => updateWork(work.id, { description })}
                    multiline
                    className="text-muted-foreground"
                  />
                  
                  <div className="mt-4">
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Status
                    </label>
                    <select
                      value={work.status}
                      onChange={(e) => updateWork(work.id, { status: e.target.value as OngoingWork['status'] })}
                      className="w-full p-2 rounded-md bg-background border border-border smooth-transition focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <option key={key} value={key}>
                          {config.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};