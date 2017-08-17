'use strict';
import template from './login.html';

class LoginController {

	constructor($scope, $state, authService, messageService) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.authService = authService;
		this.messageService = messageService;
		this.github = {};
		this.initializer();
	}

	initializer() {
		this.$scope.$on("userLogged", (data) => {
			this.$state.transitionTo('home')
		});
	}

	login(user) {
		return this.authService.signin(user).then(response => this.messageService.open({ message: 'Login done successfully!', type: 'info' }));
	}

	clear() {
		this.github = {}
	}

}

export default {
	template: template,
	controller: LoginController
};