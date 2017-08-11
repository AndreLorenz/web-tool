import { saveAs } from "file-saver";

export class GeneratorService {

	constructor($rootScope, $http) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.url = `http://10.125.2.54:8784`;
	}

	getGeneratorFiles(schematicsCode) {
		const config = {
			method: 'GET',
			url: `${this.url}/generator`,
			params: {
				schematicsCode
			}
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
			url: `${this.url}/user`
		};
		this.$http(config).then(res => {
			this.$rootScope.$broadcast('getUserSuccess', res.data);
		}).catch(err => {
			this.$rootScope.$broadcast('getUserError', err);
		});
	}

	getFunctionDetail(schematicsCode) {
		const config = {
			method: 'GET',
			url: `${this.url}/function-detail`,
			params: {
				'schematicsCode': schematicsCode
			}
		};
		return this.$http(config).then(res => res.data).catch(err => err.data);
	}

	getModules(schematicsCode) {
		const config = {
			method: 'GET',
			url: `${this.url}/modules`,
			params: {
				'schematicsCode': schematicsCode
			}
		};
		return this.$http(config).then(res => res.data).catch(err => err.data);
	}


	downloadStructure(config) {
		const reqConfig = {
			method: 'POST',
			url: `${this.url}/download-structure`,
			data: { config },
			headers: {
				'Content-type': 'application/json',
			},
			responseType: 'blob'
		};

		return this.$http(reqConfig).then(res => {
			var blob = new Blob([res.data], { type: res.headers('Content-Type') });
			var fileName = `${config.functionForm}.zip`;
			saveAs(blob, fileName);
		});



	}

	createBranch(branchName) {
		const config = {
			method: 'POST',
			url: `${this.url}/create-branch`,
			params: {
				branchName
			}
		};
		return this.$http(config).then(res => res.data).catch(err => err.data);
	}

}