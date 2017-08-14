export class AuthService {

	constructor($rootScope, $http, $localStorage, $q, serviceConfig) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.$localStorage = $localStorage;
		this.serviceConfig = serviceConfig;
		this.$q = $q;
	}

	getToken() {
		return this.$localStorage.token;
	}

	setToken(token) {
		this.$localStorage.token = token;
	}

	getUser() {
		return this.$localStorage.currentUser;
	}

	setUser(currentUser) {
		this.$localStorage.currentUser = currentUser;
	}

	signin(data) {
		return this.$http({
			method: 'POST',
			url: `${this.serviceConfig.BACKEND_URL}/signin`,
			params: data
		}).then(res => {
			if (res.data.err) return console.log(res.data.err.message);
			this.$rootScope.$broadcast("userLogged", res.data.user);
			this.setToken(res.data.token);
			this.setUser(res.data.user);
		}).catch((err) => {
			console.log(err);
		});
	}

	logout() {
		delete this.$localStorage.token;
		delete this.$localStorage.currentUser;
		this.$rootScope.$broadcast("userLogout", true);
		this.$q.when();
	}

}