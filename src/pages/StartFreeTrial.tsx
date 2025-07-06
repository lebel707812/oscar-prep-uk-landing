import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const StartFreeTrial = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Criar conta no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password: 'temporary-password', // Será alterado após confirmação
        options: {
          data: {
            full_name: fullName,
            trial_start: new Date().toISOString(),
            trial_active: true
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Trial Started!",
        description: "Check your email to complete registration",
        variant: "default",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Start Your 14-Day Free Trial
          </CardTitle>
          <CardDescription className="text-lg">
            Get full access to all OSCE preparation features
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleStartTrial} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Starting Trial..." : "Start Free Trial"}
              </Button>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What's Included:</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Full access to 1000+ practice scenarios</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>AI-powered feedback and analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>24/7 support from OSCE experts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Personalized study plans</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                No credit card required. Cancel anytime during trial period.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartFreeTrial;
