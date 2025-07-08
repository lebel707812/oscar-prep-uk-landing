import { describe, it, expect } from 'vitest';
import { optimizeImage, useLazyImage } from '../imageOptimization';
import { renderHook } from '@testing-library/react';

describe('imageOptimization utils', () => {
  describe('optimizeImage', () => {
    it('deve retornar a imagem como está se já estiver otimizada', () => {
      const optimizedSrc = 'https://example.com/image-optimized.jpg';
      const result = optimizeImage(optimizedSrc);
      expect(result).toBe(optimizedSrc);
    });

    it('deve retornar placeholder como está', () => {
      const placeholderSrc = 'https://example.com/placeholder.jpg';
      const result = optimizeImage(placeholderSrc);
      expect(result).toBe(placeholderSrc);
    });

    it('deve adicionar parâmetros de otimização para Unsplash', () => {
      const unsplashSrc = 'https://images.unsplash.com/photo-123';
      const result = optimizeImage(unsplashSrc, 800, 600, 80);
      
      expect(result).toContain('w=800');
      expect(result).toContain('h=600');
      expect(result).toContain('q=80');
      expect(result).toContain('auto=format');
    });

    it('deve retornar imagem local sem modificações', () => {
      const localSrc = '/images/local-image.jpg';
      const result = optimizeImage(localSrc);
      expect(result).toBe(localSrc);
    });

    it('deve lidar com URLs sem parâmetros de otimização suportados', () => {
      const externalSrc = 'https://example.com/image.jpg';
      const result = optimizeImage(externalSrc, 800, 600, 80);
      expect(result).toBe(externalSrc);
    });
  });

  describe('useLazyImage', () => {
    it('deve retornar propriedades de lazy loading', () => {
      const { result } = renderHook(() => 
        useLazyImage('https://example.com/image.jpg')
      );

      expect(result.current).toEqual({
        src: 'https://example.com/image.jpg',
        loading: 'lazy',
        decoding: 'async',
      });
    });

    it('deve aplicar otimizações quando fornecidas opções', () => {
      const { result } = renderHook(() => 
        useLazyImage('https://images.unsplash.com/photo-123', {
          width: 400,
          height: 300,
          quality: 90,
        })
      );

      expect(result.current.src).toContain('w=400');
      expect(result.current.src).toContain('h=300');
      expect(result.current.src).toContain('q=90');
      expect(result.current.loading).toBe('lazy');
      expect(result.current.decoding).toBe('async');
    });
  });
});

