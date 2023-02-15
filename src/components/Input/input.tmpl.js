export default `
	<div class="flex flex-col items-start gap-1 {{ input-wrapper-classes }}">
		{{> @partial-block}}
		<input
			type="{{ type }}"
			name="{{ name }}"
			class="input {{ input-classes }}"
			placeholder="{{ placeholder }}"
		>
	</div>
`;
