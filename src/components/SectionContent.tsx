import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

interface SectionContentProps {
  content: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ content }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (content.startsWith('CONTENT_FROM_MARKDOWN:')) {
      const filename = content.split(': ')[1];
      // O caminho agora aponta para a pasta 'public' do seu projeto React
      const filePath = `/content/learning/${filename}`;

      setIsLoading(true);
      setError(null);

      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(text => {
          setMarkdownContent(text);
        })
        .catch(err => {
          console.error("Failed to load markdown content:", err);
          setError(`Failed to load content: ${err.message}. Please check the file path: ${filePath}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setMarkdownContent(content);
      setIsLoading(false);
      setError(null);
    }
  }, [content]);

  if (isLoading) {
    return <p>Carregando conteúdo...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Erro: {error}</p>;
  }

  return <Markdown>{markdownContent}</Markdown>;
};

export default SectionContent;


