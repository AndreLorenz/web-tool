import { saveAs } from "file-saver";

export class GeneratorService {

	constructor($rootScope, $http, serviceConfig) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.serviceConfig = serviceConfig;
	}

	getGeneratorFiles(schematicsCode) {
		const config = {
			method: 'GET',
			url: `${this.serviceConfig.BACKEND_URL}/generator`,
			params: {
				schematicsCode
			}
		};
		this.$http(config).then(res => {
			if (res.data) this.$rootScope.$broadcast('getGeneratorFilesSuccess', res.data);
			else this.$rootScope.$broadcast('getGeneratorFilesError', { message: "Function does not have files to create", type: "error" });
		}).catch(err => {
			this.$rootScope.$broadcast('getGeneratorFilesError', err.data);
		});
	}

	getUser() {
		const config = {
			method: 'GET',
			url: `${this.serviceConfig.BACKEND_URL}/user`
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
			url: `${this.serviceConfig.BACKEND_URL}/function-detail`,
			params: {
				'schematicsCode': schematicsCode
			}
		};
		return this.$http(config).then(res => res.data);
	}

	getModules(schematicsCode) {
		const config = {
			method: 'GET',
			url: `${this.serviceConfig.BACKEND_URL}/modules`,
			params: {
				'schematicsCode': schematicsCode
			}
		};
		return this.$http(config).then(res => res.data).catch(err => err.data);
	}


	downloadStructure(config) {
		const reqConfig = {
			method: 'POST',
			url: `${this.serviceConfig.BACKEND_URL}/download-structure`,
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
			url: `${this.serviceConfig.BACKEND_URL}/create-branch`,
			params: {
				branchName
			}
		};
		return this.$http(config).then(res => res.data).catch(err => err.data);
	}

}