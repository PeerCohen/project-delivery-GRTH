/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, SET_LOGIN } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setLogin(userName, password) {
  return {
    type: SET_LOGIN,
    userName,
    password,
  };
}
