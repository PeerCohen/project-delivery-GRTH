/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, SET_LOGIN, GET_LOGIN } from './constants';

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

export function getLogin(userName, password) {
  return {
    type: GET_LOGIN,
    userName,
    password,
  };
}
