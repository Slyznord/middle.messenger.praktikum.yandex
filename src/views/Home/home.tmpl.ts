export default {
	template: `
		<div class="flex flex-row gap-8 h-full w-full">
			{{> sidebar menu-classes='menu gap-10' }}
			{{> chat }}
		</div>
	`,
	data: {
		dialogs: Array(12).fill({ name: 'Миша', message: 'Последнее сообщение' })
	}
}
