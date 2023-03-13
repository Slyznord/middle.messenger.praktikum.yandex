export default `
	<div class="user-password flex flex-col w-full gap-4 hidden">
		{{#> input input-classes='input input_w-full input_fade' type='password' name='old_password'}}
			<label class="text-sm text-secondary">Старый пароль</label>
		{{/input}}
	
		{{#> input input-classes='input input_w-full input_fade' type='password' name='new_password'}}
			<label class="text-sm text-secondary">Новый пароль</label>
		{{/input}}
	</div>
`
