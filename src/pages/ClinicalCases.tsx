import React, { useState, useEffect } from "react";
import Layout from "@/components/ui/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Target, Search, Filter, ArrowRight, Play, CheckCircle } from "lucide-react";
import { fetchScenarios, fetchTopicsWithCounts } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

interface ClinicalCase {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  estimatedTime: string;
  category: string;
}

const ClinicalCases = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("scenarios");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Interactive clinical cases data
  const interactiveCases: ClinicalCase[] = [
    {
      id: 'case-1',
      title: 'Acute Abdominal Pain Assessment',
      description: 'A 45-year-old male presents with sudden onset severe abdominal pain. Practice your assessment skills and differential diagnosis.',
      difficulty: 'Intermediate',
      status: 'Not Started',
      estimatedTime: '8-10 minutes',
      category: 'Emergency Medicine'
    },
    {
      id: 'case-2',
      title: 'Diabetic Ketoacidosis Management',
      description: 'A 22-year-old female with Type 1 Diabetes presents with nausea, vomiting, and altered mental status. Learn to recognise and manage DKA.',
      difficulty: 'Advanced',
      status: 'Not Started',
      estimatedTime: '10-12 minutes',
      category: 'Endocrinology'
    },
    {
      id: 'case-3',
      title: 'Community-Acquired Pneumonia',
      description: 'An 80-year-old male presents with cough, fever, and shortness of breath. Practice respiratory assessment and treatment planning.',
      difficulty: 'Beginner',
      status: 'Completed',
      estimatedTime: '6-8 minutes',
      category: 'Respiratory Medicine'
    },
    {
      id: 'case-4',
      title: 'Chest Pain Evaluation',
      description: 'A 55-year-old female presents with chest pain. Learn to differentiate between cardiac and non-cardiac causes.',
      difficulty: 'Intermediate',
      status: 'In Progress',
      estimatedTime: '8-10 minutes',
      category: 'Cardiology'
    },
    {
      id: 'case-5',
      title: 'Mental Health Assessment',
      description: 'A 28-year-old patient presents with anxiety and depression symptoms. Practice mental health screening and communication skills.',
      difficulty: 'Intermediate',
      status: 'Not Started',
      estimatedTime: '10-12 minutes',
      category: 'Mental Health'
    },
    {
      id: 'case-6',
      title: 'Paediatric Fever Assessment',
      description: 'A 3-year-old child presents with high fever and irritability. Learn age-appropriate assessment techniques.',
      difficulty: 'Advanced',
      status: 'Not Started',
      estimatedTime: '8-10 minutes',
      category: 'Paediatrics'
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Not Started":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "In Progress":
        return <Play className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTopic("all");
    setSelectedDifficulty("all");
  };

  const handleCaseClick = (caseId: string) => {
    navigate(`/clinical-cases/${caseId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading clinical cases...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Clinical Cases</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Master your OSCE skills with our comprehensive collection of clinical cases and scenarios. 
            Practice interactive cases with real-time feedback or explore our extensive scenario library 
            to enhance your clinical reasoning and examination techniques.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="interactive">Interactive Cases</TabsTrigger>
            <TabsTrigger value="scenarios">Scenario Library</TabsTrigger>
          </TabsList>

          {/* Interactive Cases Tab */}
          <TabsContent value="interactive">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Interactive Clinical Cases</h2>
              <p className="text-gray-600">
                Step-by-step interactive cases with timer simulation and immediate feedback. 
                Perfect for practising under exam conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interactiveCases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(caseItem.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getDifficultyColor(caseItem.difficulty)}>
                        {caseItem.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(caseItem.status)}>
                        {caseItem.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 mb-4">
                      {caseItem.description}
                    </CardDescription>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium">{caseItem.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{caseItem.estimatedTime}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => handleCaseClick(caseItem.id)}
                    >
                      {caseItem.status === 'Completed' ? 'Review Case' : 
                       caseItem.status === 'In Progress' ? 'Continue Case' : 'Start Case'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scenario Library Tab */}
          <TabsContent value="scenarios">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">OSCE Scenario Library</h2>
              <p className="text-gray-600">
                Explore our comprehensive collection of OSCE scenarios with detailed descriptions, 
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClinicalCases;

