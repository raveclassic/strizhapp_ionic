import JSData from 'js-data';
import DSHttpAdapter from 'js-data-http';
import qs from 'qs';

const API_URL = (document.location && document.location.protocol || 'http:') + '//strizhapi.herokuapp.com/api/v1/';

export default angular
	.module('HttpAdapter', [])
	.constant('API_URL', API_URL)
	.factory('HttpAdapter', ($http) => {
		class HttpAdapter extends DSHttpAdapter {
			HTTP(config) {
				if (config.params) {
					config.url = buildUrl(config.url, config.params);
					delete config.params;
				}
				return $http(config);
			}

			get(url, query) {
				url = buildUrl(API_URL + url, query);
				return this.GET(url).then(deserialize);
			}

			post(url, data) {
				return this.POST(API_URL + url, data).then(deserialize)
			}

			put(url, data) {
				return this.PUT(API_URL + url, data).then(deserialize)
			}

			del(url) {
				return this.DEL(API_URL + url).then(deserialize);
			}
		}

		return window.adapter = new HttpAdapter({
			deserialize(resourceConfig, data) {
				return (data.data.data && data.data.data.items) ? data.data.data.items[resourceConfig.name] : data.data.data;
			},
			httpConfig: {
				withCredentials: true
			}
		});
	})
	.factory('DS', (HttpAdapter) => {
		let DS = new JSData.DS({
			basePath: API_URL,
			debug: false
		});

		DS.registerAdapter('http', HttpAdapter, {
			'default': true
		});

		return DS;
	});

function deserialize(data) {
	return data.data.data;
}

function buildUrl(url, query) {
	if (url.substr(-1) !== '?') {
		url += '?';
	}
	if (query) {
		url += qs.stringify(query);
	}
	return url;
}
