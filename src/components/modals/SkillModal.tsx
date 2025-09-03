import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft';
}

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (skill: Skill) => void;
  skill?: Skill;
  title: string;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  onClose,
  onSave,
  skill,
  title
}) => {
  const [formData, setFormData] = useState<Skill>({
    name: '',
    level: 50,
    category: 'technical'
  });

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    } else {
      setFormData({
        name: '',
        level: 50,
        category: 'technical'
      });
    }
  }, [skill, isOpen]);

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleLevelChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, level: value[0] }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gradient-text">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter skill name..."
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value: 'technical' | 'soft') => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="soft">Soft Skill</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Proficiency Level: {formData.level}%</Label>
            <Slider
              value={[formData.level]}
              onValueChange={handleLevelChange}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="bg-gradient-button"
          >
            {skill ? 'Update' : 'Add'} Skill
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};