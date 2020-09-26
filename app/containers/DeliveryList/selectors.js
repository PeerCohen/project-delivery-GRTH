import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the deliveryList state domain
 */

const selectDeliveryListDomain = state => state.deliveryList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeliveryList
 */

const makeSelectDeliveryList = () =>
  createSelector(
    selectDeliveryListDomain,
    substate => substate,
  );

export default makeSelectDeliveryList;
export { selectDeliveryListDomain };
