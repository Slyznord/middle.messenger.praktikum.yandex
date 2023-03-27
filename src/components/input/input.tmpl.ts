export default `
  <label class="text-sm text-secondary">{{ label }}</label>

  <input
    type="{{ type }}"
    name="{{ name }}"
    class="input {{ classes }}"
    placeholder="{{ placeholder }}"
    validate-rule="{{ validateRule }}"
    blur
    focus
  >
`;
