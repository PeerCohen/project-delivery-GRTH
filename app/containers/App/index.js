/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AddDelivery from 'containers/AddDelivery/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DeliveryList from 'containers/DeliveryList/Loadable';
import Header from 'components/Header';

import './app.scss';

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/AddDelivery" component={AddDelivery} />
        <Route exact path="/homePage" component={HomePage} />
        <Route exact path="/LoginPage" component={LoginPage} />
        <Route exact path="/DeliveryList" component={DeliveryList} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
