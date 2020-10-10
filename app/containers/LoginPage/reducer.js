/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import * as dataLogged from 'data/dataLogged.json';
import { DEFAULT_ACTION, SET_LOGIN, GET_LOGIN } from './constants';

export const initialState = {
  userName: '',
  error: false,
  logged: dataLogged.default,
  currentUserName: null,
};

function getLogin(datalogin, userName, password) {
  const currentUser = datalogin.find(
    user => user.userName === userName,
    // && user.password === password,
  );
  return currentUser;
}
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
        draft.currentUserName = getLogin(
          state.logged,
          action.userName,
          action.password,
        );
        break;
      default:
        break;
    }
  });

// function loginPageReducer(state = initialState, action) {
//   switch (action.type) {
//     case DEFAULT_ACTION:
//       return state;
//     case SET_LOGIN:
//       return { ...state, error: false, userName: action.userName };
//     case GET_LOGIN:
//       return {
//         currentUserName: getLogin(
//           state.logged,
//           action.userName,
//           action.password,
//         ),
//       };
//     default:
//       return state;
//   }
// }

export default loginPageReducer;
