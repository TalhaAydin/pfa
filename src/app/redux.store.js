// TODO: Make this a function
{
  const {
    Redux,
    ReduxThunk,
    appNs,
    expensesReducer,
    incomeReducer,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  } = window;

  const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

  const reduxStore = Redux.createStore(
    Redux.combineReducers({
      transactions: appNs.transactionsReducer,
      expenses: expensesReducer,
      income: incomeReducer,
    }), /* preloaded skipped, */
    composeEnhancers(Redux.applyMiddleware(ReduxThunk.default)),
  );

  window.reduxStore = reduxStore;
}
