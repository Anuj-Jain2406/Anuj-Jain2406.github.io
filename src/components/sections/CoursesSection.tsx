import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { CourseModal } from '@/components/modals/CourseModal';

interface Course {
  id: string;
  title: string;
  institution: string;
  period: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface CoursesSectionProps {
  courses: Course[];
  onCoursesChange: (courses: Course[]) => void;
  className?: string;
}

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-green-500' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-500' },
  upcoming: { label: 'Upcoming', color: 'bg-yellow-500' }
};

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onCoursesChange,
  className
}) => {
  const { isEditMode } = useEditMode();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleSaveCourse = (courseData: Course) => {
    if (editingCourse) {
      onCoursesChange(courses.map(course => 
        course.id === editingCourse.id ? courseData : course
      ));
    } else {
      onCoursesChange([...courses, courseData]);
    }
    setShowModal(false);
  };

  const removeCourse = (id: string) => {
    onCoursesChange(courses.filter(course => course.id !== id));
  };

  return (
    <section id="courses" className={cn('py-20 bg-gradient-hero/10', className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div className="text-center flex-1">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Courses & Education</h2>
            <p className="text-xl text-muted-foreground">
              Academic journey and continuous learning path
            </p>
          </div>
          {isEditMode && (
            <Button
              onClick={handleAddCourse}
              className="bg-gradient-button hover:scale-105 smooth-transition shadow-soft"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary opacity-30" />
            
            <div className="space-y-8">
              {courses.map((course, index) => {
                const statusInfo = statusConfig[course.status];
                
                return (
                  <div key={course.id} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    
                    {/* Course card */}
                    <Card className="flex-1 glass-card border-none shadow-soft hover-lift group">
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{course.institution}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{course.period}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className={cn(
                              'w-fit text-white',
                              statusInfo.color
                            )}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                          {isEditMode && (
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 smooth-transition">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                                className="h-8 w-8 p-0 text-primary"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCourse(course.id)}
                                className="h-8 w-8 p-0 text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <CourseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCourse}
          course={editingCourse || undefined}
          title={editingCourse ? 'Edit Course' : 'Add New Course'}
        />
      </div>
    </section>
  );
};