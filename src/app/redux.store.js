var reduxStore = Redux.createStore(Redux.combineReducers({
  transactions: transactionsReducer
}), /* preloaded skipped, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());