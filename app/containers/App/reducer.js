import produce from 'immer';

import * as data from 'data/dataDelivery.json';

import {
  LOAD_DELIVERY,
  LOAD_DELIVERY_SUCCESS,
  LOAD_DELIVERY_ERROR,
  UPDATE_DELIVERY,
  ADD_DELIVERY,
  DELETE_DELIVERY,
  GET_DELIVERY,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  deliveries: data.default,
  currentDelivery: false,
};
// mock function
function getDelivery(deliveriesList, idDelivery) {
  const currentDelivery = deliveriesList.find(
    Delivery => Delivery.id === idDelivery,
  );
  return currentDelivery;
}

function updateDelivery(deliveriesList, updatedDelivery) {
  const newDeliveriesList = [...deliveriesList];
  const currentDeliveryIndex = deliveriesList.findIndex(
    delivery => delivery.id === updatedDelivery.id,
  );
  newDeliveriesList[currentDeliveryIndex] = updatedDelivery;
  return newDeliveriesList;
}
function deleteDelivery(deliveriesList, idDelivery) {
  const newDeliveriesList = [...deliveriesList];
  const currentDeliveryIndex = deliveriesList.findIndex(
    delivery => delivery.id === idDelivery,
  );
  newDeliveriesList.splice(currentDeliveryIndex, 1);
  return newDeliveriesList;
}
function addDelivery(deliveriesList, addedDelivery) {
  let lastId = 0;
  if (deliveriesList.length > 0)
    lastId = deliveriesList[deliveriesList.length - 1].id;
  const del = [(addedDelivery.id = lastId + 1), ...addedDelivery];
  const newDeliveriesList = [...deliveriesList];
  newDeliveriesList.push(del);
  return newDeliveriesList;
}

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DELIVERY:
        draft.loading = true;
        draft.error = false;
        draft.deliveries = false;
        break;

      case LOAD_DELIVERY_SUCCESS:
        draft.userData.deliveries = action.data;
        draft.loading = false;
        break;

      case LOAD_DELIVERY_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_DELIVERY:
        draft.currentDelivery = getDelivery(
          state.deliveries,
          action.idDelivery,
        );
        break;

      case UPDATE_DELIVERY:
        draft.deliveries = updateDelivery(state.deliveries, action.delivery);
        draft.currentDelivery = action.delivery;

        break;

      case DELETE_DELIVERY:
        draft.deliveries = deleteDelivery(state.deliveries, action.idDelivery);
        draft.currentDelivery = null;
        break;

      case ADD_DELIVERY:
        draft.deliveries = addDelivery(state.deliveries, action.delivery);
        draft.currentDelivery = action.delivery;
        break;

      default:
        break;
    }
  });

export default appReducer;
