import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, BookOpen } from "lucide-react";

interface ProgressTrackerProps {
  progress: number; // Overall progress percentage
  currentSession: number;
  totalSessions: number;
  currentSection: number;
  totalSections: number;
  estimatedTimeRemaining?: number; // in minutes
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  currentSession,
  totalSessions,
  currentSection,
  totalSections,
  estimatedTimeRemaining = 0
}) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    return "text-blue-600";
  };

  const getProgressBadgeVariant = (progress: number) => {
    if (progress >= 80) return "default";
    if (progress >= 60) return "secondary";
    return "outline";
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
          <Target className="h-5 w-5" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Overall</span>
              <Badge variant={getProgressBadgeVariant(progress)} className="text-xs">
                {progress}%
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center gap-1 text-xs text-blue-700">
              <Trophy className="h-3 w-3" />
              <span>{progress >= 80 ? "Mastered" : progress >= 60 ? "Good Progress" : "Getting Started"}</span>
            </div>
          </div>

          {/* Session Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Session</span>
              <Badge variant="outline" className="text-xs">
                {currentSession}/{totalSessions}
              </Badge>
            </div>
            <Progress value={(currentSession / totalSessions) * 100} className="h-2" />
            <div className="flex items-center gap-1 text-xs text-blue-700">
              <BookOpen className="h-3 w-3" />
              <span>Session {currentSession} of {totalSessions}</span>
            </div>
          </div>

          {/* Section Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Section</span>
              <Badge variant="outline" className="text-xs">
                {currentSection}/{totalSections}
              </Badge>
            </div>
            <Progress value={(currentSection / totalSections) * 100} className="h-2" />
            <div className="flex items-center gap-1 text-xs text-blue-700">
              <Target className="h-3 w-3" />
              <span>Section {currentSection} of {totalSections}</span>
            </div>
          </div>

          {/* Time Estimate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Time Left</span>
              <Badge variant="outline" className="text-xs">
                Est.
              </Badge>
            </div>
            <div className="h-2 bg-blue-200 rounded-full flex items-center justify-center">
              <Clock className="h-3 w-3 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-700">
              <Clock className="h-3 w-3" />
              <span>{estimatedTimeRemaining > 0 ? formatTime(estimatedTimeRemaining) : "Unknown"}</span>
            </div>
          </div>
        </div>

        {/* Progress Milestones */}
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center justify-between text-xs text-blue-700">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 25 ? 'bg-blue-500' : 'bg-blue-200'}`} />
              <span>Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 50 ? 'bg-yellow-500' : 'bg-blue-200'}`} />
              <span>Halfway</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 75 ? 'bg-orange-500' : 'bg-blue-200'}`} />
              <span>Nearly There</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-blue-200'}`} />
              <span>Complete</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;

