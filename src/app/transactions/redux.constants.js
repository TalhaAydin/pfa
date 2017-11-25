(function transactionsReduxConstantsJs(appNs) {
  const ns = appNs;

  ns.constants = ns.constants || {};
  ns.constants.transactions = {
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

    // Sets new selected array
    SELECT: 'TRANSACTIONS.SELECT',

    // Controls the form
    FORM: {
      NEW: 'TRANSACTIONS.FORM.NEW',
      EDIT: 'TRANSACTIONS.FORM.EDIT',
      RESET: 'TRANSACTIONS.FORM.RESET',
    },
  };
}(window.appNs = window.appNs || {}));
