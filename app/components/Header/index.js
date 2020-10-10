/**
 *
 * Header
 *
 */

import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import history from 'utils/history';

import './header.scss';
import GRTH from '../../images/GRTH.png';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Header() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="wrapper">
      <div className="imgHeader">
        <img className="GRTHimg" src={GRTH} alt="imageGRTH" />
      </div>
      <div className="nav-bar">
        <BottomNavigation
          className="bottomNavigation"
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon style={{ fontSize: 40 }} />}
            onClick={() => history.push('/homePage')}
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<ExitToAppIcon style={{fontSize: 40}} />}
            onClick={() => history.push('/LoginPage')}
          />
          <BottomNavigationAction
            label="List Delivery"
            value="list delivery"
            icon={<ListIcon style={{fontSize: 40}} />}
            onClick={() => history.push('/DeliveryTable')}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
