export default `
  <label class="user__avatar {{ avatarClasses }}">
    <img src="https://ya-praktikum.tech/api/v2/resources/{{ user.avatar }}" alt="User avatar" onerror="">
    {{{ input }}}
  </label>

  <div class="user__name {{ usernameClasses }}">{{ user.display_name }}</div>
`
