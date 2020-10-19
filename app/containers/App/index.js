import React, { memo, useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReCAPTCHA from 'react-google-recaptcha';

// import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AddDelivery from 'containers/AddDelivery/Loadable';
// import LoginPage from 'containers/LoginPage/Loadable';
import PrivatePage from 'components/PrivatePage';
import { useInjectSaga } from 'utils/injectSaga';

import Header from 'components/Header';
import errorBoundary from '../../Errorboundary/ErrorHOC';
import saga from './saga';
import {
  makeSelectdelivery,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { makeSelectNameLogged, makeSelectLogged } from '../LoginPage/selectors';
import { loadDelivery } from './actions';
import { loadLogged, setLogout } from '../LoginPage/actions';

import './index.scss';

const HomePage = lazy(() => import('../HomePage/Loadable'));
const LoginPage = lazy(() => import('containers/LoginPage/Loadable'));
const DeliveryTable = lazy(() => import('containers/DeliveryTable/Loadable'));

export function App({
  deliveries,
  onLoadDeliveries,
  logged,
  onLoadLogged,
  userName,
  onSetLogout,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    if (!deliveries) onLoadDeliveries();
    if (!logged) onLoadLogged();
  }, []);

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LfggdgZAAAAAK_zS2bPhZUE55kAGK7LLNIX8BD6"
        size="invisible"
        render="explicit"
      />
      <Header userName={userName} onSetLogout={onSetLogout} />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/AddDelivery" component={AddDelivery} />
          <Route exact path="/homePage" component={HomePage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/DeliveryTable" component={DeliveryTable} />
          <Route exact path="/PrivatePage" component={PrivatePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  );
}
App.propTypes = {
  deliveries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  logged: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onLoadDeliveries: PropTypes.func,
  onLoadLogged: PropTypes.func,
  userName: PropTypes.string,
  onSetLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  deliveries: makeSelectdelivery(),
  logged: makeSelectLogged(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  userName: makeSelectNameLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadDeliveries: () => dispatch(loadDelivery()),
    onLoadLogged: () => dispatch(loadLogged()),
    onSetLogout: () => dispatch(setLogout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  errorBoundary,
)(App);
