// TODO: Needs refactoring to catch up with Transactions
{
  const EXPENSES = {
    ADD: 'EXPENSES.ADD', // Adds one or more expenses
    REMOVE: 'EXPENSES.REMOVE', // Removes single expense
    CHANGE: 'EXPENSES.CHANGE', // Replace single expense
    SELECT: 'EXPENSES.SELECT', // Sets new selected array
    FORM: {
      NEW: 'EXPENSES.FORM.NEW',
      EDIT: 'EXPENSES.FORM.EDIT',
      RESET: 'EXPENSES.FORM.RESET',
    },
  };

  const defaultState = {
    node: 'expenses',
    data: [],
    selected: [],
    form: {
      opened: false,
      editKey: null,
    },
    fields: {
      frequency: 'Frequency',
      description: 'Description',
      amount: 'Amount',
    },
  };

  const expensesReducer = function expensesReducer(state = defaultState, action) {
    const {
      ADD,
      SELECT,
      REMOVE,
      CHANGE,
      FORM,
    } = EXPENSES;
    switch (action.type) {
      case ADD:
        return Object.assign({}, state, { data: [...state.data, ...action.payload] });
      case SELECT:
        return Object.assign({}, state, { selected: [...action.payload] });
      case REMOVE:
        return Object.assign({}, state, { data: state.data.filter(e => e.key !== action.payload) });
      case CHANGE: {
        const newData = state.data.map(e => (e.key === action.payload.key ? action.payload : e));
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
  };

  window.expensesReducer = expensesReducer;
  window.EXPENSES = EXPENSES;
}
