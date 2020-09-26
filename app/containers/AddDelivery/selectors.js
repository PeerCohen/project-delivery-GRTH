import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addDelivery state domain
 */

const selectAddDeliveryDomain = state => state.addDelivery || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddDelivery
 */

const makeSelectAddDelivery = () =>
  createSelector(
    selectAddDeliveryDomain,
    substate => substate,
  );

export default makeSelectAddDelivery;
export { selectAddDeliveryDomain };
