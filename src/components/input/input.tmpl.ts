export default `
  <label class="text-sm text-secondary">{{ label }}</label>

  <input
    type="{{ type }}"
    name="{{ name }}"
    class="input {{ classes }}"
    placeholder="{{ placeholder }}"
    value="{{ value }}"
    validate-rule="{{ validateRule }}"
    blur
    focus
    change
  >

  <label class="input__error">{{ error }}</label>
`;
