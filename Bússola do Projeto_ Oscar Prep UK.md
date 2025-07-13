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

## O que Estamos Construindo (Próximas Prioridades)

As seguintes tarefas são consideradas primordiais e devem ser o foco do desenvolvimento atual:

1.  **Casos clínicos interativos com feedback:** (Categoria: Conteúdo) - Essencial para a experiência prática do usuário.
2.  **Timer e simulação de estação (8-10 min):** (Categoria: UX) - Fundamental para simular as condições reais do exame OSCE.
3.  **Feedback inteligente nas respostas dos simulados:** (Categoria: Aprendizado) - Agrega valor ao fornecer insights personalizados.
4.  **Termos de uso e política de privacidade:** (Categoria: Legal) - Crucial para a conformidade legal e confiança do usuário.
5.  **Integração com suporte (chat/email):** (Categoria: Infraestrutura) - Garante que os usuários possam obter ajuda quando necessário.
6.  **Página de FAQ / suporte ao aluno:** (Categoria: UX) - Melhora a experiência do usuário, oferecendo autoatendimento para dúvidas comuns.
7.  **Checklist por estação (comunicação, segurança, etc.):** (Categoria: Conteúdo) - Fornece um guia prático para os usuários durante a preparação.

8. **Landing Page de Marketing com CTA:** (Categoria: UX) - 

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

Com a correção do botão "Start Case" e o carregamento da página de detalhes do caso clínico, os próximos passos focam em garantir a funcionalidade completa da plataforma e aprimorar a experiência do usuário:

1.  **Reativar e testar a autenticação:** Concluído. As proteções de rota foram reativadas e o sistema de autenticação está funcionando corretamente.
2.  **Implementar a lógica de avanço de passos nos casos clínicos:** Concluído. A funcionalidade para avançar entre os passos do caso está funcionando corretamente, com timer e progresso sendo atualizados adequadamente.
3.  **Adicionar 'Clinical Cases' ao UnifiedHeader:** Concluído. O item "Clinical Cases" foi adicionado ao menu de navegação e está funcionando corretamente.
3.  **Desenvolver o feedback inteligente:** A funcionalidade de feedback inteligente nas respostas dos simulados e casos clínicos é uma prioridade. Isso envolve a criação de um sistema que analise as interações do usuário e forneça insights personalizados para o aprendizado.
4.  **Testar a funcionalidade de timer e simulação de estação:** Garantir que o timer funcione corretamente para cada passo do caso clínico e que a simulação de estação (8-10 min) esteja alinhada com as condições reais do exame OSCE.
5.  **Revisar e aprimorar a interface do usuário (UI) e a experiência do usuário (UX):** Com as funcionalidades básicas em funcionamento, focar em refinar a UI/UX para tornar a plataforma mais intuitiva e agradável de usar.
6.  **Integração com o Supabase:** Investigar e resolver os problemas de conexão ou configuração com o Supabase que causaram o erro de autenticação inicial, garantindo que a plataforma possa interagir com o banco de dados de forma confiável.

Estas são as próximas prioridades para continuar o desenvolvimento da plataforma Oscar Prep UK, garantindo uma experiência robusta e funcional para os usuários.

