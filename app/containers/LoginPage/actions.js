/*
 *
 * LoginPage actions
 *
 */

import {
  LOAD_LOGGED,
  LOAD_LOGGED_SUCCESS,
  LOAD_LOGGED_ERROR,
  DEFAULT_ACTION,
  SET_LOGIN,
  GET_LOGIN,
  GET_LOGGED_SUCCESS,
  GET_LOGGED_ERROR,
} from './constants';

export function loadLogged() {
  return {
    type: LOAD_LOGGED,
  };
}
export function loggedLoaded(logged) {
  return {
    type: LOAD_LOGGED_SUCCESS,
    logged,
  };
}
export function loggedLoadingError(error) {
  return {
    type: LOAD_LOGGED_ERROR,
    error,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setLogin(userName) {
  return {
    type: SET_LOGIN,
    userName,
  };
}

// export function getLogin(userName, password) {
//   return {
//     type: GET_LOGIN,
//     userName,
//     password,
//   };
// }
// GET SPECIPIC DELIVERY

export function getLogin(user) {
  return {
    type: GET_LOGIN,
    user,
  };
}
export function getLoginSuccess(logged) {
  return {
    type: GET_LOGGED_SUCCESS,
    logged,
  };
}

export function getLoginError(error) {
  return {
    type: GET_LOGGED_ERROR,
    error,
  };
}
