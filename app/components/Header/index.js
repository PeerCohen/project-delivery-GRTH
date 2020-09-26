/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Header() {
  return (
    <div className="wrapper">
      <div className="nav-bar">
        <Link className="link" to="/homePage">
          home-page
        </Link>
        {'|'}
        <Link className="link" to="/LoginPage">
          Login-Page
        </Link>
        {'|'}
        <Link className="link" to="/DeliveryList">
          Delivery-list
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
