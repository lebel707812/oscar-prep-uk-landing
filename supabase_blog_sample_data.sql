-- Sample blog posts for OSCE Prep UK
-- This file contains sample blog posts to populate the blog

-- Insert sample blog posts
-- Note: You'll need to replace the author_id with actual user IDs from your auth.users table
-- For now, we'll use a placeholder that you should update

-- Get category IDs for reference
-- You can run these queries to get the actual IDs:
-- SELECT id, slug FROM public.blog_categories;

-- Sample Post 1: O que é o OSCE
INSERT INTO public.blog_posts (
    title,
    slug,
    excerpt,
    content,
    category_id,
    status,
    meta_title,
    meta_description,
    tags,
    reading_time,
    published_at
) VALUES (
    'O que é o OSCE e por que ele é crucial para enfermeiros internacionais no NHS?',
    'o-que-e-osce-enfermeiros-internacionais-nhs',
    'Descubra tudo sobre o Objective Structured Clinical Examination (OSCE) e sua importância para enfermeiros internacionais que desejam trabalhar no NHS.',
    '<h2>Introdução ao OSCE</h2>
    <p>O Objective Structured Clinical Examination (OSCE) é um exame prático que avalia as competências clínicas de enfermeiros internacionais que desejam trabalhar no Reino Unido. Este exame é fundamental para garantir que os profissionais atendam aos padrões de qualidade e segurança do NHS.</p>
    
    <h2>O que é o OSCE?</h2>
    <p>O OSCE é um exame estruturado que consiste em várias estações onde os candidatos demonstram suas habilidades clínicas em cenários simulados. Cada estação avalia competências específicas, desde comunicação até procedimentos técnicos.</p>
    
    <h3>Estrutura do Exame</h3>
    <ul>
        <li><strong>Duração:</strong> Aproximadamente 2 horas</li>
        <li><strong>Estações:</strong> 6 estações de 10 minutos cada</li>
        <li><strong>Formato:</strong> Cenários práticos com atores/simuladores</li>
        <li><strong>Avaliação:</strong> Competências clínicas e de comunicação</li>
    </ul>
    
    <h2>Por que o OSCE é Crucial?</h2>
    <p>Para enfermeiros internacionais, o OSCE representa mais do que um exame - é a porta de entrada para uma carreira no NHS. O exame garante que:</p>
    
    <ul>
        <li>Os profissionais atendam aos padrões britânicos de enfermagem</li>
        <li>A segurança do paciente seja mantida</li>
        <li>A qualidade do cuidado seja consistente</li>
        <li>A comunicação seja efetiva no contexto britânico</li>
    </ul>
    
    <h2>Preparação Efetiva</h2>
    <p>A preparação para o OSCE requer uma abordagem estruturada que combine conhecimento teórico, prática clínica e desenvolvimento de habilidades de comunicação. É essencial familiarizar-se com:</p>
    
    <ul>
        <li>Protocolos e diretrizes do NHS</li>
        <li>Terminologia médica britânica</li>
        <li>Técnicas de comunicação culturalmente apropriadas</li>
        <li>Procedimentos clínicos padrão</li>
    </ul>
    
    <h2>Conclusão</h2>
    <p>O OSCE é um marco importante na jornada de enfermeiros internacionais rumo ao NHS. Com preparação adequada e compreensão clara dos requisitos, é possível alcançar o sucesso e iniciar uma carreira gratificante no sistema de saúde britânico.</p>',
    (SELECT id FROM public.blog_categories WHERE slug = 'preparacao-exame-osce'),
    'published',
    'OSCE para Enfermeiros Internacionais: Guia Completo para o NHS',
    'Guia completo sobre o OSCE para enfermeiros internacionais. Saiba tudo sobre este exame crucial para trabalhar no NHS.',
    ARRAY['OSCE', 'NHS', 'enfermeiros internacionais', 'exame', 'Reino Unido'],
    8,
    NOW() - INTERVAL '7 days'
);

-- Sample Post 2: A Arte da Anamnese
INSERT INTO public.blog_posts (
    title,
    slug,
    excerpt,
    content,
    category_id,
    status,
    meta_title,
    meta_description,
    tags,
    reading_time,
    published_at
) VALUES (
    'A Arte da Anamnese: Como Coletar Histórico Clínico de Forma Eficaz no OSCE',
    'arte-anamnese-historico-clinico-osce',
    'Aprenda técnicas essenciais para realizar uma anamnese efetiva durante o OSCE, incluindo comunicação empática e coleta estruturada de informações.',
    '<h2>A Importância da Anamnese no OSCE</h2>
    <p>A anamnese é uma das competências mais avaliadas no OSCE, representando a base de qualquer cuidado de enfermagem efetivo. Uma coleta de histórico bem estruturada não apenas demonstra competência técnica, mas também habilidades de comunicação essenciais.</p>
    
    <h2>Estrutura da Anamnese</h2>
    <p>Uma anamnese efetiva segue uma estrutura lógica que garante a coleta completa de informações relevantes:</p>
    
    <h3>1. Apresentação e Estabelecimento de Rapport</h3>
    <ul>
        <li>Apresente-se claramente</li>
        <li>Confirme a identidade do paciente</li>
        <li>Explique o propósito da consulta</li>
        <li>Obtenha consentimento para prosseguir</li>
    </ul>
    
    <h3>2. Queixa Principal</h3>
    <p>Identifique o motivo principal da consulta usando perguntas abertas:</p>
    <ul>
        <li>"O que trouxe você aqui hoje?"</li>
        <li>"Como posso ajudá-lo?"</li>
        <li>"Conte-me sobre seus sintomas"</li>
    </ul>
    
    <h3>3. História da Doença Atual</h3>
    <p>Explore os sintomas usando o método SOCRATES:</p>
    <ul>
        <li><strong>S</strong>ite - Localização</li>
        <li><strong>O</strong>nset - Início</li>
        <li><strong>C</strong>haracter - Características</li>
        <li><strong>R</strong>adiation - Irradiação</li>
        <li><strong>A</strong>ssociated symptoms - Sintomas associados</li>
        <li><strong>T</strong>ime course - Evolução temporal</li>
        <li><strong>E</strong>xacerbating/relieving factors - Fatores agravantes/atenuantes</li>
        <li><strong>S</strong>everity - Gravidade</li>
    </ul>
    
    <h2>Técnicas de Comunicação Efetiva</h2>
    
    <h3>Escuta Ativa</h3>
    <ul>
        <li>Mantenha contato visual apropriado</li>
        <li>Use linguagem corporal aberta</li>
        <li>Demonstre interesse genuíno</li>
        <li>Evite interrupções desnecessárias</li>
    </ul>
    
    <h3>Perguntas Efetivas</h3>
    <ul>
        <li><strong>Abertas:</strong> Para explorar sintomas</li>
        <li><strong>Fechadas:</strong> Para confirmar detalhes específicos</li>
        <li><strong>Reflexivas:</strong> Para demonstrar compreensão</li>
    </ul>
    
    <h2>Considerações Culturais</h2>
    <p>No contexto britânico, é importante considerar:</p>
    <ul>
        <li>Diversidade cultural dos pacientes</li>
        <li>Barreiras linguísticas potenciais</li>
        <li>Sensibilidades religiosas e culturais</li>
        <li>Necessidades de interpretação</li>
    </ul>
    
    <h2>Dicas para o Sucesso no OSCE</h2>
    
    <h3>Antes do Exame</h3>
    <ul>
        <li>Pratique com cenários variados</li>
        <li>Familiarize-se com terminologia médica britânica</li>
        <li>Desenvolva um roteiro mental estruturado</li>
    </ul>
    
    <h3>Durante o Exame</h3>
    <ul>
        <li>Mantenha a calma e confiança</li>
        <li>Gerencie o tempo efetivamente</li>
        <li>Demonstre empatia genuína</li>
        <li>Seja claro e conciso</li>
    </ul>
    
    <h2>Conclusão</h2>
    <p>A anamnese é uma arte que combina técnica e humanidade. No OSCE, demonstrar competência nesta área não apenas garante pontos importantes, mas também reflete a qualidade do cuidado que você proporcionará como enfermeiro no NHS.</p>',
    (SELECT id FROM public.blog_categories WHERE slug = 'habilidades-comunicacao-osce'),
    'published',
    'Anamnese no OSCE: Guia Completo para Enfermeiros Internacionais',
    'Aprenda técnicas essenciais de anamnese para o OSCE. Guia completo com estrutura, comunicação e dicas práticas.',
    ARRAY['anamnese', 'OSCE', 'comunicação', 'histórico clínico', 'enfermagem'],
    12,
    NOW() - INTERVAL '5 days'
);

-- Sample Post 3: História de Sucesso
INSERT INTO public.blog_posts (
    title,
    slug,
    excerpt,
    content,
    category_id,
    status,
    meta_title,
    meta_description,
    tags,
    reading_time,
    published_at
) VALUES (
    'Minha Jornada da Índia ao NHS: Uma História de Sucesso no OSCE',
    'jornada-india-nhs-historia-sucesso-osce',
    'A inspiradora história de Priya, enfermeira indiana que superou desafios e conquistou seu lugar no NHS através do OSCE.',
    '<h2>O Sonho de Trabalhar no NHS</h2>
    <p>Meu nome é Priya Sharma, e esta é a história de como realizei meu sonho de trabalhar como enfermeira no NHS. Nascida em Mumbai, sempre sonhei em expandir meus horizontes profissionais e contribuir para um sistema de saúde reconhecido mundialmente.</p>
    
    <h2>Os Primeiros Passos</h2>
    <p>Após me formar em enfermagem na Índia e trabalhar por três anos em um hospital privado, decidi dar o grande passo. O processo começou com muita pesquisa e planejamento:</p>
    
    <h3>Preparação Inicial</h3>
    <ul>
        <li>Pesquisa sobre o NMC (Nursing and Midwifery Council)</li>
        <li>Preparação para o IELTS</li>
        <li>Coleta de documentos necessários</li>
        <li>Aplicação para o CBT (Computer Based Test)</li>
    </ul>
    
    <h2>O Desafio do OSCE</h2>
    <p>Após passar no CBT, chegou o momento mais desafiador: o OSCE. Confesso que inicialmente me senti intimidada. As diferenças culturais, a terminologia médica britânica e o formato do exame eram completamente novos para mim.</p>
    
    <h3>Estratégias de Preparação</h3>
    <p>Desenvolvi um plano de estudos estruturado:</p>
    
    <h4>1. Conhecimento Teórico</h4>
    <ul>
        <li>Estudo das diretrizes do NHS</li>
        <li>Familiarização com protocolos britânicos</li>
        <li>Compreensão do sistema de saúde do Reino Unido</li>
    </ul>
    
    <h4>2. Prática Clínica</h4>
    <ul>
        <li>Simulações de cenários OSCE</li>
        <li>Prática de comunicação em inglês</li>
        <li>Desenvolvimento de habilidades técnicas</li>
    </ul>
    
    <h4>3. Preparação Cultural</h4>
    <ul>
        <li>Compreensão da diversidade cultural britânica</li>
        <li>Aprendizado sobre sensibilidades culturais</li>
        <li>Adaptação do estilo de comunicação</li>
    </ul>
    
    <h2>O Dia do Exame</h2>
    <p>O dia do OSCE chegou, e eu estava nervosa, mas preparada. Lembro-me claramente de cada estação:</p>
    
    <h3>Estação 1: Comunicação com Paciente Ansioso</h3>
    <p>Precisei acalmar um paciente antes de um procedimento. Usei técnicas de escuta ativa e empatia que havia praticado extensivamente.</p>
    
    <h3>Estação 2: Administração de Medicamentos</h3>
    <p>Demonstrei os "5 certos" da administração de medicamentos, explicando cada passo claramente ao examinador.</p>
    
    <h3>Estação 3: Avaliação de Sinais Vitais</h3>
    <p>Realizei uma avaliação completa, documentando adequadamente e identificando valores anormais.</p>
    
    <h2>Superando Obstáculos</h2>
    <p>Durante a preparação, enfrentei vários desafios:</p>
    
    <h3>Barreira Linguística</h3>
    <p>Embora falasse inglês, a terminologia médica britânica e os sotaques regionais foram inicialmente difíceis. Resolvi isso através de:</p>
    <ul>
        <li>Assistir programas médicos britânicos</li>
        <li>Praticar com falantes nativos</li>
        <li>Usar aplicativos de pronúncia</li>
    </ul>
    
    <h3>Diferenças Culturais</h3>
    <p>Adaptar-me às normas culturais britânicas exigiu:</p>
    <ul>
        <li>Compreensão da comunicação direta, mas respeitosa</li>
        <li>Aprendizado sobre privacidade e consentimento</li>
        <li>Familiarização com diversidade religiosa e cultural</li>
    </ul>
    
    <h2>O Resultado</h2>
    <p>Três semanas após o exame, recebi a notícia que mudaria minha vida: havia passado no OSCE! A sensação de alívio e alegria foi indescritível.</p>
    
    <h2>Vida no NHS</h2>
    <p>Hoje, dois anos depois, trabalho em um hospital em Londres e posso dizer que cada desafio valeu a pena. O NHS me proporcionou:</p>
    
    <ul>
        <li>Oportunidades de desenvolvimento profissional</li>
        <li>Ambiente de trabalho multicultural</li>
        <li>Acesso a tecnologias avançadas</li>
        <li>Possibilidade de especialização</li>
    </ul>
    
    <h2>Conselhos para Futuros Candidatos</h2>
    
    <h3>1. Prepare-se Adequadamente</h3>
    <p>Não subestime a importância da preparação. Invista tempo em compreender não apenas os aspectos técnicos, mas também culturais.</p>
    
    <h3>2. Pratique Comunicação</h3>
    <p>A comunicação é fundamental. Pratique cenários diversos e desenvolva confiança para expressar-se claramente.</p>
    
    <h3>3. Mantenha-se Positivo</h3>
    <p>Haverá momentos de dúvida, mas lembre-se de que milhares de enfermeiros internacionais já trilharam este caminho com sucesso.</p>
    
    <h3>4. Busque Apoio</h3>
    <p>Conecte-se com outros enfermeiros internacionais. A comunidade é muito acolhedora e disposta a ajudar.</p>
    
    <h2>Conclusão</h2>
    <p>Minha jornada da Índia ao NHS foi desafiadora, mas extremamente gratificante. O OSCE foi apenas o primeiro passo de uma carreira que continua a me surpreender e realizar. Para todos os enfermeiros internacionais que sonham em trabalhar no NHS: acreditem em vocês mesmos, preparem-se adequadamente e perseverem. O sonho é possível!</p>
    
    <p><em>Se você está se preparando para o OSCE ou considerando trabalhar no NHS, sinta-se à vontade para conectar-se comigo através das redes sociais. Estou sempre disposta a ajudar colegas em sua jornada.</em></p>',
    (SELECT id FROM public.blog_categories WHERE slug = 'historias-sucesso-inspiracao'),
    'published',
    'História de Sucesso OSCE: Da Índia ao NHS - Jornada de Enfermeira Internacional',
    'História inspiradora de enfermeira indiana que conquistou seu lugar no NHS. Dicas, desafios e estratégias para o sucesso no OSCE.',
    ARRAY['história de sucesso', 'OSCE', 'NHS', 'enfermeira internacional', 'Índia', 'Reino Unido'],
    15,
    NOW() - INTERVAL '3 days'
);

-- Sample Post 4: Estações do OSCE
INSERT INTO public.blog_posts (
    title,
    slug,
    excerpt,
    content,
    category_id,
    status,
    meta_title,
    meta_description,
    tags,
    reading_time,
    published_at
) VALUES (
    'Desvendando as Estações do OSCE: O que esperar em cada uma',
    'desvendando-estacoes-osce-o-que-esperar',
    'Guia detalhado sobre as diferentes estações do OSCE, incluindo o que esperar, como se preparar e dicas para o sucesso em cada uma.',
    '<h2>Introdução às Estações do OSCE</h2>
    <p>O OSCE (Objective Structured Clinical Examination) é composto por várias estações, cada uma projetada para avaliar competências específicas de enfermagem. Compreender o que esperar em cada estação é fundamental para uma preparação efetiva e sucesso no exame.</p>
    
    <h2>Estrutura Geral do OSCE</h2>
    <p>O OSCE para enfermeiros internacionais no Reino Unido consiste tipicamente em:</p>
    <ul>
        <li><strong>6 estações ativas</strong> de 10 minutos cada</li>
        <li><strong>2 estações de preparação</strong> de 5 minutos cada</li>
        <li><strong>Tempo total:</strong> Aproximadamente 90 minutos</li>
    </ul>
    
    <h2>Estação 1: Comunicação e Relacionamento Interpessoal</h2>
    
    <h3>O que esperar:</h3>
    <ul>
        <li>Cenários de comunicação com pacientes, familiares ou colegas</li>
        <li>Situações que requerem empatia e compreensão</li>
        <li>Discussões sobre consentimento informado</li>
        <li>Comunicação de más notícias ou informações sensíveis</li>
    </ul>
    
    <h3>Competências avaliadas:</h3>
    <ul>
        <li>Habilidades de comunicação verbal e não-verbal</li>
        <li>Escuta ativa e empatia</li>
        <li>Capacidade de estabelecer rapport</li>
        <li>Sensibilidade cultural</li>
    </ul>
    
    <h3>Dicas para o sucesso:</h3>
    <ul>
        <li>Mantenha contato visual apropriado</li>
        <li>Use linguagem clara e acessível</li>
        <li>Demonstre empatia genuína</li>
        <li>Respeite a privacidade e dignidade do paciente</li>
    </ul>
    
    <h2>Estação 2: Respiração</h2>
    
    <h3>O que esperar:</h3>
    <ul>
        <li>Avaliação do sistema respiratório</li>
        <li>Administração de oxigenoterapia</li>
        <li>Cuidados com vias aéreas</li>
        <li>Monitorização de saturação de oxigênio</li>
    </ul>
    
    <h3>Competências avaliadas:</h3>
    <ul>
        <li>Técnicas de avaliação respiratória</li>
        <li>Conhecimento sobre oxigenoterapia</li>
        <li>Identificação de sinais de desconforto respiratório</li>
        <li>Intervenções de enfermagem apropriadas</li>
    </ul>
    
    <h3>Pontos-chave a lembrar:</h3>
    <ul>
        <li>Sempre verifique a prescrição médica</li>
        <li>Monitore continuamente o paciente</li>
        <li>Documente adequadamente</li>
        <li>Reconheça quando escalar para médico</li>
    </ul>
    
    <h2>Estação 3: Circulação</h2>
    
    <h3>O que esperar:</h3>
    <ul>
        <li>Verificação de sinais vitais</li>
        <li>Avaliação cardiovascular</li>
        <li>Cuidados com acesso venoso</li>
        <li>Monitorização cardíaca</li>
    </ul>
    
    <h3>Competências avaliadas:</h3>
    <ul>
        <li>Técnica correta de verificação de sinais vitais</li>
        <li>Interpretação de valores anormais</li>
        <li>Cuidados com dispositivos cardiovasculares</li>
        <li>Reconhecimento de emergências cardiovasculares</li>
    </ul>
    
    <h3>Aspectos importantes:</h3>
    <ul>
        <li>Use equipamentos calibrados</li>
        <li>Posicione o paciente adequadamente</li>
        <li>Registre valores com precisão</li>
        <li>Identifique valores fora dos parâmetros normais</li>
    </ul>
    
    <h2>Estação 4: Controle de Infecção</h2>
    
    <h3>O que esperar:</h3>
    <ul>
        <li>Técnicas de higienização das mãos</li>
        <li>Uso correto de EPIs</li>
        <li>Isolamento de pacientes</li>
        <li>Prevenção de infecções cruzadas</li>
    </ul>
    
    <h3>Competências avaliadas:</h3>
    <ul>
        <li>Conhecimento sobre precauções padrão</li>
        <li>Técnica correta de higienização</li>
        <li>Uso apropriado de EPIs</li>
        <li>Compreensão de diferentes tipos de isolamento</li>
    </ul>
    
    <h3>Pontos críticos:</h3>
    <ul>
        <li>Higienize as mãos nos momentos corretos</li>
        <li>Use EPIs na sequência correta</li>
        <li>Descarte materiais adequadamente</li>
        <li>Mantenha ambiente limpo e organizado</li>
    </ul>
    
    <h2>Estação 5: Administração de Medicamentos</h2>
    
    <h3>O que esperar:</h3>
    <ul>
        <li>Preparação e administração de medicamentos</li>
        <li>Cálculos de dosagem</li>
        <li>Verificação de prescrições</li>
        <li>Monitorização de efeitos adversos</li>
    </ul>
    
    <h3>Competências avaliadas:</h3>
    <ul>
        <li>Conhecimento dos "5 certos"</li>
        <li>Habilidades de cálculo</li>
        <li>Técnicas de administração</li>
        <li>Educação do paciente sobre medicamentos</li>
    </ul>
    
    <h3>Os "5 Certos" essenciais:</h3>
    <ul>
        <li><strong>Paciente certo:</strong> Verificar identidade</li>
        <li><strong>Medicamento certo:</strong> Conferir prescrição</li>
        <li><strong>Dose certa:</strong> Calcular corretamente</li>
        <li><strong>Via certa:</strong> Administrar pela via prescrita</li>
        <li><strong>Hora certa:</strong> Respeitar horários</li>
    </ul>
    
    <h2>Estação 6: Cuidado e Conforto</h2>
    
    <h3>O que esperar:</h3>
    <ul>
        <li>Cuidados de higiene pessoal</li>
        <li>Posicionamento e mobilização</li>
        <li>Prevenção de úlceras por pressão</li>
        <li>Cuidados com a pele</li>
    </ul>
    
    <h3>Competências avaliadas:</h3>
    <ul>
        <li>Técnicas de cuidado pessoal</li>
        <li>Avaliação de riscos</li>
        <li>Promoção de conforto e dignidade</li>
        <li>Educação do paciente e família</li>
    </ul>
    
    <h3>Princípios fundamentais:</h3>
    <ul>
        <li>Mantenha a privacidade do paciente</li>
        <li>Promova independência quando possível</li>
        <li>Use técnicas ergonômicas</li>
        <li>Avalie continuamente a pele</li>
    </ul>
    
    <h2>Estratégias Gerais para Todas as Estações</h2>
    
    <h3>Antes de cada estação:</h3>
    <ul>
        <li>Leia as instruções cuidadosamente</li>
        <li>Identifique os objetivos principais</li>
        <li>Planeje sua abordagem</li>
        <li>Respire fundo e mantenha a calma</li>
    </ul>
    
    <h3>Durante cada estação:</h3>
    <ul>
        <li>Apresente-se ao paciente/examinador</li>
        <li>Explique o que você fará</li>
        <li>Obtenha consentimento quando apropriado</li>
        <li>Mantenha comunicação contínua</li>
        <li>Gerencie o tempo efetivamente</li>
    </ul>
    
    <h3>Após cada estação:</h3>
    <ul>
        <li>Agradeça ao paciente/examinador</li>
        <li>Documente quando necessário</li>
        <li>Limpe/organize o espaço</li>
        <li>Prepare-se mentalmente para a próxima estação</li>
    </ul>
    
    <h2>Preparação Específica por Estação</h2>
    
    <h3>Recursos de estudo recomendados:</h3>
    <ul>
        <li><strong>Diretrizes do NMC:</strong> Standards of proficiency</li>
        <li><strong>Protocolos do NHS:</strong> Clinical guidelines</li>
        <li><strong>Livros de enfermagem:</strong> Textos britânicos atualizados</li>
        <li><strong>Simulações online:</strong> Plataformas de prática</li>
    </ul>
    
    <h3>Prática recomendada:</h3>
    <ul>
        <li>Simule cada tipo de estação múltiplas vezes</li>
        <li>Pratique com cronômetro</li>
        <li>Grave-se para autoavaliação</li>
        <li>Busque feedback de colegas experientes</li>
    </ul>
    
    <h2>Conclusão</h2>
    <p>Compreender as especificidades de cada estação do OSCE é fundamental para o sucesso. Cada estação avalia competências distintas, mas todas compartilham a importância da comunicação efetiva, segurança do paciente e prática baseada em evidências. Com preparação adequada e prática consistente, você estará bem equipado para demonstrar suas competências e alcançar o sucesso no OSCE.</p>
    
    <p>Lembre-se: o OSCE não é apenas um exame, mas uma oportunidade de demonstrar sua paixão pela enfermagem e seu compromisso com o cuidado de qualidade no NHS.</p>',
    (SELECT id FROM public.blog_categories WHERE slug = 'preparacao-exame-osce'),
    'published',
    'Estações do OSCE: Guia Completo para Enfermeiros Internacionais',
    'Guia detalhado sobre todas as estações do OSCE. Saiba o que esperar, como se preparar e dicas para o sucesso em cada estação.',
    ARRAY['estações OSCE', 'preparação OSCE', 'enfermeiros internacionais', 'NHS', 'exame prático'],
    18,
    NOW() - INTERVAL '1 day'
);

-- Update view counts for sample posts (simulate some traffic)
UPDATE public.blog_posts SET view_count = 245 WHERE slug = 'o-que-e-osce-enfermeiros-internacionais-nhs';
UPDATE public.blog_posts SET view_count = 189 WHERE slug = 'arte-anamnese-historico-clinico-osce';
UPDATE public.blog_posts SET view_count = 312 WHERE slug = 'jornada-india-nhs-historia-sucesso-osce';
UPDATE public.blog_posts SET view_count = 156 WHERE slug = 'desvendando-estacoes-osce-o-que-esperar';

