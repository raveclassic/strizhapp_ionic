import DSHttpAdapter from 'js-data-http';
import qs from 'qs';

export const API_URL = (document.location && document.location.protocol || 'http:') + '//strizhapi.herokuapp.com/api/v1/';

export class HttpAdapter extends DSHttpAdapter {
	HTTP(config) {
		if (config.params) {
			config.url = buildUrl(config.url, config.params);
			delete config.params;
		}
		return super.HTTP(config);
	}
}

let adapter = new HttpAdapter({
	deserialize(resourceConfig, data) {
		return data.data.data.items ? data.data.data.items[resourceConfig.name] : data.data.data;
	},
	httpConfig: {
		withCredentials: true
	}
});
export default adapter;

export const http = {
	get(url, query) {
		url = buildUrl(API_URL + url, query);
		return adapter.GET(url).then(deserialize);
	},
	post(url, data) {
		return adapter.POST(API_URL + url, data).then(deserialize)
	},
	put(url, data) {
		return adapter.PUT(API_URL + url, data).then(deserialize)
	},
	del(url) {
		return adapter.DEL(API_URL + url).then(deserialize);
	}
};

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