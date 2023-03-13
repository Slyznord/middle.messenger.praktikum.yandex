export default `
	{{#> wrapper wrapper-classes=menu-classes }}
		{{> user}}

		<div class="flex flex-col gap-8">
			{{> search}}

			<div class="flex flex-col gap-3">
				{{#each dialogs}}
					{{> dialog name=name message=message}}
				{{/each}}
			</div>
		</div>
	{{/wrapper}}
`
