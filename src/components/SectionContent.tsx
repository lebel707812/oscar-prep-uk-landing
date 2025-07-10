import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx'; // Certifique-se de instalar esta biblioteca: npm install markdown-to-jsx ou yarn add markdown-to-jsx

// Este é um exemplo de como você pode ter um componente que recebe o 'content' da sua LearningSection
// e decide se é um placeholder de Markdown ou conteúdo direto.

interface SectionContentProps {
  content: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ content }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (content.startsWith('CONTENT_FROM_MARKDOWN:')) {
      const filename = content.split(': ')[1]; // Extrai 'history-taking-1-1.md'
      const filePath = `/content/learning/${filename}`; // Ajuste este caminho conforme a estrutura do seu servidor/build

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
      // Se não for um placeholder de Markdown, exibe o conteúdo diretamente
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

// Como usar no seu componente principal (exemplo):
/*
import React from 'react';
import { learningContent } from './data/learning-content'; // Ajuste o caminho conforme necessário
import SectionContent from './SectionContent'; // Ajuste o caminho conforme necessário

const MyLearningPage: React.FC = () => {
  // Supondo que você está exibindo uma seção específica
  const topic = learningContent[0]; // topic-1
  const session = topic.sessions[0]; // history-taking-1
  const section = session.sections[0]; // history-taking-1-1

  return (
    <div>
      <h1>{topic.title}</h1>
      <h2>{session.title}</h2>
      <h3>{section.title}</h3>
      <SectionContent content={section.content} />
    </div>
  );
};

export default MyLearningPage;
*/


