(function reduxStoreJs({
  Redux,
  ReduxThunk,
  appNs,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
}) {
  const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
  const ns = appNs;

  ns.reducers.reduxStore = Redux.createStore(
    Redux.combineReducers({
      transactions: appNs.reducers.transactions,
    }), /* preloaded skipped, */
    composeEnhancers(Redux.applyMiddleware(ReduxThunk.default)),
  );
}(window));
