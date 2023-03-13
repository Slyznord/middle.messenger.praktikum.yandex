import * as Handlebars from 'handlebars';
import sidebar from './sidebar.tmpl';
import './sidebar.scss';
import './components';

Handlebars.registerPartial('sidebar', sidebar);
