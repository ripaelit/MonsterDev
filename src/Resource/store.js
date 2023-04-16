import {
  // applyMiddleware,
  // createStore,
  combineReducers,
} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import * as Sentry from '@sentry/react';
// import createSentryMiddleware from 'redux-sentry-middleware';

import { appInitializeStateReducer } from './globalState/initSlice';
import { user } from './globalState/user';

const rootReducer = combineReducers({
  user: user,
  appInitialize: appInitializeStateReducer,
});

// const reduxDevToolsComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const sentryEnhancedMiddlewares = applyMiddleware(thunk, createSentryMiddleware(Sentry, {}));

// const enableDevTools = process.env.NODE_ENV !== 'production' || process.env.REACT_APP_DEVTOOLS === 'true';

// const reduxDevToolsEnhancedMiddlewares = sentryEnhancedMiddlewares;

// const store = createStore(rootReducer, reduxDevToolsEnhancedMiddlewares);
const store = configureStore({ reducer: rootReducer });

export default store;
