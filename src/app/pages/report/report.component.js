'use strict';
import template from './report.html';

class ReportController {

	constructor($scope, $state, reportService) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.reportService = reportService;
		this.groups = [];
		this.initializer();
		this.reportService.getTodoReport();
	}

	initializer() {
		this.$scope.$on('getTodoReportSuccess', (event, res) => {
			this.groups = res;
			this.hasReport = true;
		});
		this.$scope.$on('getTodoReportError', (event, err) => {
			console.log(err);
		});
	}

}

export default {
	templateUrl: template,
	controller: ReportController
};