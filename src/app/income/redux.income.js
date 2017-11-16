// TODO: Needs refactoring to catch up with Transactions
{
  const INCOME = {
    ADD: 'INCOME.ADD', // Adds one or more incomes
    REMOVE: 'INCOME.REMOVE', // Removes single income
    CHANGE: 'INCOME.CHANGE', // Replace single income
    SELECT: 'INCOME.SELECT', // Sets new selected array
    FORM: {
      NEW: 'INCOME.FORM.NEW',
      EDIT: 'INCOME.FORM.EDIT',
      RESET: 'INCOME.FORM.RESET',
    },
  };

  const defaultState = {
    node: 'income',
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

  const incomeReducer = function incomeReducer(state = defaultState, action) {
    const {
      ADD,
      SELECT,
      REMOVE,
      CHANGE,
      FORM,
    } = INCOME;
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

  window.INCOME = INCOME;
  window.incomeReducer = incomeReducer;
}

