/* eslint-disable import/order */
/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectLoginPage,
  makeSelectLogin,
  makeSelectLogged,
} from './selectors';
import { setLogin, getLogin } from './actions';
import history from 'utils/history';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import './login.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const navigateTo = () => history.push('/');

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [valuePassword, setValuePassword] = React.useState({
    password: '',
    showPassword: false,
  });

  const [valueUserName, setValueUserName] = React.useState({
    userName: '',
  });

  const handleChangeP = prop => event => {
    setValuePassword({ valuePassword, [prop]: event.target.value });
  };
  const handleChangeU = event => {
    setValueUserName({ userName: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValuePassword({
      ...valuePassword,
      showPassword: !valuePassword.showPassword,
    });
  };

  const isCurrentUser = () => {
    debugger;
    if (
      props.logged.find(
        user =>
          user.userName === valueUserName.userName &&
          user.password === valuePassword.password,
      )
    )
      alert('רשום במערכת ');
    else {
      alert('לא רשום במערכת ');
    }
  };
  const checkTextInput = () => {
    if (!valueUserName || valueUserName.userName === '') {
      alert('Please Enter your username');
      return;
    }
    if (!valuePassword || valuePassword.password === '') {
      alert('Please Enter password');
      return;
    }
    setOpen(true);
    props.onGetingUser(valueUserName.userName, valuePassword.password);
    props.onSubmit(valueUserName.userName);
    isCurrentUser();
    // setTimeout(() => {
    //   if (props.currentUser) {
    //     console.log('yes');
    //     alert('רשום במערכת ');
    //   } else {
    //     alert('לא רשום במערכת ');
    //     console.log('no');
    //   }
    // }, 3000);
  };

  return (
    <div className="loginDiv">
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                navigateTo();
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          success logged !
        </Alert>
      </Collapse>

      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <hr />
      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">userName</InputLabel>
        <Input
          required
          id="standard-adornment-password"
          onChange={handleChangeU}
          endAdornment={
            <InputAdornment position="end">
              <AccountCircleIcon color="action" />
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <br />
      <br />
      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          required
          id="standard-adornment-password"
          type={valuePassword.showPassword ? 'text' : 'password'}
          onChange={handleChangeP('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {valuePassword.showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <br />
      <br />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        endIcon={<ArrowRightIcon color="action" fontSize="large" />}
        onClick={checkTextInput}
      >
        login
      </Button>
      <hr />
      <Backdrop open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
  onGetingUser: PropTypes.func,
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  logged: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  currentUser: makeSelectLogin(),
  logged: makeSelectLogged(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: userName => {
      dispatch(setLogin(userName));
    },
    onGetingUser: (userName, password) =>
      dispatch(getLogin(userName, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
