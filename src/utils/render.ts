import * as Handlebars from 'handlebars';

export default ({ template = '', data = {} }: { template:string, data:object }):void => {
	const app:HTMLElement | null = document.querySelector('#app');
	const compiled = Handlebars.compile(template);

	if (!app) return

	app.innerHTML = compiled(data);
}
