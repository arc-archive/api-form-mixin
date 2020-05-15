import { LitElement, html, css } from 'lit-element';
import { ApiFormMixin } from '../api-form-mixin.js';
import '@polymer/iron-form/iron-form.js';
import styles from '../api-form-styles.js';

class TestElement extends ApiFormMixin(LitElement) {
  static get styles() {
    return [
      styles,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  render() {
    const {
      model: items,
      allowHideOptional,
      optionalOpened,
      allowDisableParams,
    } = this;
    return html` <h1>Form</h1>
      <iron-form>
        <form enctype="application/json">
          ${items
            ? items.map(
                (item, index) => html`<div class="form-item">
                  <div
                    class="${this.computeFormRowClass(
                      item,
                      allowHideOptional,
                      optionalOpened,
                      allowDisableParams
                    )}"
                  >
                    <input
                      data-index="${index}"
                      type="text"
                      name="${item.name}"
                      ?required="${item.required}"
                      .value="${item.value}"
                      @change="${this._modelValueChanged}"
                    />
                  </div>
                </div>`
              )
            : undefined}
        </form>
      </iron-form>`;
  }

  _modelValueChanged(e) {
    const index = Number(e.target.dataset.index);
    if (Number.isNaN(index)) {
      return;
    }
    this.model[index].value = e.target.value;
    this.requestUpdate();
  }
}
window.customElements.define('test-element', TestElement);
