{
  const {
    Redux,
    transactionsReducer,
    expensesReducer,
    incomeReducer,
    __REDUX_DEVTOOLS_EXTENSION__,
  } = window;

  const reduxStore = Redux.createStore(
    Redux.combineReducers({
      transactions: transactionsReducer,
      expenses: expensesReducer,
      income: incomeReducer,
    }), /* preloaded skipped, */
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );

  window.reduxStore = reduxStore;
}
