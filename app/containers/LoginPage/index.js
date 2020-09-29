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
import { FormattedMessage } from 'react-intl';
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
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectLoginPage from './selectors';
import { setLogin } from './actions';
import history from 'utils/history';

import './login.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
// eslint-disable-next-line import/no-unresolved
// import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const navigateTo = () => history.push('/');

export function LoginPage(onSubmit) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const [open, setOpen] = React.useState(false);

  const [valuePassword, setValuePassword] = React.useState({
    password: '',
    showPassword: false,
  });

  const [valueUserName, setValueUserName] = React.useState({
    UserName: '',
  });

  const handleChangeP = prop => event => {
    setValuePassword({ ...valuePassword, [prop]: event.target.value });
  };
  const handleChangeU = prop => event => {
    setValueUserName({ ...valueUserName, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValuePassword({
      ...valuePassword,
      showPassword: !valuePassword.showPassword,
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div className="loginDiv">
      {/* <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Close me!
        </Alert>
      </Collapse> */}
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <hr />

      <FormControl>
        <InputLabel htmlFor="standard-adornment-password">userName</InputLabel>
        <Input
          id="standard-adornment-password"
          value={valueUserName.password}
          onChange={handleChangeU('userName')}
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
          id="standard-adornment-password"
          type={valuePassword.showPassword ? 'text' : 'password'}
          value={valuePassword.password}
          onChange={handleChangeP('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
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
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<ArrowRightIcon color="action" fontSize="large" />}
        onSubmit={e => onSubmit(e, valueUserName)}
        onClick={() => {
          setOpen(true);
        }}
      >
        login
      </Button>
      <hr />
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (event, userName, password) => {
      event.preventDefault();
      dispatch(setLogin(userName, password));
      navigateTo();
    },
    dispatch,
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
