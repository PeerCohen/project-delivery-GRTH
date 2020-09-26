/**
 *
 * AddDelivery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddDelivery from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function AddDelivery() {
  useInjectReducer({ key: 'addDelivery', reducer });
  useInjectSaga({ key: 'addDelivery', saga });

  return (
    <div>
      <Helmet>
        <title>AddDelivery</title>
        <meta name="description" content="Description of AddDelivery" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AddDelivery.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addDelivery: makeSelectAddDelivery(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddDelivery);
