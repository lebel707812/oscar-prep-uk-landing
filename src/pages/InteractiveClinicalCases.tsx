import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

const InteractiveClinicalCases: React.FC = () => {
  const navigate = useNavigate();

  const clinicalCases = [
    {
      id: 'case-1',
      title: 'Acute Abdominal Pain',
      description: 'A 45-year-old male presents with sudden onset severe abdominal pain.',
      difficulty: 'Intermediate',
      status: 'Not Started',
    },
    {
      id: 'case-2',
      title: 'Diabetic Ketoacidosis',
      description: 'A 22-year-old female with Type 1 Diabetes presents with nausea, vomiting, and altered mental status.',
      difficulty: 'Advanced',
      status: 'Not Started',
    },
    {
      id: 'case-3',
      title: 'Community-Acquired Pneumonia',
      description: 'An 80-year-old male presents with cough, fever, and shortness of breath.',
      difficulty: 'Beginner',
      status: 'Completed',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Interactive Clinical Cases</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicalCases.map((caseItem) => (
          <Card key={caseItem.id}>
            <CardHeader>
              <CardTitle>{caseItem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{caseItem.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Difficulty: {caseItem.difficulty}</span>
                <span className={`text-sm font-medium ${caseItem.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                  Status: {caseItem.status}
                </span>
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate(`/clinical-case/${caseItem.id}`)}
              >
                {caseItem.status === 'Completed' ? 'Review Case' : 'Start Case'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveClinicalCases;

