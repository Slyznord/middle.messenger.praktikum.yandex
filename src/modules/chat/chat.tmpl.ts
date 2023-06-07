export default `
	<div class="chat__wrapper wrapper wrapper rounded-md wrapper_fade wrapper_px-lg wrapper_py-lg w-full h-full">
    {{{ header }}}

    <form class="chat__form">
      {{#if activeDialog}}
        <div class="chat__dialog">
          {{#each dialogs}}
            <div class="chat__day-messages">
              <div class="chat__message {{ classes }}">
                <p class="chat__message-text">{{ content }}</p>
                <span class="chat__message-time">{{ time }}</span>
              </div>
            </div>
          {{/each}}
        </div>
      {{^}}
        <span class="flex text-base font-semibold text-black ma-auto">Выберите диалог</span>
      {{/if}}

      {{{ control }}}
    </form>

    {{{ userList }}}
    {{{ addUserModal }}}
  </div>
`
