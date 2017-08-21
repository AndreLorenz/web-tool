export class MongoDBService {

	constructor($rootScope, $http, serviceConfig, authService) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.serviceConfig = serviceConfig;
		this.authService = authService;
	}

	getUsers() {
		return this.$http({
			method: 'GET',
			url: `${this.serviceConfig.BACKEND_URL}/users/:user`,
			params: { user: { userName: this.authService.getUser().login, name: this.authService.getUser().name } }
		}).then(res => this.$rootScope.$broadcast('getUserDataSuccess', res.data))
			.catch(err => this.$rootScope.$broadcast('getUserDataError', err));
	}
}