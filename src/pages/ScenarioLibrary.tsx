import React, { useState, useEffect } from "react";
import Layout from "@/components/ui/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, Target, Search, Filter } from "lucide-react";
import { fetchScenarios, fetchTopicsWithCounts } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Scenario {
  id: string;
  title: string;
  description: string;
  learning_objectives: string[];
  difficulty_level: string;
  created_at: string;
  topics: { name: string };
}

interface Topic {
  id: string;
  name: string;
}

const ScenarioLibrary = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterScenarios();
  }, [scenarios, searchTerm, selectedTopic, selectedDifficulty]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [scenariosData, topicsData] = await Promise.all([
        fetchScenarios(),
        fetchTopicsWithCounts()
      ]);
      
      setScenarios(scenariosData as any);
      setTopics(topicsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load scenarios. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterScenarios = () => {
    let filtered = scenarios;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(scenario =>
        scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.learning_objectives.some(obj => 
          obj.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by topic
    if (selectedTopic !== "all") {
      filtered = filtered.filter(scenario => 
        scenario.topics?.name === selectedTopic
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(scenario => 
        scenario.difficulty_level === selectedDifficulty
      );
    }

    setFilteredScenarios(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTopic("all");
    setSelectedDifficulty("all");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading scenarios...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">OSCE Scenario Library</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore our comprehensive collection of OSCE scenarios designed to help you practice 
            and master essential nursing skills. Each scenario includes detailed descriptions, 
            learning objectives, and difficulty levels to guide your preparation.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search scenarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Topic Filter */}
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.name}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Difficulty Filter */}
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredScenarios.length} of {scenarios.length} scenarios
          </p>
        </div>

        {/* Scenarios Grid */}
        {filteredScenarios.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No scenarios found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms to find scenarios.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScenarios.map((scenario) => (
              <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getDifficultyColor(scenario.difficulty_level)}>
                          {scenario.difficulty_level}
                        </Badge>
                        {scenario.topics && (
                          <Badge variant="secondary">
                            {scenario.topics.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {scenario.description}
                  </CardDescription>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm">Learning Objectives:</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-6">
                      {scenario.learning_objectives.slice(0, 3).map((objective, index) => (
                        <li key={index} className="list-disc">
                          {objective}
                        </li>
                      ))}
                      {scenario.learning_objectives.length > 3 && (
                        <li className="text-blue-600 font-medium">
                          +{scenario.learning_objectives.length - 3} more objectives
                        </li>
                      )}
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        Added {new Date(scenario.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScenarioLibrary;

