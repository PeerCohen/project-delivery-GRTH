import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectLogin } from '../containers/LoginPage/selectors';

export default function PrivteHOC(Component) {
  class WrappedComponent extends Component {
    static contextType = userContext;

    render() {
      if (this.context)
        return (
          <WrappedComponent>
            <Component {...props} />
          </WrappedComponent>
        );
      return <div>error</div>;
    }
  }
}
