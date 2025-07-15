# Configuração do Supabase para Oscar Prep UK

## Tabelas SQL Necessárias

### 1. Tabela `topics`
```sql
CREATE TABLE topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados de exemplo
INSERT INTO topics (name, slug, description) VALUES
('Emergency Medicine', 'emergency-medicine', 'Casos de emergência e urgência médica'),
('Cardiology', 'cardiology', 'Casos relacionados ao sistema cardiovascular'),
('Respiratory', 'respiratory', 'Casos do sistema respiratório'),
('Endocrinology', 'endocrinology', 'Casos do sistema endócrino'),
('Infection Control', 'infection-control', 'Controle de infecções e cuidados pós-operatórios'),
('Medication Management', 'medication-management', 'Administração segura de medicamentos'),
('Paediatric Nursing', 'paediatric-nursing', 'Enfermagem pediátrica'),
('Mental Health Nursing', 'mental-health-nursing', 'Enfermagem em saúde mental');
```

### 2. Tabela `questions`
```sql
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array de opções
  correct_answer VARCHAR(10) NOT NULL, -- 'A', 'B', 'C', 'D'
  explanation TEXT,
  difficulty_level INTEGER DEFAULT 1, -- 1=Beginner, 2=Intermediate, 3=Advanced
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);
```

### 3. Tabela `exam_sessions`
```sql
CREATE TABLE exam_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  score INTEGER,
  time_spent INTEGER, -- em segundos
  feedback TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finished_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_exam_sessions_user_id ON exam_sessions(user_id);
CREATE INDEX idx_exam_sessions_topic_id ON exam_sessions(topic_id);
CREATE INDEX idx_exam_sessions_finished_at ON exam_sessions(finished_at);
```

### 4. Tabela `exam_answers`
```sql
CREATE TABLE exam_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  selected_option VARCHAR(10) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_exam_answers_session_id ON exam_answers(exam_session_id);
CREATE INDEX idx_exam_answers_question_id ON exam_answers(question_id);
```

### 5. Tabela `scenarios`
```sql
CREATE TABLE scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  learning_objectives JSONB, -- Array de objetivos de aprendizagem
  difficulty_level VARCHAR(50) DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir cenários de exemplo
INSERT INTO scenarios (title, description, learning_objectives, difficulty_level, topic_id) VALUES
('Acute Chest Pain Assessment', 'A 55-year-old male presents to the emergency department with sudden onset chest pain that started 2 hours ago. The pain is described as crushing, radiating to the left arm and jaw. The patient appears anxious and diaphoretic. You need to conduct a comprehensive assessment to determine the cause and appropriate management.', '["Perform systematic cardiovascular assessment", "Recognize signs and symptoms of acute coronary syndrome", "Implement appropriate emergency interventions", "Communicate effectively with patient and healthcare team"]', 'Intermediate', (SELECT id FROM topics WHERE slug = 'cardiology')),

('Post-Operative Wound Care', 'You are caring for a 68-year-old female patient who is 3 days post-operative following an abdominal surgery. During your shift assessment, you notice that the surgical wound appears red around the edges with some purulent discharge. The patient reports increased pain at the incision site and feels generally unwell.', '["Assess surgical wound for signs of infection", "Implement appropriate infection control measures", "Document findings accurately", "Communicate concerns to medical team"]', 'Beginner', (SELECT id FROM topics WHERE slug = 'infection-control')),

('Medication Administration Safety', 'You are preparing to administer medications to Mrs. Johnson, an 82-year-old patient with multiple comorbidities including diabetes, hypertension, and heart failure. She is prescribed 8 different medications to be given at various times throughout the day. The patient seems confused about her medications and asks why she needs to take so many pills.', '["Demonstrate safe medication administration practices", "Verify patient identity and medication orders", "Provide patient education about medications", "Recognize potential drug interactions"]', 'Intermediate', (SELECT id FROM topics WHERE slug = 'medication-management')),

('Pediatric Fever Management', 'A 3-year-old child is brought to the clinic by their mother with a fever of 39.2°C (102.5°F) that started yesterday evening. The child appears lethargic, has decreased appetite, and the mother reports the child has been more irritable than usual. You need to conduct an age-appropriate assessment and provide family education.', '["Perform age-appropriate pediatric assessment", "Recognize signs of serious illness in children", "Provide family education and support", "Implement fever management strategies"]', 'Advanced', (SELECT id FROM topics WHERE slug = 'paediatric-nursing')),

('Mental Health Crisis Intervention', 'A 28-year-old patient presents to the emergency department expressing thoughts of self-harm. They appear agitated and state they cannot take it anymore. The patient has a history of depression and recently lost their job. You need to conduct a mental health assessment while ensuring safety for both the patient and staff.', '["Conduct mental health risk assessment", "Implement safety measures for patient and staff", "Demonstrate therapeutic communication skills", "Coordinate with mental health team"]', 'Advanced', (SELECT id FROM topics WHERE slug = 'mental-health-nursing')),

('Respiratory Distress Assessment', 'An elderly patient with COPD presents with increased shortness of breath, productive cough with yellow-green sputum, and reports feeling more tired than usual. The patients oxygen saturation is 88% on room air. You need to perform a comprehensive respiratory assessment and implement appropriate interventions.', '["Perform comprehensive respiratory assessment", "Recognize signs of respiratory distress", "Implement appropriate oxygen therapy", "Monitor patient response to interventions"]', 'Intermediate', (SELECT id FROM topics WHERE slug = 'respiratory'));
```

### 6. Políticas de Segurança (RLS - Row Level Security)

```sql
-- Habilitar RLS nas tabelas
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;

-- Política para exam_sessions - usuários só podem ver suas próprias sessões
CREATE POLICY "Users can view own exam sessions" ON exam_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Política para exam_answers - usuários só podem ver suas próprias respostas
CREATE POLICY "Users can view own exam answers" ON exam_answers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM exam_sessions 
      WHERE exam_sessions.id = exam_answers.exam_session_id 
      AND exam_sessions.user_id = auth.uid()
    )
  );

-- Políticas para leitura pública de topics, questions e scenarios
CREATE POLICY "Topics are viewable by everyone" ON topics FOR SELECT USING (true);
CREATE POLICY "Questions are viewable by everyone" ON questions FOR SELECT USING (true);
CREATE POLICY "Scenarios are viewable by everyone" ON scenarios FOR SELECT USING (true);
```

## Configuração de Autenticação

### 1. Configurar Providers de Autenticação
- Habilitar Email/Password authentication
- Configurar confirmação de email (opcional)
- Configurar reset de senha

### 2. Configurar URLs de Redirecionamento
- Site URL: `http://localhost:8080` (desenvolvimento)
- Redirect URLs: `http://localhost:8080/auth/callback`

## Variáveis de Ambiente Necessárias

Já configuradas no arquivo `.env`:
```
VITE_SUPABASE_URL=https://lnfonzpwstsxetmznlsy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZm9uenB3c3RzeGV0bXpubHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTI2OTUsImV4cCI6MjA2NzM4ODY5NX0.88ANEI_0jkeDdZ9PvcWHTdFEHzfb6GfPYeTH7_5QCcc
```

## Funcionalidades Implementadas

### 1. Sistema de Autenticação
- Login/Logout
- Registro de usuários
- Persistência de sessão
- Proteção de rotas

### 2. Casos Clínicos Interativos
- Sistema de timer por passo
- Progresso visual
- Feedback inteligente
- Análise de performance

### 3. Biblioteca de Cenários
- Filtros por tópico e dificuldade
- Busca de cenários
- Visualização detalhada

### 4. Sistema de Exames
- Criação de sessões de exame
- Salvamento de respostas
- Cálculo de pontuação
- Histórico de sessões

## Próximos Passos

1. Executar os scripts SQL no Supabase Dashboard
2. Verificar se as políticas RLS estão funcionando
3. Testar a autenticação com usuário real
4. Popular as tabelas com dados de exemplo
5. Testar todas as funcionalidades integradas

