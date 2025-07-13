import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, Clock } from "lucide-react";

interface ContentSectionProps {
  title: string;
  content: string;
  onComplete: () => void; // This will now be called by the parent to mark section complete
  isCompleted: boolean;
  estimatedTime?: number; // in minutes
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  onComplete,
  isCompleted,
  estimatedTime = 5
}) => {
  const handleMarkComplete = () => {
    if (!isCompleted) {
      onComplete(); // Call the onComplete prop which will trigger markSectionComplete in parent
    }
  };

  const formatContent = (text: string) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {estimatedTime} min
          </Badge>
          {isCompleted && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: `<p>${formatContent(content)}</p>` 
            }}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Reading time: approximately {estimatedTime} minutes
        </div>
        
        <Button
          onClick={handleMarkComplete}
          disabled={isCompleted}
          className={isCompleted ? "bg-green-600 hover:bg-green-600" : ""}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </>
          ) : (
            "Mark as Complete"
          )}
        </Button>
      </div>

      {/* Key Points Summary */}
      {content.includes("Key Points:") && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Key Learning Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-800">
              <p className="text-sm">
                Review the key concepts covered in this section to reinforce your understanding.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentSection;


