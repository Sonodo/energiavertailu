'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  section?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `ErrorBoundary caught error in ${this.props.section || 'unknown'}:`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <DefaultErrorFallback
            section={this.props.section}
            onRetry={() => this.setState({ hasError: false })}
          />
        )
      );
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({
  section,
  onRetry,
}: {
  section?: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <AlertTriangle className="mx-auto h-10 w-10 text-red-400" />
      <p className="mt-3 text-lg font-medium text-red-800">Jokin meni pieleen</p>
      <p className="mt-1 text-sm text-red-600">
        {section
          ? `Osio "${section}" ei latautunut oikein.`
          : 'Osa sivusta ei latautunut oikein.'}
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" />
          Yritä uudelleen
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          <Home className="h-4 w-4" />
          Etusivulle
        </Link>
      </div>
    </div>
  );
}
