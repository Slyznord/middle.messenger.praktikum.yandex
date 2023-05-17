export default `
  <label class="user__avatar {{ avatarClasses }}">
    <img src="https://ya-praktikum.tech/api/v2/resources/{{ avatar }}" alt="">
    {{{ input }}}
  </label>

  <div class="user__name {{ usernameClasses }}">{{ username }}</div>
`
