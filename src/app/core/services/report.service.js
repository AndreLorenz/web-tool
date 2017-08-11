export class ReportService {

	constructor($rootScope, $http) {
		'ngInject';
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.url = `http://10.125.2.54:8784`;
	}

	getTodoReport() {
		const config = {
			method: 'GET',
			url: `${this.url}/todo-report`
		};
		this.$http(config).then(res => this.$rootScope.$broadcast('getTodoReportSuccess', res.data))
			.catch(err => this.$rootScope.$broadcast('getTodoReportError', err));

	}
}