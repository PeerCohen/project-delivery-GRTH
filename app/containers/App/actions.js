import {
  LOAD_DELIVERY,
  LOAD_DELIVERY_SUCCESS,
  LOAD_DELIVERY_ERROR,
  UPDATE_DELIVERY,
  ADD_DELIVERY,
  DELETE_DELIVERY,
  GET_DELIVERY,
} from 'constants';

// GET DELIVERY

/**
 * Load the deliveries, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DELIVERY
 */
export function loadDelivery() {
  return {
    type: LOAD_DELIVERY,
  };
}

/**
 * Dispatched when the deliveries are loaded by the request saga
 *
 * @param  {array} delivery The delivery data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_DELIVERY_SUCCESS passing the delivery
 */
export function deliveryLoaded(delivery, username) {
  return {
    type: LOAD_DELIVERY_SUCCESS,
    delivery,
    username,
  };
}

/**
 * Dispatched when loading the deliveries fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DELIVERY_ERROR passing the error
 */
export function deliveryLoadingError(error) {
  return {
    type: LOAD_DELIVERY_ERROR,
    error,
  };
}
// UPDATE DELIVERY

export function updateDelivery(delivery) {
  return {
    type: UPDATE_DELIVERY,
    delivery,
  };
}
// ADD DELIVERY

export function addDelivery(delivery) {
  return {
    type: ADD_DELIVERY,
    delivery,
  };
}
// DELETE DELIVERY

export function deleteDelivery(idDelivery) {
  return {
    type: DELETE_DELIVERY,
    idDelivery,
  };
}
// GET SPECIPIC DELIVERY

export function getDelivery(idDelivery) {
  return {
    type: GET_DELIVERY,
    idDelivery,
  };
}
