import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, X, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { SkillModal } from '@/components/modals/SkillModal';

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft';
}

interface SkillsSectionProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  className?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSkillsChange,
  className
}) => {
  const { isEditMode } = useEditMode();
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<{ skill: Skill; index: number } | null>(null);
  
  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const softSkills = skills.filter(skill => skill.category === 'soft');

  const handleAddSkill = (category: 'technical' | 'soft') => {
    setEditingSkill(null);
    setShowModal(true);
  };

  const handleEditSkill = (skill: Skill, index: number) => {
    setEditingSkill({ skill, index });
    setShowModal(true);
  };

  const handleSaveSkill = (skillData: Skill) => {
    if (editingSkill) {
      const updatedSkills = [...skills];
      updatedSkills[editingSkill.index] = skillData;
      onSkillsChange(updatedSkills);
    } else {
      onSkillsChange([...skills, skillData]);
    }
    setShowModal(false);
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onSkillsChange(newSkills);
  };

  const SkillCard = ({ skill, index, onEdit, onRemove }: {
    skill: Skill;
    index: number;
    onEdit: () => void;
    onRemove: () => void;
  }) => (
    <div className="group relative p-4 rounded-lg glass-card hover-lift">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">{skill.name}</span>
        {isEditMode && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 smooth-transition">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0 text-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0 text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Level</span>
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
            {skill.level}%
          </Badge>
        </div>
        <Progress value={skill.level} className="h-2" />
      </div>
    </div>
  );

  return (
    <section id="skills" className={cn('py-20', className)}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Skills & Expertise</h2>
        <p className="text-xl text-center text-muted-foreground mb-16">
          Technologies and soft skills that drive my work
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <Card className="glass-card border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl gradient-text">Technical Skills</span>
                {isEditMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddSkill('technical')}
                    className="text-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {technicalSkills.map((skill, index) => {
                  const skillIndex = skills.findIndex(s => s === skill);
                  return (
                    <SkillCard
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                      onEdit={() => handleEditSkill(skill, skillIndex)}
                      onRemove={() => removeSkill(skillIndex)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Soft Skills */}
          <Card className="glass-card border-none shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl gradient-text">Soft Skills</span>
                {isEditMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddSkill('soft')}
                    className="text-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {softSkills.map((skill, index) => {
                  const skillIndex = skills.findIndex(s => s === skill);
                  return (
                    <SkillCard
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                      onEdit={() => handleEditSkill(skill, skillIndex)}
                      onRemove={() => removeSkill(skillIndex)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <SkillModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveSkill}
          skill={editingSkill?.skill}
          title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
        />
      </div>
    </section>
  );
};