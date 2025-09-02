import React from 'react'
import { CAlert, CCard, CCardBody, CButton } from '@coreui/react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4">
          <CCard>
            <CCardBody>
              <CAlert color="danger">
                <h4>Something went wrong</h4>
                <p>An error occurred while rendering this component.</p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details style={{ whiteSpace: 'pre-wrap' }}>
                    <summary>Error details (development only)</summary>
                    <br />
                    <strong>Error:</strong> {this.state.error.toString()}
                    <br />
                    <br />
                    <strong>Stack trace:</strong>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </details>
                )}
                <CButton color="primary" onClick={this.handleReset} className="mt-3">
                  Try Again
                </CButton>
              </CAlert>
            </CCardBody>
          </CCard>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
