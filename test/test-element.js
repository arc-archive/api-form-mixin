import {PolymerElement} from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/polymer/lib/elements/dom-repeat.js';
import '../../../@polymer/iron-form/iron-form.js';
import {ApiFormMixin} from '../api-form-mixin.js';
import '../api-form-styles.js';
import {html} from '../../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin ApiFormMixin
 */
class TestElement extends ApiFormMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="api-form-styles">
    :host {
      display: block;
    }
    </style>
    <iron-form>
      <form enctype="application/json">
        <dom-repeat items="{{model}}">
          <template>
            <div class="form-item">
              <div class\$="[[computeFormRowClass(item, allowHideOptional, optionalOpened, allowDisableParams)]]">
                <input type="text" name="[[item.name]]" required\$="[[item.required]]" value="{{item.value}}">
              </div>
            </div>
          </template>
        </dom-repeat>
      </form>
    </iron-form>
`;
  }

  static get is() {
    return 'test-element';
  }
}
window.customElements.define(TestElement.is, TestElement);
