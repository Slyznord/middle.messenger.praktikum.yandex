export default {
	template: `
		{{#> wrapper wrapper-classes='wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12'}}
			<h2 class="text-lg">Вход</h2>
	
			<form class="flex flex-col gap-12">
				<div class="flex flex-col gap-6">
					{{#each fields}}
						{{#> input input-classes='input input_w-md input_fade' type=type name=name}}
							<label class="text-sm text-secondary">{{ label }}</label>
						{{/input}}
					{{/each}}
				</div>
	
				<div class="flex flex-col items-center gap-3">
					{{> button button-classes='button_w-full button_md button_primary' value='Войти' clickFn='window.goTo("Home")' }}
					<a href="#" class="text-sm font-medium text-primary" onclick="window.goTo('Registration')">Нет аккаунта?</a>
				</div>
			</form>
		{{/wrapper}}
	`,
	data: {
		fields: [
			{
				label: 'Логин',
				name: 'login',
				type: 'text'
			},
			{
				label: 'Пароль',
				name: 'password',
				type: 'password'
			}
		]
	}
}
