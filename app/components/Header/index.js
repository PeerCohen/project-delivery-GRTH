import React, { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import history from 'utils/history';
import './header.scss';
import PropTypes from 'prop-types';
import AppBar from '../AppBar';
import GRTH from '../../images/GRTH.png';

function Header({ userName, onSetLogout }) {
  const [value, setValue] = useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="wrapper">
      <AppBar userName={userName} onSetLogout={onSetLogout} />
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
            icon={<ExitToAppIcon style={{ fontSize: 40 }} />}
            onClick={() => history.push('/LoginPage')}
          />
          <BottomNavigationAction
            label="List Delivery"
            value="list delivery"
            icon={<ListIcon style={{ fontSize: 40 }} />}
            onClick={() => history.push('/PrivatePage')}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

Header.propTypes = {
  userName: PropTypes.string,
  onSetLogout: PropTypes.func,
};

export default Header;
