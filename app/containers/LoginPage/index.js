import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import history from 'utils/history';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectLoginPage,
  makeSelectLogin,
  makeSelectLogged,
  makeSelectError,
} from './selectors';
import { getLogin } from './actions';

import './index.scss';
import errorBoundary from '../../Errorboundary/ErrorHOC';

const navigateTo = () => history.push('/');

export function LoginPage({ currentUser, error, ...props }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    if (!userName) {
      alert('Please Enter your username');
      return;
    }
    if (!password) {
      alert('Please Enter password');
      return;
    }
    props.setUser(userName, password);
  };

  return (
    <div className="loginDiv">
      <Collapse in={error}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <FormattedMessage {...messages.alertError} />
          <strong>check it out!</strong>
        </Alert>
      </Collapse>
      <Collapse in={currentUser}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                navigateTo();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <FormattedMessage {...messages.alertSuccess} />
          <Link
            className="linkToHomePage"
            underline="always"
            component={RouterLink}
            to="/"
          >
            here
          </Link>
          <FormattedMessage {...messages.alertSuccessLink} />
        </Alert>
      </Collapse>
      <hr />
      <FormControl className="userControl">
        <InputLabel htmlFor="standard-adornment-password">userName</InputLabel>
        <Input
          required
          inputRef={userNameRef}
          id="standard-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <AccountCircleIcon color="action" />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className="passwordControl">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          required
          id="standard-adornment-password"
          inputRef={passwordRef}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="contained"
        className="loginButton"
        color="primary"
        type="submit"
        endIcon={<ArrowRightIcon fontSize="large" />}
        onClick={onSubmit}
      >
        login
      </Button>
      <hr />
    </div>
  );
}

LoginPage.propTypes = {
  setUser: PropTypes.func,
  error: PropTypes.any,
  logged: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  currentUser: makeSelectLogin(),
  logged: makeSelectLogged(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    setUser: (name, password) => dispatch(getLogin({ name, password })),
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
)(LoginPage);
