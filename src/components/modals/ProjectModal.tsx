import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'review';
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project;
  title: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  project,
  title
}) => {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    status: 'planning'
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        id: Date.now().toString(),
        title: '',
        description: '',
        status: 'planning'
      });
    }
  }, [project, isOpen]);

  const handleSave = () => {
    if (formData.title.trim() && formData.description.trim()) {
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
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter project title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: Project['status']) => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.title.trim() || !formData.description.trim()}
            className="bg-gradient-button"
          >
            {project ? 'Update' : 'Add'} Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};