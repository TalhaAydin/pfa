(function transactionsReduxActionsJs(appNs, firebase) {
  const ns = appNs;

  ns.actions = ns.actions || {};
  ns.actions.transactions = {
    getTransactions() {
      return (dispatch) => {
        dispatch({ type: ns.constants.transactions.GET });
        // TODO: Use services
        return firebase.database().ref('transactions').once('value')
          .then((snapshot) => {
            const rawData = snapshot.val();
            const stateData = Object.keys(rawData).map(key => ({ key, data: rawData[key] }));
            dispatch({ type: ns.constants.transactions.GET_SUCCEEDED, payload: stateData });
          })
          .catch((error) => {
            dispatch({ type: ns.constants.transactions.GET_SUCCEEDED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
    addTransaction(transaction) {
      return (dispatch) => {
        dispatch({ type: ns.constants.transactions.ADD });
        // TODO: Use services
        return firebase.database().ref('transactions').push().set(transaction)
          .then(() => {
            dispatch({ type: ns.constants.transactions.ADD_SUCCEEDED });
            dispatch(this.getTransactions());
            // TODO: Add better UI indication for success
          })
          .catch((error) => {
            dispatch({ type: ns.constants.transactions.ADD_FAILED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
    removeTransactions(keys) {
      // TODO: Call changeTransactions here?
      return (dispatch) => {
        dispatch({ type: ns.constants.transactions.REMOVE });
        const updates = {};
        keys.forEach((key) => { updates[`transactions/${key}`] = null; });
        // TODO: Use services
        return firebase.database().ref().update(updates)
          .then(() => {
            dispatch({ type: ns.constants.transactions.REMOVE_SUCCEEDED });
            dispatch(this.getTransactions());
            // TODO: Add better UI indication for success
          })
          .catch((error) => {
            dispatch({ type: ns.constants.transactions.REMOVE_FAILED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
    changeTransactions(updates) {
      return (dispatch) => {
        dispatch({ type: ns.constants.transactions.CHANGE });
        // TODO: Use services
        return firebase.database().ref().update(updates)
          .then(() => {
            dispatch({ type: ns.constants.transactions.CHANGE_SUCCEEDED });
            dispatch(this.getTransactions());
            // TODO: Add better UI indication for success
          })
          .catch((error) => {
            dispatch({ type: ns.constants.transactions.CHANGE_FAILED, payload: error });
            // TODO: Add better UI indication for failure
            // TODO: Test error flow
          });
      };
    },
  };
}(window.appNs = window.appNs || {}, window.firebase));
