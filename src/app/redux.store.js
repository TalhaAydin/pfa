var reduxStore = Redux.createStore(Redux.combineReducers({
  transactions: transactionsReducer,
  expenses: expensesReducer,
  income: incomeReducer
}), /* preloaded skipped, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());