[![Published on NPM](https://img.shields.io/npm/v/@api-components/api-form-mixin.svg)](https://www.npmjs.com/package/@api-components/api-form-mixin)

[![Build Status](https://travis-ci.com/advanced-rest-client/api-form-mixin.svg)](https://travis-ci.com/advanced-rest-client/api-form-mixin)

## &lt;api-form-mixin&gt;

A mixin to be used with elements that processes AMF data via form data model and displays forms from the model.

It contains common methods used in forms.

## Deprecation notice

This element is moved to `api-forms` repository and `@api-components/api-forms` package. This element will be deprecated and archived once the migration finish.

## Usage

### Installation

```sh
npm install --save @api-components/api-form-mixin
```

### In a LitElement

```js
import { LitElement, html, css } from 'lit-element';
import { ApiFormMixin } from '@api-components/api-form-mixin/api-form-mixin.js';
import styles from '@api-components/api-form-mixin/api-form-styles.js';
import '@polymer/iron-form/iron-form.js';

class SampleElement extends LitElement {
  static get styles() {
    return [
      styles,
      css`:host {
        display: block;
      }`
    ];
  }

  render() {
    const { model: items, allowHideOptional, optionalOpened, allowDisableParams } = this;
    return html`
    <h1>Form</h1>
    <iron-form>
      <form enctype="application/json">
      ${items ? items.map((item, index) => html`<div class="form-item">
        <div class="${this.computeFormRowClass(item, allowHideOptional, optionalOpened, allowDisableParams)}">
          <input
            data-index="${index}"
            type="text"
            name="${item.name}"
            ?required="${item.required}"
            .value="${item.value}"
            @change="${this._modelValueChanged}">
        </div>
      </div>`) : undefined}
      </form>
    </iron-form>`;
  }

  _modelValueChanged(e) {
    const index = Number(e.target.dataset.index);
    if (index !== index) {
      return;
    }
    this.model[index].value = e.target.value;
    this._requestRender();
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/api-form-mixin
cd api-form-mixin
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
