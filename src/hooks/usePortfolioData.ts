import { useState, useEffect } from 'react';

export interface PortfolioData {
  name: string;
  bio: string;
  profileImage?: string;
  skills: Array<{
    name: string;
    level: number;
    category: 'technical' | 'soft';
  }>;
  contacts: {
    instagram?: string;
    linkedin?: string;
    email?: string;
    whatsapp?: string;
    github?: string;
  };
  ongoingWorks: Array<{
    id: string;
    title: string;
    description: string;
    status: 'planning' | 'development' | 'testing' | 'review';
  }>;
  courses: Array<{
    id: string;
    title: string;
    institution: string;
    period: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  }>;
  certifications: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
  }>;
}

const defaultData: PortfolioData = {
  name: 'Your Name',
  bio: 'A passionate developer creating amazing experiences with modern web technologies. Always learning, always building, always improving.',
  skills: [
    { name: 'React', level: 90, category: 'technical' },
    { name: 'TypeScript', level: 85, category: 'technical' },
    { name: 'Node.js', level: 80, category: 'technical' },
    { name: 'Python', level: 75, category: 'technical' },
    { name: 'Problem Solving', level: 95, category: 'soft' },
    { name: 'Team Collaboration', level: 90, category: 'soft' },
    { name: 'Communication', level: 85, category: 'soft' },
  ],
  contacts: {
    github: 'https://github.com/yourusername',
    instagram: 'https://instagram.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'your.email@example.com',
    whatsapp: '+1234567890'
  },
  ongoingWorks: [
    {
      id: '1',
      title: 'Modern Portfolio Website',
      description: 'Building a responsive, dynamic portfolio with React and TypeScript',
      status: 'development'
    },
    {
      id: '2', 
      title: 'AI-Powered Task Manager',
      description: 'Developing an intelligent task management system with ML recommendations',
      status: 'planning'
    }
  ],
  courses: [
    {
      id: '1',
      title: 'Computer Science',
      institution: 'University Name',
      period: '2020 - 2024',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Advanced React Development',
      institution: 'Online Platform',
      period: '2024 - Present',
      status: 'in-progress'
    }
  ],
  certifications: [
    {
      id: '1',
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2024-01-15',
      credentialUrl: 'https://aws.amazon.com/certification/'
    },
    {
      id: '2',
      title: 'React Professional Certificate',
      issuer: 'Meta',
      date: '2023-11-20',
      credentialUrl: 'https://coursera.org/professional-certificates/meta-react-native'
    }
  ]
};

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData({ ...defaultData, ...parsedData });
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  const updateData = (updates: Partial<PortfolioData>) => {
    const newData = { ...data, ...updates };
    setData(newData);
    localStorage.setItem('portfolio-data', JSON.stringify(newData));
  };

  const updateField = <K extends keyof PortfolioData>(
    field: K,
    value: PortfolioData[K]
  ) => {
    updateData({ [field]: value });
  };

  return {
    data,
    updateData,
    updateField
  };
};