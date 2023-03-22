export default `
  <h2 class="text-lg">Вход</h2>

  <form class="flex flex-col gap-12">
    <div class="flex flex-col gap-6">
        {{{ login }}}
        {{{ password }}}
    </div>

    <div class="flex flex-col items-center gap-3">
      {{{ button }}}
      <a href="#" class="text-sm font-medium text-primary">Нет аккаунта?</a>
    </div>
  </form>
`
