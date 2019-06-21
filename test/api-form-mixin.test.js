import { fixture, assert, nextFrame, aTimeout } from '@open-wc/testing';
import './test-element.js';
import './no-form-element.js';

describe('ApiFormMixin', function() {
  async function basicFixture() {
    return (await fixture(`<test-element></test-element>`));
  }

  async function allowOptionalFixture() {
    return (await fixture(`<test-element allowhideoptional></test-element>`));
  }

  async function allowCustomFixture() {
    return (await fixture(`<test-element allowcustom></test-element>`));
  }

  async function noFormFixture() {
    return (await fixture(`<no-form-element></no-form-element>`));
  }

  describe('Basic computations', () => {
    it('hasOptional is not computed when model and allowHideOptional is not set', async () => {
      const element = await basicFixture();
      assert.isUndefined(element.hasOptional);
    });

    it('renderOptionalCheckbox is not computed when model and allowHideOptional is not set', async () => {
      const element = await basicFixture();
      assert.isUndefined(element.renderOptionalCheckbox);
    });

    it('hasOptional is computed when allowHideOptional is set', async () => {
      const element = await allowOptionalFixture();
      assert.isFalse(element.hasOptional);
    });

    it('renderOptionalCheckbox is computed when allowHideOptional is set', async () => {
      const element = await allowOptionalFixture();
      assert.isFalse(element.renderOptionalCheckbox);
    });

    it('renderEmptyMessage is true', async () => {
      const element = await basicFixture();
      assert.isTrue(element.renderEmptyMessage);
    });

    it('renderEmptyMessage is false when custom are allowed', async () => {
      const element = await allowCustomFixture();
      assert.isFalse(element.renderEmptyMessage);
    });

    it('renderEmptyMessage is false when model is set', async () => {
      const element = await basicFixture();
      element.model = [{ name: '', value: '', schema: {} }];
      assert.isFalse(element.renderEmptyMessage);
    });

    it('renderEmptyMessage goes back to false', async () => {
      const element = await basicFixture();
      element.model = [{ name: '', value: '', schema: {} }];
      assert.isFalse(element.renderEmptyMessage);
      element.model = undefined;
      assert.isTrue(element.renderEmptyMessage);
    });
  });

  describe('computeFormRowClass()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('Returns base class without attributes', () => {
      const result = element.computeFormRowClass();
      assert.equal(result, 'param-value');
    });

    it('Adds required name', () => {
      const result = element.computeFormRowClass({
        required: true
      });
      assert.equal(result, 'param-value required');
    });

    it('If not requred and optional are allowed then optional', () => {
      const result = element.computeFormRowClass({
        required: false
      }, true);
      assert.equal(result, 'param-value optional');
    });

    it('If not requred and optional are not allowed then nothing', () => {
      const result = element.computeFormRowClass({
        required: false
      }, false);
      assert.equal(result, 'param-value');
    });

    it('Optional are visible', () => {
      const result = element.computeFormRowClass({}, true, true);
      assert.equal(result, 'param-value optional with-optional');
    });

    it('Disable property is enabled', () => {
      const result = element.computeFormRowClass({}, false, false, true);
      assert.equal(result, 'param-value has-enable-button');
    });
  });

  describe('toggleOptionalParams()', () => {
    it('Does nothing when optional are not allowed', async () => {
      const element = await basicFixture();
      element.toggleOptionalParams();
      assert.isUndefined(element.optionalOpened);
    });

    it('Toggles optionalOpened property', async () => {
      const element = await allowOptionalFixture();
      element.toggleOptionalParams();
      assert.isTrue(element.optionalOpened);
    });

    it('Toggles back optionalOpened property', async () => {
      const element = await allowOptionalFixture();
      element.optionalOpened = true;
      element.toggleOptionalParams();
      assert.isFalse(element.optionalOpened);
    });
  });

  describe('_getForm()', () => {
    it('Returns form element', async () => {
      const element = await basicFixture();
      const form = element._getForm();
      assert.isTrue(form instanceof HTMLElement);
    });

    it('Sets this.__form', async () => {
      const element = await basicFixture();
      const form = element._getForm();
      assert.isTrue(element.__form === form);
    });

    it('Returns null when no iron-form', async () => {
      const element = await noFormFixture();
      const form = element._getForm();
      assert.equal(form, null);
    });
  });

  describe('_getValidity()', () => {
    const invalidModel = {
      required: true,
      name: 'test-name',
      value: ''
    };
    const validModel = {
      required: true,
      name: 'test-name',
      value: 'test-value'
    };

    let element;
    beforeEach(async () => {
      element = await basicFixture();
      await nextFrame();
    });

    it('Validates empty form', () => {
      const result = element._getValidity();
      assert.isTrue(result);
    });

    it('Form with required empty values is not validated', async () => {
      element.model = [Object.assign({}, invalidModel)];
      await aTimeout();
      const result = element._getValidity();
      assert.isFalse(result);
    });

    it('Form is validated', async () => {
      element.model = [Object.assign({}, validModel)];
      await aTimeout();
      const result = element._getValidity();
      assert.isTrue(result);
    });

    it('Returns true when no iron-form', async () => {
      const element = await noFormFixture();
      const result = element._getValidity();
      assert.isTrue(result);
    });
  });

  describe('serializeForm()', () => {
    const model = [{
      required: true,
      name: 'test-name',
      value: 'test-value'
    }, {
      required: true,
      name: 'test-name-1',
      value: 'test-value-1'
    }];
    it('Returns empty object when no model', async () => {
      const element = await basicFixture();
      const result = element.serializeForm();
      assert.typeOf(result, 'object');
      assert.lengthOf(Object.keys(result), 0);
    });

    it('Returns model values', async () => {
      const element = await basicFixture();
      element.model = model;
      await aTimeout();
      const result = element.serializeForm();
      assert.typeOf(result, 'object');
      assert.lengthOf(Object.keys(result), 2);
    });

    it('Returns undefined when no iron-form', async () => {
      const element = await noFormFixture();
      const result = element.serializeForm();
      assert.isUndefined(result);
    });
  });

  describe('_computeIsCustom()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('Returns false when no model', () => {
      assert.isFalse(element._computeIsCustom());
    });

    it('Returns false when no schema', () => {
      assert.isFalse(element._computeIsCustom({}));
    });

    it('Returns false when no isCustom', () => {
      assert.isFalse(element._computeIsCustom({
        schema: {}
      }));
    });

    it('Returns true when isCustom', () => {
      assert.isTrue(element._computeIsCustom({
        schema: {
          isCustom: true
        }
      }));
    });
  });

  describe('addCustom()', () => {
    const model = {
      required: true,
      name: 'test-name',
      value: 'test-value'
    };
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Adds an item to undefined model', () => {
      element.addCustom();
      assert.typeOf(element.model, 'array');
      assert.lengthOf(element.model, 1);
    });

    it('Adds an item to existing model', () => {
      element.model = [model];
      element.addCustom();
      assert.lengthOf(element.model, 2);
    });

    it('Dispatches api-property-model-build event with basic data', (done) => {
      element.addEventListener('api-property-model-build', (e) => {
        assert.isTrue(e.cancelable, 'Event is cancelable');
        assert.typeOf(e.detail, 'object');
        done();
      });
      element.addCustom();
    });
  });

  describe('computeIsOptional()', () => {
    let model;
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      model = {
        required: false,
        name: 'test-name',
        value: 'test-value'
      };
    });

    it('Returns false when hasOptional is false', () => {
      const result = element.computeIsOptional(false, model);
      assert.isFalse(result);
    });

    it('Returns true when required is false', () => {
      const result = element.computeIsOptional(true, model);
      assert.isTrue(result);
    });

    it('Returns false when required is true', () => {
      model.required = true;
      const result = element.computeIsOptional(true, model);
      assert.isFalse(result);
    });
  });
});
