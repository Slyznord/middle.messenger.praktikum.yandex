import goTo from './utils/goTo';

import './layout';
import './components';
import './modules';
import './views';

window.addEventListener('DOMContentLoaded', () => {
	(window as any).goTo = goTo;
	goTo('Auth');
});
