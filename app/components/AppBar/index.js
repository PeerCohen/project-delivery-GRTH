/**
 *
 * AppBar
 *
 */

import React, { memo, useState } from 'react';
import history from 'utils/history';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Popper from '@material-ui/core/Popper';
import PhoneIcon from '@material-ui/icons/Phone';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './index.scss';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#4e97f79',
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
  buttonGroup: {
    textTransform: 'lowercase',
    fontSize: 16,
  },
}));

function AppBarHeader({ userName, onSetLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const classes = useStyles();
  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <ContactPhoneIcon fontSize="large" />
          </IconButton>
          <a className="contact" href="mailto: pcohen853@gmail.com">
            <IconButton edge="end" color="inherit" aria-label="menu">
              <ContactMailIcon fontSize="large" />
            </IconButton>
          </a>
          <Typography variant="h6" className={classes.title}>
            Contact Us
          </Typography>
          <div className="nav-bar-login">
            {userName && (
              <span className="currntUser">
                {userName}
                <PersonIcon color="secondary" />
              </span>
            )}{' '}
            <ButtonGroup color="inherit" aria-label="text primary button group">
              <Button
                className={classes.buttonGroup}
                onClick={() => {
                  history.push('/LoginPage');
                }}
              >
                login
              </Button>
              <Button
                className={classes.buttonGroup}
                onClick={() => onSetLogout()}
              >
                logout
              </Button>
            </ButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className="popPhone">
          0527121853
          <PhoneIcon color="primary" />
        </div>
      </Popper>
    </div>
  );
}

AppBarHeader.propTypes = {
  userName: PropTypes.string,
  onSetLogout: PropTypes.func,
};

export default memo(AppBarHeader);
