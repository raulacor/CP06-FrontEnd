import { Component, type ErrorInfo, type ReactNode } from 'react'
import { StatusMessage } from '@/components/ui/StatusMessage'

type Props = { children: ReactNode }
type State = { error: Error | null }

/**
 * Catches render errors and failed lazy chunks (e.g. after a redeploy) so the
 * visitor sees a friendly page instead of a blank screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="shell pt-36 pb-24">
        <StatusMessage
          tone="error"
          title="Something went wrong"
          onRetry={() => window.location.reload()}
          actions={
            <a href="/" className="link-draw self-center text-fg">
              Back to home
            </a>
          }
        >
          This page failed to load. Reloading usually fixes it.
        </StatusMessage>
      </div>
    )
  }
}
