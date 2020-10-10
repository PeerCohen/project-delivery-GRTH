/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AddDelivery from 'containers/AddDelivery/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DeliveryTable from 'containers/DeliveryTable/Loadable';
import { useInjectSaga } from 'utils/injectSaga';

import Header from 'components/Header';
import saga from './saga';
import {
  makeSelectdelivery,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { loadDelivery } from './actions';

import './app.scss';

export function App({ deliveries, loading, error, onLoadDeliveries }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    if (!deliveries) onLoadDeliveries();
  }, []);

  return (
    <div>
      <Header />
      {loading && <div className="loading">loading...</div>}
      {error && <div className="error">error occured</div>}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/AddDelivery" component={AddDelivery} />
        <Route exact path="/homePage" component={HomePage} />
        <Route exact path="/LoginPage" component={LoginPage} />
        <Route exact path="/DeliveryTable" component={DeliveryTable} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
App.propTypes = {
  deliveries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadDeliveries: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  deliveries: makeSelectdelivery(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadDeliveries: () => dispatch(loadDelivery()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
