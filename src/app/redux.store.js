(function reduxStoreJs({
  Redux,
  ReduxThunk,
  appNs,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
}) {
  const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

  const ns = appNs;
  ns.reduxStore = Redux.createStore(
    Redux.combineReducers({
      transactions: appNs.transactionsReducer,
    }), /* preloaded skipped, */
    composeEnhancers(Redux.applyMiddleware(ReduxThunk.default)),
  );
}(window));
