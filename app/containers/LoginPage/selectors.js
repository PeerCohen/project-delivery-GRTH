import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );
const makeSelectLogin = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.currentUserName,
  );
const makeSelectLogged = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.logged,
  );
export { makeSelectLoginPage, makeSelectLogin, makeSelectLogged };
export { selectLoginPageDomain };
