// Utility para otimização de imagens
export const optimizeImage = (
  src: string,
  width?: number,
  height?: number,
  quality: number = 80
): string => {
  // Se a imagem já está otimizada ou é um placeholder, retorna como está
  if (src.includes('optimized') || src.includes('placeholder')) {
    return src;
  }

  // Para imagens do Unsplash, adiciona parâmetros de otimização
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // Para outras imagens externas que suportam otimização
  // Adicionar mais serviços conforme necessário

  return src;
};

// Hook para lazy loading de imagens
export const useLazyImage = (
  src: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
) => {
  const optimizedSrc = optimizeImage(
    src,
    options?.width,
    options?.height,
    options?.quality
  );

  return {
    src: optimizedSrc,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
};