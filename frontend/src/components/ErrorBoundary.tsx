import type { ReactNode } from 'react'
import { Component } from 'react'
import { logError } from '../utils/logger'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    logError('UI error boundary', error, { scope: 'ErrorBoundary' })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Noe gjekk gale</h2>
          <p>Prøv å laste sida på nytt.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
