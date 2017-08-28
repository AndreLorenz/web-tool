'use strict';
import template from './report.html';

class ReportController {

	constructor($scope, $state, reportService, $interval, $timeout, messageService) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.reportService = reportService;
		this.messageService = messageService;
		this.$interval = $interval;
		this.$timeout = $timeout;
		this.groups = [];
		this.groupNames = [];
		this.selected = {};
		this.isRefresh = false;
		this.viewAnalisys = false;
		this.primary = [{ name: 'Developers', code: 1 }, { name: 'Analysts', code: 2 }];
		this.initializer();
	}

	initializer() {
		// todo report
		this.$scope.$on('getTodoReportSuccess', (event, res) => {
			this.selectedPrimary = { name: 'Developers', code: 1 };
			this.desenv = res.filter(value => value.code !== 352);
			this.groups = this.desenv;
			this.groupNames = res.map(value => ({ name: value.name, code: value.code }));
			this.desenvNames = this.desenv.map(value => ({ name: value.name, code: value.code }));
			this.desenvNames.push({ name: "All groups", code: undefined });
			if (!this.selected.code) this.selected = this.groupNames.find(value => !value.code);
			this.hasReport = true;
			this.isRefreshLoader = undefined;
			if (!this.isRefresh) {
				this.isVev = true;
				this.isProject = true;
			}
			this.changePrimary(this.selectedPrimary);
		});
		this.$scope.$on('getTodoReportError', (event, err) => {
			this.messageService.open(err);
			console.log(err);
		});
		//analisys report
		this.$scope.$on('getAnalistReportSuccess', (event, res) => {
			this.analists = res;
			this.analistsNames = res.filter(value => ({ name: value.dsAnalista, code: value.nmAnalista }));
			this.analistsNames.push({ name: "All groups", code: undefined });
		});
		this.$scope.$on('getAnalistReportError', (event, err) => {
			this.messageService.open(err);
			console.log(err);
		});
	}

	changeGroup(groupName) {
		if (groupName.code == 2) {
			this.selected = groupName;
			this.isRefresh = true;
			this.autoRefresh();
		} else {
			this.selected = groupName;
			this.isRefresh = true;
			this.autoRefresh();
		}
	}

	changePrimary(item) {
		if (item.code == 1) {
			this.groups = this.desenv;
			this.groupChild = this.desenvNames;
			this.selectedPrimary = item;
			this.selected = { name: "All groups", code: undefined };
			this.viewAnalisys = false;
			this.isRefresh = true;
			this.isShowBack = true;
			this.autoRefresh();
		} else {
			this.isChangeCard = false;
			this.groups = this.analists;
			this.groupChild = this.analistsNames;
			this.viewAnalisys = true;
			this.isShowBack = false;
			this.isRefresh = true;
			this.selectedPrimary = item;
			this.selected = { name: "All groups", code: undefined };
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