var TRANSACTION = {
  ADD: 'TRANSACTION.ADD', // Adds single transaction
  REMOVE: 'TRANSACTION.REMOVE', // Removes single transaction
  CHANGE: 'TRANSACTION.CHANGE', // Replace single transaction
  SELECT: 'TRANSACTION.SELECT', // Sets new selected array
  FORM: {
    NEW: 'TRANSACTION.FORM.NEW',
    EDIT: 'TRANSACTION.FORM.EDIT',
    RESET: 'TRANSACTION.FORM.RESET'
  }
}

var transactionsReducer = function (state = {
  node: 'transactions',
  data: [],
  selected: [],
  form: { opened: false, editKey: null }
}, action) {
  const { ADD, SELECT, REMOVE, CHANGE, FORM } = TRANSACTION;
  switch (action.type) {
    case ADD:
      return Object.assign({}, state, { data: [...state.data, action.payload] });
    case SELECT:
      return Object.assign({}, state, { selected: [...action.payload] });
    case REMOVE:
      return Object.assign({}, state, { data: state.data.filter(e => e.key !== action.payload) });
    case CHANGE: {
      const newData = state.data.map(e => e.key === action.payload.key ? action.payload : e);
      return Object.assign({}, state, { data: newData });
    }
    case FORM.NEW:
      return Object.assign({}, state, { form: { opened: true, editKey: null } });
    case FORM.EDIT:
      return Object.assign({}, state, { form: { opened: true, editKey: action.payload } });
    case FORM.RESET:
      return Object.assign({}, state, { form: { opened: false, editKey: null } });
    default:
      return state;
  }
}