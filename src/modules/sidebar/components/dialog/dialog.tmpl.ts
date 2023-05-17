export default `
  <div class="flex flex-row items-center h-full gap-4">
    <div class="dialog__avatar">
        <img src="{{ avatar }}">
    </div>

    <div class="flex flex-col flex-items-start gap-1">
      <span class="dialog__name">{{ name }}</span>
      {{#if message }}
        <span class="dialog__message">{{ message }}</span>
      {{^}}
        <span class="dialog__message">Еще нет сообщений</span>
      {{/if}}
    </div>
  </div>

  <div class="flex flex-col h-full">
    <span class="text-xs font-medium text-secondary">{{ time }}</span>
  </div>
`;
