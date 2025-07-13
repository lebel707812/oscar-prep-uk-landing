import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target, 
  TrendingUp, 
  Brain,
  Star,
  Award,
  Lightbulb
} from 'lucide-react';

interface StepPerformance {
  stepId: string;
  timeSpent: number;
  timeLimit: number;
  completed: boolean;
  efficiency: 'excellent' | 'good' | 'needs_improvement';
}

interface FeedbackData {
  overallScore: number;
  timeManagement: 'excellent' | 'good' | 'needs_improvement';
  clinicalReasoning: 'excellent' | 'good' | 'needs_improvement';
  systematicApproach: 'excellent' | 'good' | 'needs_improvement';
  stepPerformances: StepPerformance[];
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
}

interface FeedbackSystemProps {
  caseId: string;
  stepPerformances: StepPerformance[];
  onClose: () => void;
}

const FeedbackSystem: React.FC<FeedbackSystemProps> = ({ 
  caseId, 
  stepPerformances, 
  onClose 
}) => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateIntelligentFeedback();
  }, [stepPerformances]);

  const generateIntelligentFeedback = () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const feedback = analyzePerformance(stepPerformances);
      setFeedback(feedback);
      setIsGenerating(false);
    }, 2000);
  };

  const analyzePerformance = (performances: StepPerformance[]): FeedbackData => {
    const totalSteps = performances.length;
    const completedSteps = performances.filter(p => p.completed).length;
    const overallScore = Math.round((completedSteps / totalSteps) * 100);

    // Analyze time management
    const timeEfficiencies = performances.map(p => {
      const timeUsed = p.timeSpent / p.timeLimit;
      if (timeUsed <= 0.8) return 'excellent';
      if (timeUsed <= 1.0) return 'good';
      return 'needs_improvement';
    });

    const excellentTimes = timeEfficiencies.filter(e => e === 'excellent').length;
    const goodTimes = timeEfficiencies.filter(e => e === 'good').length;
    
    let timeManagement: 'excellent' | 'good' | 'needs_improvement';
    if (excellentTimes >= totalSteps * 0.7) timeManagement = 'excellent';
    else if (excellentTimes + goodTimes >= totalSteps * 0.6) timeManagement = 'good';
    else timeManagement = 'needs_improvement';

    // Generate contextual feedback based on case type and performance
    const strengths: string[] = [];
    const areasForImprovement: string[] = [];
    const recommendations: string[] = [];

    // Time management feedback
    if (timeManagement === 'excellent') {
      strengths.push('Excellent time management throughout the case');
    } else if (timeManagement === 'needs_improvement') {
      areasForImprovement.push('Time management could be improved');
      recommendations.push('Practice with a timer to improve efficiency');
    }

    // Step-specific feedback
    if (completedSteps === totalSteps) {
      strengths.push('Completed all required steps systematically');
    } else {
      areasForImprovement.push(`${totalSteps - completedSteps} steps were not completed`);
      recommendations.push('Focus on completing all assessment steps within time limits');
    }

    // Case-specific insights
    if (caseId === 'case-1') {
      if (performances[0]?.efficiency === 'excellent') {
        strengths.push('Strong initial patient assessment approach');
      }
      if (performances[2]?.efficiency === 'needs_improvement') {
        areasForImprovement.push('Physical examination technique needs refinement');
        recommendations.push('Review systematic abdominal examination techniques');
      }
    }

    // General recommendations based on performance patterns
    if (overallScore >= 90) {
      recommendations.push('Consider advancing to more complex cases');
    } else if (overallScore >= 70) {
      recommendations.push('Good progress - focus on consistency across all steps');
    } else {
      recommendations.push('Review case materials and practice fundamental skills');
    }

    return {
      overallScore,
      timeManagement,
      clinicalReasoning: overallScore >= 80 ? 'excellent' : overallScore >= 60 ? 'good' : 'needs_improvement',
      systematicApproach: completedSteps >= totalSteps * 0.8 ? 'excellent' : completedSteps >= totalSteps * 0.6 ? 'good' : 'needs_improvement',
      stepPerformances: performances,
      strengths,
      areasForImprovement,
      recommendations
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (level: 'excellent' | 'good' | 'needs_improvement') => {
    const configs = {
      excellent: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      good: { color: 'bg-yellow-100 text-yellow-800', icon: Star },
      needs_improvement: { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    
    const config = configs[level];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon size={12} className="mr-1" />
        {level.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (isGenerating) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="animate-pulse" />
            Generating Intelligent Feedback...
          </CardTitle>
          <CardDescription>
            Analyzing your performance and generating personalized insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={33} className="animate-pulse" />
            <div className="text-center text-sm text-gray-600">
              Processing your case performance data...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!feedback) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Overall Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-blue-600" />
            Case Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                {feedback.overallScore}%
              </div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="mb-2">Time Management</div>
              {getPerformanceBadge(feedback.timeManagement)}
            </div>
            <div className="text-center">
              <div className="mb-2">Clinical Reasoning</div>
              {getPerformanceBadge(feedback.clinicalReasoning)}
            </div>
            <div className="text-center">
              <div className="mb-2">Systematic Approach</div>
              {getPerformanceBadge(feedback.systematicApproach)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Areas for Improvement */}
      {feedback.areasForImprovement.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <TrendingUp />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Lightbulb />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedback.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Step-by-Step Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target />
            Step-by-Step Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.stepPerformances.map((step, index) => (
              <div key={step.stepId} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">Step {index + 1}</div>
                    <div className="text-sm text-gray-600">
                      {Math.round(step.timeSpent)}s / {step.timeLimit}s
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {step.completed ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <Clock className="text-red-600" size={20} />
                  )}
                  {getPerformanceBadge(step.efficiency)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={onClose} variant="outline">
          Close Feedback
        </Button>
        <Button onClick={() => window.location.reload()}>
          Retry Case
        </Button>
        <Button>
          Next Case
        </Button>
      </div>
    </div>
  );
};

export default FeedbackSystem;

