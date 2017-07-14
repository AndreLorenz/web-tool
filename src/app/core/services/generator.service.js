export class GeneratorService {

	constructor($rootScope, $http) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
	}

	getGeneratorFiles() {
		const config = {
			method: 'GET',
			url: `http://localhost:8784/generator`
		};
		this.$http(config).then(res => {
			this.$rootScope.$broadcast('getGeneratorFilesSuccess', res.data);
		}).catch(err => {
			this.$rootScope.$broadcast('getGeneratorFilesError', err);
		});
	}

	getUser() {
		const config = {
			method: 'GET',
			url: `http://localhost:8784/user`
		};
		this.$http(config).then(res => {
			this.$rootScope.$broadcast('getUserSuccess', res.data);
		}).catch(err => {
			this.$rootScope.$broadcast('getUserError', err);
		});
	}

}