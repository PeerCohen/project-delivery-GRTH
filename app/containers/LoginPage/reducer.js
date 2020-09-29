/*
 *
 * LoginPage reducer
 *
 */
import { DEFAULT_ACTION, SET_LOGIN } from './constants';

const initialState = {
  userName: '',
  error: false,
};

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOGIN:
      return { ...state, error: false, userName: action.userName };
    default:
      return state;
  }
}

export default loginPageReducer;
