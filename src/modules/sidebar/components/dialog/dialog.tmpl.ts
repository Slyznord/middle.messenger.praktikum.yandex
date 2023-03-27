export default `
  <div class="flex flex-row items-center h-full gap-4">
    <div class="dialog__avatar"></div>

    <div class="flex flex-col gap-1">
      <span class="dialog__name">{{ name }}</span>
      <span class="dialog__message">{{ message }}</span>
    </div>
  </div>

  <div class="flex flex-col h-full">
    <span class="text-xs font-medium text-secondary">{{ time }}</span>
  </div>
`;
