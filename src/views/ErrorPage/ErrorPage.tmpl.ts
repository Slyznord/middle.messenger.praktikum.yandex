export default {
	template: `
		{{#> wrapper wrapper-classes='wrapper_items-center rounded-md wrapper_fade wrapper_py-xl wrapper_my-auto wrapper_mx-auto wrapper_w-error wrapper_h-error justify-center gap-10' }}
			<div class="flex flex-col items-center gap-3">
				<p class="text-5xl font-bold text-black">{{ error.code }}</p>
				<p class="text-3xl font-medium text-black">{{ error.message }}</p>
			</div>
	
			{{> button button-classes='button_md button_primary' value='назад' clickFn='window.goTo("Home")' }}
		{{/wrapper}}
	`,
	data: {
		error: {
			code: 404,
			message: 'не туда попали'
		}
	}
}
