'use strict';
import template from './settings.html';

class SettingsController {

	constructor(authService) {
		'ngInject';
		this.authService = authService;
	}
}

export default {
	template: template,
	controller: SettingsController
};