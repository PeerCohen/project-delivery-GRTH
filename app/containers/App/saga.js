import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';

import {
  LOAD_DELIVERY,
  GET_DELIVERY,
  ADD_DELIVERY,
  DELETE_DELIVERY,
  UPDATE_DELIVERY,
} from './constants';

import { GET_LOGIN, LOAD_LOGGED } from '../LoginPage/constants';

import {
  deliveryLoaded,
  deliveryLoadingError,
  getDeliverySuccess,
  getDeliveryError,
  addDeliverySuccess,
  addDeliveryError,
  updateDeliveryError,
  updateDeliverySuccess,
  deleteDeliveryError,
  deleteDeliverySuccess,
} from './actions';
import {
  loggedLoadingError,
  loggedLoaded,
  getLoginError,
  getLoginSuccess,
} from '../LoginPage/actions';
const baseUrl = '/api';

export function* getList() {
  const requestURL = `${baseUrl}/list`;

  try {
    const list = yield call(request, requestURL);
    yield put(deliveryLoaded(list));
  } catch (err) {
    yield put(deliveryLoadingError(err));
  }
}

export function* getListLogged() {
  const requestURL = `${baseUrl}/listLogged`;

  try {
    const list = yield call(request, requestURL);
    yield put(loggedLoaded(list));
  } catch (err) {
    yield put(loggedLoadingError(err));
  }
}

export function* get(action) {
  const requestURL = `${baseUrl}/get/${action.idDelivery}`;

  try {
    const delivery = yield call(request, requestURL);
    yield put(getDeliverySuccess(delivery));
  } catch (err) {
    yield put(getDeliveryError(err));
  }
}
export function* getLogin(action) {
  const requestURL = `${baseUrl}/getLogin/`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.user),
  };
  try {
    const logged = yield call(request, requestURL, options);
    yield put(getLoginSuccess(logged));
  } catch (err) {
    yield put(getLoginError(err));
  }
}
export function* update(action) {
  const requestURL = `${baseUrl}/update`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.delivery),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(updateDeliverySuccess(action.delivery, list));
  } catch (err) {
    yield put(updateDeliveryError(err));
  }
}

export function* add(action) {
  const requestURL = `${baseUrl}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.delivery),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(addDeliverySuccess(action.delivery, list));
  } catch (err) {
    yield put(addDeliveryError(err));
  }
}

export function* remove(action) {
  const requestURL = `${baseUrl}/delete/${action.idDelivery}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(deleteDeliverySuccess(list));
  } catch (err) {
    yield put(deleteDeliveryError(err));
  }
}

export default function* loadData() {
  yield takeLatest(LOAD_DELIVERY, getList);
  yield takeLatest(LOAD_LOGGED, getListLogged);
  yield takeEvery(GET_DELIVERY, get);
  yield takeEvery(GET_LOGIN, getLogin);
  yield takeEvery(UPDATE_DELIVERY, update);
  yield takeEvery(DELETE_DELIVERY, remove);
  yield takeEvery(ADD_DELIVERY, add);
}
