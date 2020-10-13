import produce from 'immer';
// import * as dataLogged from 'data/dataLogged.json';

import {
  DEFAULT_ACTION,
  SET_LOGIN,
  GET_LOGIN,
  GET_LOGGED_ERROR,
  GET_LOGGED_SUCCESS,
  LOAD_LOGGED,
  LOAD_LOGGED_SUCCESS,
  LOAD_LOGGED_ERROR,
} from './constants';

export const initialState = {
  userName: '',
  error: false,
  // logged: dataLogged.default,
  logged: false,
  currentUserName: false,
};
// --------// mock data---------
// function getLogin(datalogin, userName, password) {
//   const currentUser = datalogin.find(
//     user => user.userName === userName,
//     // && user.password === password,
//   );
//   return currentUser;
// }
/* eslint-disable default-case, no-param-reassign */

const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOGIN:
        draft.userName = action.userName;
        draft.error = action.error;
        break;
      case GET_LOGIN:
        // draft.currentUserName = getLogin(
        //   state.logged,
        //   action.userName,
        //   action.password,
        // ); draft.loading = true;
        draft.error = false;
        draft.currentUserName = false;
        break;
      case GET_LOGGED_SUCCESS:
        draft.loading = false;
        draft.currentUserName = action.logged;
        break;

      case LOAD_LOGGED:
        draft.loading = true;
        draft.error = false;
        draft.logged = false;
        break;

      case LOAD_LOGGED_SUCCESS:
        draft.logged = action.logged;
        draft.loading = false;
        break;

      case LOAD_LOGGED_ERROR:
      case GET_LOGGED_ERROR:
        draft.error = 'action.error';
        draft.loading = false;
        break;
      default:
        break;
    }
  });

export default loginPageReducer;
