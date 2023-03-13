export default {
	template: `
		{{#> wrapper wrapper-classes='wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12'}}
			<h2 class="text-lg">Регистрация</h2>
	
			<form class="flex flex-col gap-12">
				<div class="flex flex-col gap-6">
					{{#each fields }}
						{{#> input input-classes='input input_fade input_w-md' type=type name=name}}
							<label class="text-sm text-secondary">{{ label }}</label>
						{{/input}}
					{{/each}}
				</div>
	
				<div class="flex flex-col items-center gap-3">
					{{> button button-classes='button_w-full button_md button_primary' value='Зарегистрироваться' clickFn='window.goTo("Home")'}}
					<a href="#" class="text-sm font-medium text-primary" onclick="window.goTo('Auth')">Войти</a>
				</div>
			</form>
		{{/wrapper}}
	`,
	data: {
		fields: [
			{
				label: 'Почта',
				name: 'email',
				type: 'text'
			},
			{
				label: 'Логин',
				name: 'login',
				type: 'text'
			},
			{
				label: 'Имя',
				name: 'first_name',
				type: 'text'
			},
			{
				label: 'Фамилия',
				name: 'second_name',
				type: 'text'
			},
			{
				label: 'Телефон',
				name: 'phone',
				type: 'text'
			},
			{
				label: 'Пароль',
				name: 'password',
				type: 'password'
			},
			{
				label: 'Пароль (еще раз)',
				name: 'password_confirm',
				type: 'password'
			}
		]
	}
}
