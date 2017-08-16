'use strict';
import template from './report.html';

class ReportController {

	constructor($scope, $state, reportService, $interval, $timeout) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.reportService = reportService;
		this.$interval = $interval;
		this.$timeout = $timeout;
		this.groups = [];
		this.groupNames = [];
		this.selected = {};
		this.isRefresh = false;
		this.initializer();
	}

	initializer() {
		this.$scope.$on('getTodoReportSuccess', (event, res) => {
			this.groups = res;
			this.groupNames = res.map(value => ({ name: value.name, code: value.code }));
			this.groupNames.push({ name: "All groups", code: undefined });
			if (!this.selected.code) this.selected = this.groupNames.find(value => !value.code);
			this.hasReport = true;
			this.isRefreshLoader = undefined;
			if (!this.isRefresh) {
				this.isVev = true;
				this.isProject = true;
			}
		});
		this.$scope.$on('getTodoReportError', (event, err) => {
			console.log(err);
		});
	}

	changeGroup(groupName) {
		this.selected = groupName;
	}

	autoRefresh() {
		if (this.isRefresh) {
			this.refresh = this.$interval(() => {
				if (new Date().getHours() >= 7 && new Date().getHours() <= 20) {
					this.isRefreshLoader = true;
					this.reportService.getTodoReport();
				}
			}, 90000);

			if (!this.selected.code) {
				this.isVev = true;
				this.isProject = false;
				this.changeCard = this.$interval(() => {
					this.isVev = !this.isVev;
					this.isProject = !this.isProject;
				}, 10000);
			}
		} else {
			if (this.refresh) {
				this.$interval.cancel(this.refresh);
				this.$interval.cancel(this.changeCard);
				this.isVev = true;
				this.isProject = true;
				this.refresh = undefined;
				this.changeCard = undefined;
			}
		}
	}

}

export default {
	template: template,
	controller: ReportController
};