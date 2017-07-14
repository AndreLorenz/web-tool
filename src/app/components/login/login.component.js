'use strict';
import template from './login.html';

class LoginController {

	constructor($state, authService) {
		'ngInject';
		this.$state = $state;
		this.authService = authService;
		this.github = {};
	}

	login(user) {
		return this.authService.signin(user).then(() => this.$state.transitionTo('generator'));
	}

}

export default {
	templateUrl: template,
	controller: LoginController
};