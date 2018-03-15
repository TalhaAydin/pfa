import { Element } from '../../../../@polymer/polymer/polymer-element.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../pf-datatable.js';
import '../pf-form.js';
/**
 * @customElement
 * @polymer
 */
class PfTransactions extends Element {
  static get template() {
    return `
    <pf-datatable id="datatable" data-type="transactions"></pf-datatable>

    <pf-form id="form" type="transactions" data="{{formData}}" defaults="[[formDefaults]]">
      <paper-input value="{{formData.date}}" label="Date"></paper-input>
      <paper-input value="{{formData.description}}" label="Description"></paper-input>
      <paper-input value="{{formData.amount}}" label="Amount"></paper-input>
    </pf-form>
`;
  }

  static get is() {
    return 'pf-transactions';
  }

  static get properties() {
    return {
      formData: {
        type: Object,
        value: () => PfTransactions.formDefaults,
      },
      formDefaults: {
        type: Object,
        readOnly: true,
        value: () => PfTransactions.formDefaults,
      },
    };
  }

  static get formDefaults() {
    return {
      date: '',
      description: '',
      amount: '',
    };
  }
}

window.customElements.define(PfTransactions.is, PfTransactions);
