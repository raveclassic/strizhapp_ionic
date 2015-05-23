import ContactGroup from '../models/ContactGroup.js';
import Contact from '../models/Contact.js';

export default function GroupController($scope, group, $state) {
	console.log(group);
	$scope.group = group;
};