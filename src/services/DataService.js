let faker = window.faker = require('faker');

let me = faker.helpers.createCard();

let data = {
	posts: [],
	feed: [],
	contacts: []
};
for (let i=0; i<90; i++) {
	data.posts[i] = {
		id: i,
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		image: `${faker.image.transport(100, 100)}?${i}`,
		user: me
	};
	data.feed[i] = {
		id: i,
		title: faker.lorem.sentence(),
		image: `${faker.image.avatar(100, 100)}?${i}`,
		user: faker.helpers.createCard(),
		description: faker.lorem.paragraph()
	};
	let contact = faker.helpers.createCard();
	contact.id = i;
	data.contacts[i] = {
		contact
	};
}

module.exports = data;