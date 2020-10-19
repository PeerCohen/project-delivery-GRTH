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
const makeSelectNameLogged = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.currentUserName.userName,
  );
const makeSelectLogged = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.logged,
  );
const makeSelectError = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.error,
  );
export {
  makeSelectLoginPage,
  makeSelectLogin,
  makeSelectLogged,
  makeSelectError,
  makeSelectNameLogged,
};
export { selectLoginPageDomain };
