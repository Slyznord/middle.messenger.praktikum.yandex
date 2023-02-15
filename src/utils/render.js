import * as Handlebars from 'handlebars';

export default ({ template = '', data = {} }) => {
	const app = document.querySelector('#app');
	const compiled = Handlebars.compile(template);

	app.innerHTML = compiled(data);
}
