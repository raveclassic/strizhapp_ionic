module.exports = {
	object: {
		toParam(object, prefix) {
			var stack = [];
			var value;
			var key;

			for (key in object) {
				value = object[key];
				key = prefix ? prefix + '[' + key + ']' : key;

				if (value === null) {
					value = encodeURIComponent(key) + '=';
				} else if (typeof( value ) !== 'object') {
					value = encodeURIComponent(key) + '=' + encodeURIComponent(value);
				} else {
					value = this.toParam(value, key);
				}

				stack.push(value);
			}

			return stack.join('&');
		}
	}
};