/**
 *
 * PrivatePage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import DeliveryTable from 'containers/DeliveryTable/Loadable';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import { Alert, AlertTitle } from '@material-ui/lab';
import history from 'utils/history';
import { makeSelectLogin } from '../../containers/LoginPage/selectors';
import './index.scss';

import messages from './messages';
function PresentRealConponent(user) {
  if (user) history.push('/DeliveryTable');
  return (
    <>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <AlertTitle>
          <FormattedMessage {...messages.header} />
        </AlertTitle>
        <FormattedMessage {...messages.errorAlert} />
        <Link underline="always" component={RouterLink} to="/LoginPage">
          here
        </Link>
        <br />
        <FormattedMessage {...messages.contact} />
        <a className="contactError" href="mailto: pcohen853@gmail.com">
          here
        </a>
      </Alert>
    </>
  );
}

function PrivatePage({ user }) {
  return PresentRealConponent(user);
}

PrivatePage.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  user: makeSelectLogin(),
});
const withConnect = connect(mapStateToProps);
export default compose(
  withConnect,
  memo,
)(PrivatePage);
