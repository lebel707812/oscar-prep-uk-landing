# Análise de Headers nas Páginas

## Páginas que JÁ TÊM headers:

### Usando Layout (que inclui Header):
- MockExams.tsx - ✅ Usa Layout

### Usando Header diretamente:
- Dashboard.tsx - ✅ Usa Header diretamente
- Index.tsx - ✅ Usa Navbar (que é um tipo de header)

### Páginas SEM headers que PRECISAM:
- Auth.tsx - ❌ Não tem header (página de login/registro)
- BlogIndex.tsx - ❌ Não tem header
- ForumIndex.tsx - ❌ Não tem header

## Componentes de Header disponíveis:
1. Header.tsx (em /components/ui/) - Header completo com navegação
2. Navbar.tsx (em /components/) - Navbar para landing page
3. Layout.tsx (em /components/ui/) - Layout que inclui Header + Footer

## Plano de ação:
1. Adicionar Header nas páginas do blog
2. Adicionar Header nas páginas do fórum
3. Verificar outras páginas que possam estar faltando
4. Padronizar o uso do Layout onde apropriado

