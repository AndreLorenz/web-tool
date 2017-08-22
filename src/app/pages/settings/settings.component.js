'use strict';
import template from './settings.html';

class SettingsController {

	constructor(authService) {
		'ngInject';
		this.settings = {};
		this.authService = authService;
		this.initialize();
	}

	initialize() {
		this.authService.getUser().db.pages.forEach(item => { if (item.typePage == "P") this.settings = item.itemsPage });
		console.log(this.settings);
	}
}

export default {
	template: template,
	controller: SettingsController
};