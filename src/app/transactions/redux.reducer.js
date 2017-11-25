(function transactionsReduxReducerJs(appNs) {
  const defaultState = {
    node: 'transactions',
    loading: false,
    error: false,
    errorDetails: null,
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

  const ns = appNs;
  ns.reducers = ns.reducers || {};
  ns.reducers.transactions = function transactionsReducer(state = defaultState, action) {
    const {
      GET, GET_SUCCEEDED, GET_FAILED,
      ADD, ADD_SUCCEEDED, ADD_FAILED,
      REMOVE, REMOVE_SUCCEEDED, REMOVE_FAILED,
      CHANGE, CHANGE_SUCCEEDED, CHANGE_FAILED,
      SELECT, FORM,
    } = appNs.constants.transactions;
    switch (action.type) {
      case GET:
      case ADD:
      case REMOVE:
      case CHANGE:
        return Object.assign({}, state, { loading: true });
      case GET_SUCCEEDED:
        return Object.assign(
          {}, state,
          { loading: false, data: action.payload },
        );
      case ADD_SUCCEEDED:
      case REMOVE_SUCCEEDED:
      case CHANGE_SUCCEEDED:
        return Object.assign({}, state, { loading: false });
      case GET_FAILED:
      case ADD_FAILED:
      case REMOVE_FAILED:
      case CHANGE_FAILED:
        return Object.assign(
          {}, state,
          { loading: false, error: true, errorDetails: action.payload },
        );
      case SELECT:
        return Object.assign({}, state, { selected: [...action.payload] });
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
}(window.appNs = window.appNs || {}));
