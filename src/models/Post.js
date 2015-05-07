import DS from './DS.js';

export const schema = {
	title: {
		type: 'string',
		required: true
	}
};

let Post = DS.defineResource({
	name: 'post'
});

export default Post;