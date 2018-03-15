import '../component/ayd-form.js';
import '../mixin/ayd-firebase.js';
import '../mixin/ayd-redux.js';
import { Element } from '../../../@polymer/polymer/polymer-element.js';
class PfForm extends Aydin.ReduxMixin(Aydin.FirebaseMixin(Element)) {
  static get template() {
    return `
    <ayd-form title="[[_computeTitle(editKey)]]" opened="{{opened}}" on-save="_onSave">
      <slot></slot>
    </ayd-form>
`;
  }

  static get is() {
    return 'pf-form';
  }

  static get properties() {
    return {
      data: {
        type: Object,
        notify: true,
      },
      type: {
        type: String,
      },
      defaults: {
        type: Object,
      },
      editKey: {
        type: String,
        value: null,
        observer: '_onEditKeyChanged',
      },
      opened: {
        type: Boolean,
        value: false,
        observer: '_onOpenedChanged',
      },
    };
  }

  static get observers() {
    return [
      '_onStateChanged(state, type)',
    ];
  }

  _onStateChanged(state, type) {
    // Update form opened state from redux state
    if (state && type) {
      this.opened = state[type].form.opened;
      this.editKey = state[type].form.editKey;
    }
  }

  _onOpenedChanged(opened) {
    // Reset redux form state when form is closed
    if (opened === false) {
      this.dispatch({ type: window.appNs.constants[this.type].FORM.RESET });
      this.data = Object.assign({}, this.defaults);
    }
  }

  _onEditKeyChanged(editKey) {
    if (editKey) {
      this.data = this.state[this.type].data.find(e => e.key === editKey).data;
    }
  }

  _onSave() {
    const actions = window.appNs.actions[this.type];
    if (this.editKey) {
      // TODO: Change "transactions" to generic
      this.dispatch(actions.changeTransactions({ [`${this.type}/${this.editKey}`]: this.data }));
    } else {
      // TODO: Change "transactions" to generic
      this.dispatch(actions.addTransaction(this.data));
    }
  }

  _computeTitle(editKey) {
    return editKey ? 'Edit' : 'Add';
  }
}
window.customElements.define(PfForm.is, PfForm);
