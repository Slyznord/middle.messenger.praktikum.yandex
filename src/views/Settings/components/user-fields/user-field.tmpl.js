export default `
	<form class="user-fields">
		{{#each fields}}
			<div class="user-fields__item">
				<p class="text-sm font-medium text-black">{{ label }}</p>

				<input type="text" name="{{name}}" class="input input_fade hidden" value="{{value}}">
				<p class="text-sm font-regular text-secondary field-value">{{value}}</p>
			</div>
		{{/each}}
	</form>
`
