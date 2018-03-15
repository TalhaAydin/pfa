import { dedupingMixin } from '../../../@polymer/polymer/lib/utils/mixin.js';
if (!window.Aydin) {
  window.Aydin = {};
}

Aydin.ReduxMixin = (function ReduxMixin({ reduxStore }) {
  return dedupingMixin(base => class extends base {
    static get properties() {
      return {
        state: {
          type: Object,
        },
      };
    }

    ready() {
      super.ready();
      reduxStore.subscribe(() => this.set('state', reduxStore.getState()));
    }

    dispatch(action) {
      reduxStore.dispatch(action);
    }
  });
}(window.appNs.reducers));
