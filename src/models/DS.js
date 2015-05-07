import JSData from 'js-data';
import DSHttpAdapter from 'js-data-http';
import qs from 'querystring';

const API_URL = (document.location.protocol || 'http:') + '//strizhapi.herokuapp.com/api/v1/';

let store = new JSData.DS({
	basePath: API_URL,
	debug: false
});
let adapter = new DSHttpAdapter({
	deserialize(resourceConfig, response) {
		return deserialize(response);
	}
});

store.registerAdapter('http', http, {
	'default': true
});

let http = {
	get(url, query) {
		url = API_URL + url;
		if (query) {
			url += '?' + qs(query);
		}
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

export default store
export {http}
