import { BaseInput } from './base-input';

const template = document.createElement('template');

template.innerHTML = `<style>
    input {
        width: 100%;
    }
    
    .is-invalid {
        border: 1px solid crimson;
    }
</style>

<input />
`;

export class BaseField extends BaseInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('input');
    this.inputType = '--invalid--';

    this.element.addEventListener('input', () => {
      this.value = this.element.value;
      this.dispatchEvent(new CustomEvent('valueChange', { value: this.element.value }));
    });
  }

  static get observedAttributes() {
    return [ 'placeholder', 'value' , 'required'];
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  set isInvalid(value) {
    value = value === 'true' || value === 'required' || value === 1;
    this.setAttribute('isInvalid', value);
  }

  get isInvalid() {
    return !!this.getAttribute('isInvalid');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    super.render();

    this.element.setAttribute('type', this.inputType);
    this.element.setAttribute('placeholder', this.placeholder || '');
    this.element.setAttribute('value', this.value || '');

    if (this.isInvalid) {
      this.element.classList.add('is-invalid');
    }
    else {
      this.element.classList.remove('is-invalid');
    }
  }
}
