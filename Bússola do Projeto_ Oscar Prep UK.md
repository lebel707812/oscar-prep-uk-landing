# Bússola do Projeto: Oscar Prep UK

Este documento serve como um guia central para o desenvolvimento da plataforma Oscar Prep UK, detalhando o status atual, as tarefas em andamento e as prioridades futuras. O objetivo é alinhar o trabalho de todas as IAs e fornecer uma visão clara do progresso para o usuário.

## Visão Geral do Projeto

O Oscar Prep UK é uma plataforma de e-learning projetada para ajudar estudantes e profissionais de medicina a se prepararem para o exame OSCE (Objective Structured Clinical Examination) no Reino Unido. A plataforma oferece conteúdo de aprendizado, simulados, casos clínicos interativos e ferramentas de gamificação para criar uma experiência de estudo completa e eficaz.

## Status Atual

### Essenciais (Concluídos antes do lançamento)

As seguintes funcionalidades já foram implementadas e estão prontas para o lançamento:

- **700 perguntas de simulado para 14 temas:** Conteúdo de avaliação abrangente.
- **Conteúdo de aprendizado para os 14 temas:** Material de estudo completo.
- **Blog:** Canal de comunicação e conteúdo adicional.
- **Fórum / Comunidade:** Espaço para interação entre os usuários.
- **Dashboard:** Painel de controle do usuário com visualização de progresso.
- **Página de conquistas:** Sistema de gamificação para engajamento.

### Melhorias Implementadas

- **Correção do "Overall Progress":** O cálculo do progresso geral foi ajustado para refletir com precisão as sessões concluídas.
- **Sistema de Notificações:** Implementado um sistema de notificações para conquistas, atualizações e lembretes.
- **Enriquecimento do Dashboard:** O dashboard foi aprimorado com mais informações e estatísticas detalhadas.
- **Autenticação:** Proteções de rota reativadas e testadas com sucesso.
- **Lógica de Casos Clínicos:** Avanço entre passos, timer e progresso integrados.
- **Feedback Inteligente:** Sistema implementado com análise de performance em tempo real.
- **Timer de Estação:** Funcionalidade testada e alinhada ao exame OSCE (8-10 min).
- **UI/UX Aprimorada:** CSS com transições suaves, acessibilidade e responsividade mobile.
- **Integração Supabase:** Conexão com banco de dados documentada e testada.

## O que Estamos Construindo (Próximas Prioridades)

As seguintes tarefas são consideradas primordiais e devem ser o foco do desenvolvimento atual:

1. **Otimização de Performance:** Reduzir tempos de carregamento e melhorar a eficiência das consultas ao banco de dados.
2. **Testes de Usabilidade:** Realizar sessões com usuários reais para validar fluxos críticos.
3. **Tradução para Inglês Britânico:** Revisão de todo o conteúdo para adequação ao público do Reino Unido.
4. **Sistema de Backup Automático:** Implementar rotinas diárias de backup dos dados dos usuários.
5. **Log de Erros em Produção:** Configurar ferramenta (ex: Sentry) para monitoramento de bugs.

## Backlog (Melhorias Futuras)

### Melhorias Pós-Lançamento

- **Flashcards de revisão por tema:** (Categoria: Reforço)
- **Análise de desempenho por domínio (comunicação, exame, etc.):** (Categoria: Métricas)
- **Modo escuro / versão mobile responsiva:** (Categoria: UX)
- **Emails ou push notifications com insights:** (Categoria: Retenção)
- **Roteiro de estudo personalizado:** (Categoria: IA / Personalização)
- **Roadmap de progresso por nível:** (Categoria: Motivação)

### Bônus e Freemium Futura

- **Gamificação com XP e ranking:** (Categoria: Gamificação)
- **Modo "estudo adaptativo" com IA:** (Categoria: IA)
- **Geração automática de plano de estudo:** (Categoria: IA)
- **Simulados com dificuldade progressiva:** (Categoria: UX/Aprendizado)
- **Vídeos demonstrativos curtos e legendados:** (Categoria: Conteúdo)
- **Diferenciar build public vs freemium (Vite):** (Categoria: Infraestrutura)
- **Limites de uso na freemium (ex: bloqueio de funcionalidades):** (Categoria: Monetização)

## Atualizações Recentes

### Correção do Botão "Start Case" nos Casos Clínicos Interativos

**Problema Resolvido:** O botão "Start Case" na seção de Casos Clínicos Interativos não estava navegando corretamente para a página de detalhes do caso, resultando em um erro 404 ou redirecionamento incorreto. Além disso, a página `ClinicalCaseDetail.tsx` não estava sendo renderizada adequadamente.

**Ações Realizadas:**
- Corrigido o redirecionamento no `ClinicalCaseDetail.tsx` de `/dashboard/clinical-cases` para `/clinical-cases` quando um caso não é encontrado.
- Adicionada a rota correta `/clinical-cases/:caseId` no `App.tsx` para permitir o acesso direto aos detalhes do caso.
- Ajustada a função `handleCaseClick` em `ClinicalCases.tsx` para usar a rota `/clinical-cases/${caseId}`.
- Corrigida a importação ausente de `UnifiedHeader` no `Dashboard.tsx` que estava causando um erro de referência.

**Resultado:** O botão "Start Case" agora funciona conforme o esperado, navegando para a página de detalhes do caso clínico, que é renderizada corretamente com todas as informações e o timer em funcionamento. As alterações foram commitadas e enviadas para o repositório GitHub.

## Próximos Passos

1. **Implementar A/B Testing para CTAs:** Validar eficácia de diferentes versões dos botões de ação.
2. **Configurar Analytics Avançado:** Rastrear métricas de engajamento por feature (ex: tempo médio por caso clínico).
3. **Documentar API no Swagger:** Criar documentação interativa para integrações futuras.
4. **Pipeline de CI/CD:** Automatizar testes e deploys com GitHub Actions.
5. **Validação Cross-Browser:** Garantir compatibilidade com Edge, Safari e Firefox.