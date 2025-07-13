import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '5px'
        }}>
          <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>Oops! Algo deu errado.</h1>
          <p style={{ fontSize: '1.2em' }}>
            Lamentamos, mas ocorreu um erro inesperado.
          </p>
          <p style={{ fontSize: '1em', marginTop: '20px' }}>
            Por favor, tente recarregar a página ou entre em contato com o suporte se o problema persistir.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


