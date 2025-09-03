import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { EditableText } from '../EditableText';
import { cn } from '@/lib/utils';

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
  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: 'New Course',
      institution: 'Institution Name',
      period: '2024 - Present',
      status: 'in-progress'
    };
    onCoursesChange([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    onCoursesChange(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    onCoursesChange(courses.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
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
          <Button
            onClick={addCourse}
            className="bg-gradient-button hover:scale-105 smooth-transition shadow-soft"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
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
                            <EditableText
                              value={course.title}
                              onChange={(title) => updateCourse(course.id, { title })}
                              as="h3"
                              className="text-xl font-semibold"
                            />
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <EditableText
                                  value={course.institution}
                                  onChange={(institution) => updateCourse(course.id, { institution })}
                                  className="text-sm"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <EditableText
                                  value={course.period}
                                  onChange={(period) => updateCourse(course.id, { period })}
                                  className="text-sm"
                                />
                              </div>
                            </div>
                            <Badge variant="secondary" className={cn(
                              'w-fit text-white',
                              statusInfo.color
                            )}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCourse(course.id)}
                            className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-destructive smooth-transition"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Status
                          </label>
                          <select
                            value={course.status}
                            onChange={(e) => updateCourse(course.id, { status: e.target.value as Course['status'] })}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};