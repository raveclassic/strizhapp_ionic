const BASE_API_URL = '//strizhapi.herokuapp.com/api/v1';

import Helpers from '../util/helpers.js';

export default angular.module('ApiService', []).factory('ApiService', ($http) => {
	function getFullUrl(url) {
		return `${BASE_API_URL}/${url}`;
	}

	function parseResponse(response) {
		if ((''+response.status)[0] != 2) {
			let error = new Error(response.statusText);
			error.status = response.status;
			throw error;
		}

		return response.data.data;
	}

	function request(method, url, query, data) {
		if (query) {
			url += '?' + Helpers.object.toParam(query);
		}
		return $http({
			method: method,
			withCredentials: true,
			data: data,
			url: getFullUrl(url)
		}).then(parseResponse);
	}

	return {
		get(url, query) {
			query = query || {};
			return request('GET', url, query);
		},

		post(url, data) {
			return request('POST', url, null, data);
		},

		put(url, data) {
			return request('PUT', url, null, data);
		},

		'delete': function (url) {
			return request('DELETE', url);
		},

		options(url) {
			return request('OPTIONS', url);
		}
	};
});