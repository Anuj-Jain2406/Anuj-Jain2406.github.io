import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: string;
  title: string;
  institution: string;
  period: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  course?: Course;
  title: string;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  course,
  title
}) => {
  const [formData, setFormData] = useState<Course>({
    id: '',
    title: '',
    institution: '',
    period: '',
    status: 'upcoming'
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        id: Date.now().toString(),
        title: '',
        institution: '',
        period: '',
        status: 'upcoming'
      });
    }
  }, [course, isOpen]);

  const handleSave = () => {
    if (formData.title.trim() && formData.institution.trim() && formData.period.trim()) {
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
            <Label htmlFor="course-title">Course Title</Label>
            <Input
              id="course-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter course title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course-institution">Institution</Label>
            <Input
              id="course-institution"
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              placeholder="University/Platform name..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course-period">Period</Label>
            <Input
              id="course-period"
              value={formData.period}
              onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
              placeholder="e.g., 2020 - 2024 or Jan 2024 - Present"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: Course['status']) => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
            disabled={!formData.title.trim() || !formData.institution.trim() || !formData.period.trim()}
            className="bg-gradient-button"
          >
            {course ? 'Update' : 'Add'} Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};