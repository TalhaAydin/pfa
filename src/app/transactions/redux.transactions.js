{
  const TRANSACTIONS = {
    ADD: 'TRANSACTIONS.ADD', // Adds single transaction
    REMOVE: 'TRANSACTIONS.REMOVE', // Removes single transaction
    CHANGE: 'TRANSACTIONS.CHANGE', // Replace single transaction
    SELECT: 'TRANSACTIONS.SELECT', // Sets new selected array
    FORM: {
      NEW: 'TRANSACTIONS.FORM.NEW',
      EDIT: 'TRANSACTIONS.FORM.EDIT',
      RESET: 'TRANSACTIONS.FORM.RESET',
    },
  };

  const defaultState = {
    node: 'transactions',
    data: [],
    selected: [],
    form: {
      opened: false,
      editKey: null,
    },
    fields: {
      date: 'Date',
      description: 'Description',
      amount: 'Amount',
    },
  };

  const transactionsReducer = function transactionsReducer(state = defaultState, action) {
    const {
      ADD, SELECT, REMOVE, CHANGE, FORM,
    } = TRANSACTIONS;
    switch (action.type) {
      case ADD:
        return Object.assign({}, state, { data: [...state.data, action.payload] });
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

  window.TRANSACTIONS = TRANSACTIONS;
  window.transactionsReducer = transactionsReducer;
}
