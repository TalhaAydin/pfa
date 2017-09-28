var TRANSACTION = {
  ADD: 'TRANSACTION.ADD', // Adds single transaction
  REMOVE: 'TRANSACTION.REMOVE', // Removes single transaction
  CHANGE: 'TRANSACTION.CHANGE',
  SELECT: 'TRANSACTION.SELECT' // Sets new selected array
}

var transactionsReducer = function (state = {
  node: 'transactions',
  data: [],
  selected: []
}, action) {
  const { ADD, SELECT, REMOVE, CHANGE } = TRANSACTION;
  switch (action.type) {
    case ADD:
      return Object.assign({}, state, { data: [...state.data, action.payload] });
    case SELECT:
      return Object.assign({}, state, { selected: [...action.payload] });
    case REMOVE:
      return Object.assign({}, state, { data: state.data.filter(e => e.key !== action.payload) });
    case CHANGE:
    default:
      return state;
  }
}