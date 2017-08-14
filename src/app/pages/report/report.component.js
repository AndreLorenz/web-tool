'use strict';
import template from './report.html';

class ReportController {

	constructor($scope, $state, reportService, $interval) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.reportService = reportService;
		this.$interval = $interval;
		this.groups = [];
		this.isRefresh = false;
		this.initializer();
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

	autoRefresh() {
		if (this.isRefresh) {
			this.refresh = this.$interval(() => {
				this.hasReport = false;
				this.reportService.getTodoReport();
			}, 60000);
		} else {
			if (this.refresh) {
				this.$interval.cancel(this.refresh);
				this.refresh = undefined;
			}
		}
	}

}

export default {
	template: template,
	controller: ReportController
};