import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Session {
  id: string;
  station_name: string;
  score: number;
  feedback?: string;
  created_at: string;
  user_id: string;
}

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSession, setNewSession] = useState({
    station_name: '',
    score: 0,
    feedback: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user?.id) {
      navigate('/auth');
    } else {
      fetchSessions();
    }
  }, [user, navigate]);

  const fetchSessions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching sessions",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSessions(data || []);
    }
    setLoading(false);
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('sessions')
      .insert([{
        ...newSession,
        user_id: user?.id,
        score: Number(newSession.score)
      }]);

    if (error) {
      toast({
        title: "Error adding session",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Session added successfully!",
      });
      setNewSession({
        station_name: '',
        score: 0,
        feedback: ''
      });
      await fetchSessions();
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your OSCE Sessions</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Session Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSession} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="station">Station Name</Label>
                <Input
                  id="station"
                  value={newSession.station_name}
                  onChange={(e) => setNewSession({...newSession, station_name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="score">Score (0-100)</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={newSession.score}
                  onChange={(e) => setNewSession({...newSession, score: Number(e.target.value)})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Input
                  id="feedback"
                  value={newSession.feedback}
                  onChange={(e) => setNewSession({...newSession, feedback: e.target.value})}
                />
              </div>
              
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Session"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="space-y-4">
          {loading && <p>Loading sessions...</p>}
          {!loading && sessions.length === 0 && <p>No sessions found.</p>}
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>{session.station_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="font-medium">{session.score}/100</span>
                  </div>
                  
                  {session.feedback && (
                    <div>
                      <span className="text-sm text-muted-foreground">Feedback</span>
                      <p className="text-sm">{session.feedback}</p>
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    {new Date(session.created_at).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
