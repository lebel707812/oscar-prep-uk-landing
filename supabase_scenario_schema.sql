-- Table: scenarios
CREATE TABLE public.scenarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    learning_objectives TEXT[],
    difficulty_level TEXT NOT NULL,
    topic_id UUID REFERENCES public.topics(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: scenario_questions (if scenarios have specific questions)
CREATE TABLE public.scenario_questions (
    scenario_id UUID REFERENCES public.scenarios(id),
    question_id UUID REFERENCES public.questions(id),
    question_order INT NOT NULL,
    PRIMARY KEY (scenario_id, question_id)
);

-- Optional: Add RLS policies for scenarios table
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.scenarios
  FOR SELECT USING (TRUE);

CREATE POLICY "Enable insert for authenticated users" ON public.scenarios
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for users who created the scenario" ON public.scenarios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users who created the scenario" ON public.scenarios
  FOR DELETE USING (auth.uid() = user_id);


