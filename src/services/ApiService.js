const BASE_API_URL = '//strizhapi.herokuapp.com/api/v1';

function ApiService($http) {
	return {
		get(url, query) {
			query = query || {};
			return $http.get(getFullUrl(url), {
				params: query
			}).then(parseResponse);
		},

		post(url, data) {
			return $http.post(getFullUrl(url), data)
				.then(parseResponse);
		},

		put(url, data) {
			return $http.put(getFullUrl(url), data)
				.then(parseResponse);
		},

		'delete': function(url) {
			return $http.delete(getFullUrl(url))
				.then(parseResponse);
		}
	};

	function getFullUrl(url) {
		return `${BASE_API_URL}/${url}`;
	}

	function parseResponse(response) {
		if (response.status != 200) {
			let error = new Error(response.statusText);
			error.status = response.status;
			throw error;
		}

		return response.data.data;
	}
}

module.exports = ApiService;