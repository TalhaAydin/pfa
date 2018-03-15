import '../component/ayd-datatable.js';
import '../mixin/ayd-firebase.js';
import '../mixin/ayd-redux.js';
import { Element } from '../../../@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class PfDatatable extends Aydin.ReduxMixin(Aydin.FirebaseMixin(Element)) {
  static get template() {
    return `
    <!-- TODO: Review too tight couplings between container and presentational components -->
    <!-- But is {{selected}} really tight? This component is the only one who controls it. -->
    <ayd-datatable data="[[_computeData(state, dataType)]]" selected="{{selected}}" fields="[[_computeFields(state, dataType)]]">
    </ayd-datatable>
`;
  }

  static get is() {
    return 'pf-datatable';
  }

  ready() {
    super.ready();
    this.dispatch(window.appNs.actions.transactions.getTransactions());
  }

  static get properties() {
    return {
      dataType: {
        type: String,
      },
      selected: {
        type: Array,
        observer: '_onSelectedChanged',
      },
    };
  }

  _onSelectedChanged(newValue = [], oldValue = []) {
    if (newValue.length !== oldValue.length) {
      this.dispatch({ type: window.appNs.constants[this.dataType].SELECT, payload: newValue });
    }
  }

  _computeData(state, type) {
    return state && type ? state[type].data : [];
  }

  _computeFields(state, type) {
    return state && type ? state[type].fields : {};
  }
}

window.customElements.define(PfDatatable.is, PfDatatable);
