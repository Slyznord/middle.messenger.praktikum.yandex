import goTo from './utils/goTo';

import './layout';
import './components';
import './modules';
import './views';

window.addEventListener('DOMContentLoaded', () => {
	window.goTo = goTo;
	goTo('Auth');
});
