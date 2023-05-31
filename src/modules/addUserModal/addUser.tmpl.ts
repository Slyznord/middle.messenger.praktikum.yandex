export default `
  <div class="modal">
    <div class="modal__body">
      <div class="add-user">
        <h2 class="modal__headline">Добавление пользователя</h2>
        {{{ searchUser }}}

        <div class="add-user__content">
          {{#each users}}
            <div class="add-user__item" data-user-id="{{ id }}">
              {{ first_name }}
             
              <svg class="add-user__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" transform="matrix(-1 0 0 1 14 3)" stroke="#2B3F6C" stroke-width="1.5"/>
                <path d="M3 16.9347C3 16.0743 3.54085 15.3068 4.35109 15.0175V15.0175C8.00404 13.7128 11.996 13.7128 15.6489 15.0175V15.0175C16.4591 15.3068 17 16.0743 17 16.9347V18.2502C17 19.4376 15.9483 20.3498 14.7728 20.1818L13.8184 20.0455C11.2856 19.6837 8.71435 19.6837 6.18162 20.0455L5.22721 20.1818C4.0517 20.3498 3 19.4376 3 18.2502V16.9347Z" stroke="#2B3F6C" stroke-width="1.5"/>
                <path d="M17 11H21" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 9L19 13" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          {{/each}}
        </div>
      </div>

      <svg class="modal__close" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1L1 13M1 1L13 13" stroke="#6C6D70" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
`