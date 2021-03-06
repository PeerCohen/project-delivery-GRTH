import produce from 'immer';

import {
  LOAD_DELIVERY,
  LOAD_DELIVERY_SUCCESS,
  LOAD_DELIVERY_ERROR,
  UPDATE_DELIVERY,
  UPDATE_DELIVERY_FIELD,
  UPDATE_DELIVERY_SUCCESS,
  UPDATE_DELIVERY_ERROR,
  ADD_DELIVERY,
  ADD_DELIVERY_SUCCESS,
  ADD_DELIVERY_ERROR,
  DELETE_DELIVERY,
  DELETE_DELIVERY_SUCCESS,
  DELETE_DELIVERY_ERROR,
  GET_DELIVERY,
  GET_DELIVERY_SUCCESS,
  GET_DELIVERY_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  deliveries: false,
  currentDelivery: false,
};
function updateDeliveryField(delevery, key, value) {
  return {
    ...delevery,
    [key]: value,
  };
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DELIVERY:
        draft.loading = true;
        draft.error = false;
        draft.deliveries = false;
        break;

      case LOAD_DELIVERY_SUCCESS:
        draft.deliveries = action.deliveries;
        draft.loading = false;
        draft.error = false;
        break;

      case GET_DELIVERY:
        draft.loading = true;
        draft.error = false;
        draft.currentDelivery = false;
        break;
      case GET_DELIVERY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.currentDelivery = action.delivery;
        break;

      case DELETE_DELIVERY:
      case ADD_DELIVERY:
      case UPDATE_DELIVERY:
        draft.loading = true;
        draft.error = false;
        break;
      case UPDATE_DELIVERY_FIELD:
        draft.currentDelivery = updateDeliveryField(
          state.currentDelivery,
          action.key,
          action.value,
        );

        break;
      case ADD_DELIVERY_SUCCESS:
      case UPDATE_DELIVERY_SUCCESS:
        draft.loading = false;
        draft.deliveries = action.deliveries;
        draft.currentDelivery = action.deliverY;
        break;

      case DELETE_DELIVERY_SUCCESS:
        draft.loading = false;
        draft.deliveries = action.deliveries;
        draft.currentDelivery = false;
        break;
      case GET_DELIVERY_ERROR:
      case UPDATE_DELIVERY_ERROR:
      case DELETE_DELIVERY_ERROR:
      case ADD_DELIVERY_ERROR:
      case LOAD_DELIVERY_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      default:
        break;
    }
  });

export default appReducer;
