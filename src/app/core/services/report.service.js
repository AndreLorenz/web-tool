export class ReportService {

	constructor($rootScope, $http, serviceConfig) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.serviceConfig = serviceConfig;
	}

	getTodoReport() {
		const config = {
			method: 'GET',
			url: `${this.serviceConfig.BACKEND_URL}/todo-report`
		};
		return this.$http(config).then(res => {
			this.$rootScope.$broadcast('getTodoReportSuccess', res.data)
		}
		)
			.catch(err => this.$rootScope.$broadcast('getTodoReportError', err));

	}
}