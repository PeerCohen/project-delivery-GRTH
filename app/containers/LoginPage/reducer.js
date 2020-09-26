/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_LOGIN } from './constants';

export const initialState = {
  userName: '',
  password: '',
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOGIN:
        draft.error = false;
        draft.userName = action.userName;
        draft.password = action.password;
    }
  });

export default loginPageReducer;
