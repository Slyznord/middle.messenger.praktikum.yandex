export default {
	template: `
		{{#> wrapper wrapper-classes='wrapper_items-center rounded-md wrapper_fade wrapper_py-xl wrapper_my-auto wrapper_mx-auto wrapper_w-settings gap-10'}}
			<div class="settings">
				{{> avatar}}
				{{> user-fields fields=fields isEditing=isEditing}}
				{{> password }}
		
				<div class="flex items-center justify-center gap-5 actions">
					{{#each actions}}
						{{> button button-classes=classes value=name clickFn=handler}}
					{{/each}}
				</div>
			</div>
		{{/wrapper}}
	`,
	data: {
		actions: [
			{
				name: 'Изменить данные',
				classes: 'button_md button_primary',
				handler: `
					(function() {
						const fields = document.querySelectorAll('.user-fields__item');

						fields.forEach(item => {
							item.querySelector('input').classList.remove('hidden');
							item.querySelector('.field-value').classList.add('hidden');
						});

						document.querySelectorAll('.actions .button').forEach(item => {
							item.classList.toggle('hidden');
						});
					})();
				`
			},
			{
				name: 'Изменить пароль',
				classes: 'button_md button_primary',
				handler: `
					(function() {
						document.querySelector('.user-fields').classList.add('hidden');
						document.querySelector('.user-password').classList.remove('hidden');

						document.querySelectorAll('.actions .button').forEach(item => {
							item.classList.toggle('hidden');
						});
					})();
				`
			},
			{
				name: 'выйти',
				classes: 'button_md button_error',
				handler: 'window.goTo("Auth")'
			},
			{
				name: 'Сохранить',
				classes: 'button_md button_primary hidden',
				handler: `
					(function() {
						const fields = document.querySelectorAll('.user-fields__item');

						fields.forEach(item => {
							item.querySelector('input').classList.add('hidden');
							item.querySelector('.field-value').classList.remove('hidden');
						});

						document.querySelector('.user-fields').classList.remove('hidden');
						document.querySelector('.user-password').classList.add('hidden');

						document.querySelectorAll('.actions .button').forEach(item => {
							item.classList.toggle('hidden');
						});
					})();
				`
			}
		],
		fields: [
			{
				label: 'Почта',
				name: 'email',
				value: 'example@example.com'
			},
			{
				label: 'Логин',
				name: 'login',
				value: 'example@example.com'
			},
			{
				label: 'Имя',
				name: 'first_name',
				value: 'example@example.com'
			},
			{
				label: 'Фамилия',
				name: 'second_name',
				value: 'example@example.com'
			},
			{
				label: 'Имя в чате',
				name: 'display_name',
				value: 'example@example.com'
			},
			{
				label: 'Телефон',
				name: 'phone',
				value: 'example@example.com'
			}
		],
		isEditing: true
	}
}
