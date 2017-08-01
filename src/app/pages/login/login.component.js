'use strict';
import template from './login.html';

class LoginController {

	constructor($scope, $state, authService) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.authService = authService;
		this.github = {};
		this.initializer();
	}

	initializer() {
		this.$scope.$on("userLogged", (data) => {
			this.$state.transitionTo('home')
		});
	}

	login(user) {
		return this.authService.signin(user);
	}

	clear() {
		this.github = {}
	}

}

export default {
	templateUrl: template,
	controller: LoginController
};