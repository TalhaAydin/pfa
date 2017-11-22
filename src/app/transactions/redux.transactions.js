window.appNs = window.appNs || {};

// Split this file into parts: constants, actions, reducer. Maybe service?
(function reduxTransactionsJs({ firebase, appNs }) {
  const TRANSACTIONS = {
    // Fetches all transactions
    GET: 'TRANSACTIONS.GET',
    GET_SUCCEEDED: 'TRANSACTIONS.GET_SUCCEEDED',
    GET_FAILED: 'TRANSACTIONS.GET_FAILED',

    // Adds a transaction
    ADD: 'TRANSACTIONS.ADD',
    ADD_SUCCEEDED: 'TRANSACTIONS.ADD_SUCCEEDED',
    ADD_FAILED: 'TRANSACTIONS.ADD_FAILED',

    // Removes a transaction
    REMOVE: 'TRANSACTIONS.REMOVE',
    REMOVE_SUCCEEDED: 'TRANSACTIONS.REMOVE_SUCCEEDED',
    REMOVE_FAILED: 'TRANSACTIONS.REMOVE_FAILED',

    // Changes a transaction
    CHANGE: 'TRANSACTIONS.CHANGE',
    CHANGE_SUCCEEDED: 'TRANSACTIONS.CHANGE_SUCCEEDED',
    CHANGE_FAILED: 'TRANSACTIONS.CHANGE_FAILED',

    SELECT: 'TRANSACTIONS.SELECT', // Sets new selected array
    FORM: {
      NEW: 'TRANSACTIONS.FORM.NEW',
      EDIT: 'TRANSACTIONS.FORM.EDIT',
      RESET: 'TRANSACTIONS.FORM.RESET',
    },
  };

  const transactionsActions = {
    getTransactions() {
      return (dispatch) => {
        dispatch({ type: TRANSACTIONS.GET });
        return firebase.database().ref('transactions').once('value')
          .then((snapshot) => {
            const rawData = snapshot.val();
            const stateData = Object.keys(rawData).map(key => ({ key, data: rawData[key] }));
            dispatch({ type: TRANSACTIONS.GET_SUCCEEDED, payload: stateData });
          })
          .catch((error) => {
            dispatch({ type: TRANSACTIONS.GET_SUCCEEDED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
    addTransaction(transaction) {
      return (dispatch) => {
        dispatch({ type: TRANSACTIONS.ADD });
        return firebase.database().ref('transactions').push().set(transaction)
          .then(() => {
            dispatch({ type: TRANSACTIONS.ADD_SUCCEEDED });
            dispatch(this.getTransactions());
            // TODO: Add better UI indication for success
          })
          .catch((error) => {
            dispatch({ type: TRANSACTIONS.ADD_FAILED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
    removeTransactions(keys) {
      // TODO: Call changeTransactions here?
      return (dispatch) => {
        dispatch({ type: TRANSACTIONS.REMOVE });
        const updates = {};
        keys.forEach((key) => { updates[`transactions/${key}`] = null; });
        return firebase.database().ref().update(updates)
          .then(() => {
            dispatch({ type: TRANSACTIONS.REMOVE_SUCCEEDED });
            dispatch(this.getTransactions());
            // TODO: Add better UI indication for success
          })
          .catch((error) => {
            dispatch({ type: TRANSACTIONS.REMOVE_FAILED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
    changeTransactions(updates) {
      return (dispatch) => {
        dispatch({ type: TRANSACTIONS.CHANGE });
        return firebase.database().ref().update(updates)
          .then(() => {
            dispatch({ type: TRANSACTIONS.CHANGE_SUCCEEDED });
            dispatch(this.getTransactions());
            // TODO: Add better UI indication for success
          })
          .catch((error) => {
            dispatch({ type: TRANSACTIONS.CHANGE_FAILED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
  };

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

  const transactionsReducer = function transactionsReducer(state = defaultState, action) {
    const {
      GET, GET_SUCCEEDED, GET_FAILED,
      ADD, ADD_SUCCEEDED, ADD_FAILED,
      REMOVE, REMOVE_SUCCEEDED, REMOVE_FAILED,
      CHANGE, CHANGE_SUCCEEDED, CHANGE_FAILED,
      SELECT, FORM,
    } = TRANSACTIONS;
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

  // TODO: Variables in ns need better structure
  const ns = appNs;
  ns.TRANSACTIONS = TRANSACTIONS;
  ns.transactionsActions = transactionsActions;
  ns.transactionsReducer = transactionsReducer;
}(window));
