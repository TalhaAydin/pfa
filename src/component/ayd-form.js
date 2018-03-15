import { Element } from '../../../@polymer/polymer/polymer-element.js';
class AydForm extends Element {
  static get template() {
    return `
    <paper-dialog opened="{{opened}}">
      <h2>[[title]]</h2>
      <div>
        <slot></slot>
      </div>
      <div class="buttons">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button dialog-confirm="" autofocus="" on-tap="_onSaveTapped">Save</paper-button>
      </div>
    </paper-dialog>
`;
  }

  static get is() {
    return 'ayd-form';
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        value: false,
        notify: true,
      },
      title: {
        type: String,
        value: '',
      },
    };
  }

  _onSaveTapped() {
    this.dispatchEvent(new CustomEvent('save'));
  }
}
window.customElements.define(AydForm.is, AydForm);
