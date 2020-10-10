import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the deliveryTable state domain
 */

const selectDeliveryTableDomain = state => state.deliveryTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeliveryTable
 */

const makeSelectDeliveryTable = () =>
  createSelector(
    selectDeliveryTableDomain,
    substate => substate,
  );

export default makeSelectDeliveryTable;
export { selectDeliveryTableDomain };
