import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import './errorBoundery.scss';

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="errorBoundery">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <p className="subTitle"> Something went wrong.</p>
            {this.state.error && (
              <p className="errorString">{this.state.error.toString()} </p>
            )}
            <strong>{this.state.errorInfo.componentStack}</strong>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

function errorBoundary(Component) {
  return function(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
export default errorBoundary;
