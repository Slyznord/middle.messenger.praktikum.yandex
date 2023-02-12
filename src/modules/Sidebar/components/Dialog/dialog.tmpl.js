export default `
	<div class="dialog" onclick="window.goTo('ErrorPage')">
		<div class="flex flex-row items-center h-full gap-4">
			<div class="dialog__avatar"></div>

			<div class="flex flex-col gap-1">
				<p class="dialog__name">{{ name }}</p>
				<p class="dialog__message">{{ message }}</p>
			</div>
		</div>

		<div class="flex flex-col h-full">
			<span class="text-xs font-medium text-secondary">12:00</span>
		</div>
	</div>
`;
