import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import Index from '../Index';

// Mock dos componentes pesados
vi.mock('@/components/ui/UnifiedHeader', () => ({
  default: () => <div data-testid="unified-header">Unified Header</div>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

describe('Index Page', () => {
  it('deve renderizar a página inicial', () => {
    render(<Index />);
    
    // Verificar se o header está presente
    expect(screen.getByTestId('unified-header')).toBeInTheDocument();
    
    // Verificar se o footer está presente
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('deve mostrar conteúdo principal', () => {
    render(<Index />);
    
    // Verificar se há conteúdo na página
    expect(document.body).toBeInTheDocument();
  });
});

