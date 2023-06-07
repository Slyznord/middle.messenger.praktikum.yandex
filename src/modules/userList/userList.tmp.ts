export default `
  <div class="modal">
    <div class="modal__body">
      <h2 class="modal__headline">Список пользователей</h2>

      {{#if users}}
        {{#each users}}
          <div class="user-list__user" data-user-id="{{ id }}">
            {{ first_name }}

            <svg class="user-list__remove" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.05063 6.73418C1.20573 5.60763 2.00954 4 3.41772 4H14.5823C15.9905 4 16.7943 5.60763 15.9494 6.73418V6.73418C15.3331 7.55584 15 8.5552 15 9.58228V16C15 18.2091 13.2091 20 11 20H7C4.79086 20 3 18.2091 3 16V9.58228C3 8.5552 2.66688 7.55584 2.05063 6.73418V6.73418Z" stroke="#2B3F6C" stroke-width="1.5"/>
              <path d="M11 15L11 9" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 15L7 9" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13 4L12.4558 2.36754C12.1836 1.55086 11.4193 1 10.5585 1H7.44152C6.58066 1 5.81638 1.55086 5.54415 2.36754L5 4" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        {{/each}}
      {{^}}
        <span>Пользователей нету</span>
      {{/if}}

      <svg class="modal__close" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1L1 13M1 1L13 13" stroke="#6C6D70" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
`