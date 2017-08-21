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
		this.viewAnalisys = false;
		this.initializer();
	}

	initializer() {
		// todo report
		this.$scope.$on('getTodoReportSuccess', (event, res) => {
			this.groups = res.filter(value => value.code !== 352);
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
		//analisys report
		this.$scope.$on('getAnalistReportSuccess', (event, res) => {
			this.analists = res;
		});
		this.$scope.$on('getAnalistReportError', (event, err) => {
			console.log(err);
		});
	}

	changeGroup(groupName) {
		if (groupName.code == 352) {
			this.selected = groupName;
			this.viewAnalisys = true;
			this.isRefresh = true;
			this.autoRefresh();
		} else if (!groupName) {
			this.selected = groupName;
			this.viewAnalisys = false;
			this.isRefresh = false;
		} else {
			this.selected = groupName;
			this.viewAnalisys = false;
			this.isRefresh = true;
			this.autoRefresh();
		}
	}

	autoRefresh() {
		if (this.isRefresh && !this.refreshInterval) {
			this.refreshInterval = this.$interval(() => {
				if (new Date().getHours() >= 7 && new Date().getHours() <= 20) {
					this.isRefreshLoader = true;
					this.reportService.getTodoReport();
					this.reportService.getAnalistReport();
				}
			}, 90000);
		} else if (!this.isRefresh) {
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