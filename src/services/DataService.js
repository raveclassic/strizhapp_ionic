let faker = window.faker = require('faker');

let me = faker.helpers.createCard();
me.image = `${faker.image.avatar(100, 100)}?${Math.random()}`;
me.phone = faker.phone.phoneNumberFormat(0);

let dates = [];
for (let i = 0; i < 10; i++) {
	dates.push(faker.date.recent(30).getTime());
}
dates.sort((a, b) => b - a);

let data = {
	posts: [],
	feed: [],
	contacts: [],
	groups: []
};
for (let i = 0; i < 10; i++) {
	data.posts[i] = {
		id: i,
		created_at: dates[i],
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		image: `${faker.image.transport(100, 100)}?${i}`,
		full_image: `${faker.image.transport()}?${i}`,
		price: faker.finance.amount(),
		comments: [],
		user: me
	};
	for (let j = 0; j < Math.round(Math.random() * 10); j++) {
		let comment = {
			id: j,
			created_at: dates[j],
			message: faker.lorem.paragraph(),
			user: faker.helpers.createCard()
		};
		comment.user.phone = faker.phone.phoneNumberFormat(0);
		comment.user.image = `${faker.image.avatar(100, 100)}?${Math.random()}`;
		data.posts[i].comments.push(comment);
	}
	data.feed[i] = {
		id: i,
		created_at: dates[i],
		title: faker.lorem.sentence(),
		image: `${faker.image.avatar(100, 100)}?${i}`,
		full_image: `${faker.image.transport()}?${i}`,
		user: faker.helpers.createCard(),
		price: faker.finance.amount(),
		description: faker.lorem.paragraph()
	};
	data.feed[i].user.phone = faker.phone.phoneNumberFormat(0);
	data.feed[i].user.image = `${faker.image.avatar(100, 100)}?${Math.random()}`;
}

for (let j = 0; j < 4; j++) {
	data.groups[j] = {
		id: j,
		title: faker.lorem.sentence(1, 1),
		contacts: []
	};
}

for (let j = 0; j < 30; j++) {
	let contact = faker.helpers.createCard();
	contact.image = `${faker.image.avatar(100, 100)}?${Math.random()}`;
	contact.id = j;
	contact.group_id = Math.floor(Math.random() * 4);
	contact.phone = faker.phone.phoneNumberFormat(0);
	data.groups[contact.group_id].contacts.push(contact);
	data.contacts[j] = {
		contact
	};
}

data.groups.forEach(group => group.contacts.sort((a, b) => {
	let aName = a.username;
	let bName = b.username;
	if (aName < bName) {
		return -1;
	} else if (aName > bName) {
		return 1;
	} else {
		return 0;
	}
}));

//data.groups.sort((a, b) => {
//	let aTitle = a.title;
//	let bTitle = b.title;
//	if (aTitle < bTitle) {
//		return -1;
//	} else if (aTitle > bTitle) {
//		return 1;
//	} else {
//		return 0;
//	}
//});

data.posts.sort((a, b) => b.created_at - a.created_at);
data.feed.sort((a, b) => b.created_at - a.created_at);

module.exports = data;