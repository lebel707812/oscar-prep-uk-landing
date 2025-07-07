-- Add time_spent column to exam_sessions table
ALTER TABLE public.exam_sessions 
ADD COLUMN time_spent INTEGER DEFAULT 0;

-- Add comment to explain the column
COMMENT ON COLUMN public.exam_sessions.time_spent IS 'Total time spent on exam in seconds';

-- Enable RLS on exam_sessions and exam_answers tables
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for exam_sessions
CREATE POLICY "Users can view their own exam sessions" 
ON public.exam_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own exam sessions" 
ON public.exam_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exam sessions" 
ON public.exam_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exam sessions" 
ON public.exam_sessions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for exam_answers
CREATE POLICY "Users can view their own exam answers" 
ON public.exam_answers 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.exam_sessions 
    WHERE exam_sessions.id = exam_answers.exam_session_id 
    AND exam_sessions.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create their own exam answers" 
ON public.exam_answers 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.exam_sessions 
    WHERE exam_sessions.id = exam_answers.exam_session_id 
    AND exam_sessions.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own exam answers" 
ON public.exam_answers 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.exam_sessions 
    WHERE exam_sessions.id = exam_answers.exam_session_id 
    AND exam_sessions.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own exam answers" 
ON public.exam_answers 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.exam_sessions 
    WHERE exam_sessions.id = exam_answers.exam_session_id 
    AND exam_sessions.user_id = auth.uid()
  )
);