/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

// function createSelector2(selector, selector2){
//   let state = selector();
//   selector2(state)
// }

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectdelivery = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.deliveries,
  );

const makeSelectUserName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userName,
  );
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectcurrentDelivery = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentDelivery,
  );
export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectdelivery,
  makeSelectLocation,
  makeSelectcurrentDelivery,
  makeSelectUserName,
};
