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
			this.refreshInterval = this.$interval(() => {
				if (new Date().getHours() >= 7 && new Date().getHours() <= 20) {
					this.isRefreshLoader = true;
					this.reportService.getTodoReport();
				}
			}, 90000);
		} else {
			if (this.refreshInterval) {
				this.$interval.cancel(this.refreshInterval);
				this.refreshInterval = undefined;
			}
		}
	}

	activateChangeCard() {
		if (this.isChangeCard) {
			this.isVev = true;
			this.isProject = false;
			this.changeCardInterval = this.$interval(() => {
				this.isVev = !this.isVev;
				this.isProject = !this.isProject;
			}, 15000);
		} else {
			this.$interval.cancel(this.changeCardInterval);
			this.isVev = true;
			this.isProject = true;
			this.changeCardInterval = undefined;
		}
	}

	validateAlertVev(func) {
		return !func.DEVELOPMENT && !func.TRIAGE && !func.ANALISYS && !func.TECHNOLOGY && !func.TECHNOLOGYSOLIC && !func.OPERATION && func.VEV;
	}

}

export default {
	template: template,
	controller: ReportController
};