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
export function deliveryLoaded(deliveries, username) {
  return {
    type: LOAD_DELIVERY_SUCCESS,
    deliveries,
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
export function updateDeliverySuccess(delivery, deliveries) {
  return {
    type: UPDATE_DELIVERY_SUCCESS,
    delivery,
    deliveries,
  };
}

export function updateDeliveryError(error) {
  return {
    type: UPDATE_DELIVERY_ERROR,
    error,
  };
}
export function updateDeliveryField(key, value) {
  return {
    type: UPDATE_DELIVERY_FIELD,
    key,
    value,
  };
}
// ADD DELIVERY

export function addDelivery(delivery) {
  return {
    type: ADD_DELIVERY,
    delivery,
  };
}
export function addDeliverySuccess(delivery, deliveries) {
  return {
    type: ADD_DELIVERY_SUCCESS,
    delivery,
    deliveries,
  };
}

export function addDeliveryError(error) {
  return {
    type: ADD_DELIVERY_ERROR,
    error,
  };
}
// DELETE DELIVERY

export function deleteDelivery(idDelivery) {
  return {
    type: DELETE_DELIVERY,
    idDelivery,
  };
}
export function deleteDeliverySuccess(deliveries) {
  return {
    type: DELETE_DELIVERY_SUCCESS,
    deliveries,
  };
}

export function deleteDeliveryError(error) {
  return {
    type: DELETE_DELIVERY_ERROR,
    error,
  };
}
// GET SPECIPIC DELIVERY

export function getDelivery(idDelivery) {
  return {
    type: GET_DELIVERY,
    idDelivery,
  };
}
export function getDeliverySuccess(delivery) {
  return {
    type: GET_DELIVERY_SUCCESS,
    delivery,
  };
}

export function getDeliveryError(error) {
  return {
    type: GET_DELIVERY_ERROR,
    error,
  };
}
