import { Element } from '../../../../@polymer/polymer/polymer-element.js';
import '../../../../@polymer/paper-input/paper-input.js';
import '../pf-datatable.js';
import '../pf-form.js';
/**
 * @customElement
 * @polymer
 */
class PfIncome extends Element {
  static get template() {
    return `
    <!-- TODO: Restore below after refactoring -->
    <p>Error: Reducer needs refactoring to catch up with Transactions</p>

    <!--
    <pf-datatable id="datatable" data-type="income"></pf-datatable>

    <pf-form id="form" type="income" data="{{formData}}" defaults="[[formDefaults]]">
      <paper-input value="{{formData.frequency}}" label="Frequency"></paper-input>
      <paper-input value="{{formData.description}}" label="Description"></paper-input>
      <paper-input value="{{formData.amount}}" label="Amount"></paper-input>
    </pf-form>
    -->
`;
  }

  static get is() {
    return 'pf-income';
  }

  static get properties() {
    return {
      formData: {
        type: Object,
        value: () => PfIncome.formDefaults,
      },
      formDefaults: {
        type: Object,
        readOnly: true,
        value: () => PfIncome.formDefaults,
      },
    };
  }

  static get formDefaults() {
    return {
      frequency: '',
      description: '',
      amount: '',
    };
  }
}

window.customElements.define(PfIncome.is, PfIncome);
