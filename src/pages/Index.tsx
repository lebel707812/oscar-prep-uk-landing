import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          OSCE Preparation Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Join thousands of nurses preparing for their OSCE exams with our comprehensive platform
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

