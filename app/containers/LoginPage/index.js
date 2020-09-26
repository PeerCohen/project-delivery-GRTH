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

import IconButton from '@material-ui/core/IconButton';
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
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import { FormGroup } from '@material-ui/core';

const navigateTo = () => history.push('/');

export function LoginPage(onSubmit) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

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
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />

      <FormGroup onSubmit={e => onSubmit(e, valueUserName, valuePassword)}>
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">
            userName
          </InputLabel>
          <Input
            id="standard-basic"
            startAdornment={<InputAdornment position="start" />}
            value={valueUserName.password}
            onChange={handleChangeU('userName')}
          />
          <AccountCircleIcon color="action" />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </FormGroup>
    </div>
  );
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func,
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
