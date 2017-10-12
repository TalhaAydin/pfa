var EXPENSE = {
  ADD: 'EXPENSE.ADD', // Adds single expense
  REMOVE: 'EXPENSE.REMOVE', // Removes single expense
  CHANGE: 'EXPENSE.CHANGE', // Replace single expense
  SELECT: 'EXPENSE.SELECT', // Sets new selected array
  FORM: {
    NEW: 'EXPENSE.FORM.NEW',
    EDIT: 'EXPENSE.FORM.EDIT',
    RESET: 'EXPENSE.FORM.RESET'
  }
}

var expensesReducer = function (state = {
  node: 'expenses',
  data: [],
  selected: [],
  form: { opened: false, editKey: null }
}, action) {
  const { ADD, SELECT, REMOVE, CHANGE, FORM } = EXPENSE;
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