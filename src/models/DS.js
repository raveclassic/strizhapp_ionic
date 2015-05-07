import JSData from 'js-data';
import {API_URL} from '../util/adapter.js';
import adapter from '../util/adapter.js';

let DS = new JSData.DS({
	basePath: API_URL,
	debug: false
});

DS.registerAdapter('http', adapter, {
	'default': true
});

export default DS;