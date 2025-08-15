// store.js
import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// Dummy reducer to initialize the store
const staticReducers = {
  dummy: (state = {}) => state
};

const store = configureStore({
  reducer: combineReducers(staticReducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { thunk: false,
      serializableCheck: false // <-- disable check for Immutable lib
    }).concat(sagaMiddleware)
});

store.injectedReducers = { ...staticReducers };
store.injectedSagas = {};

export const injectReducer = (key, reducer) => {
  if (!store.injectedReducers[key]) {
    store.injectedReducers[key] = reducer;
    store.replaceReducer(combineReducers(store.injectedReducers));
  }
};

export const injectSaga = (key, saga) => {
  if (!store.injectedSagas[key]) {
    const task = sagaMiddleware.run(saga);
    store.injectedSagas[key] = task;
  }
};

export default store;
