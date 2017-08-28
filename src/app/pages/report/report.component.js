'use strict';
import template from './report.html';
const primaryCodes = {
	DEVELOPMENT: 1,
	ANALISYS: 2
};

const reportCodes = {
	ANALISYS: 352
};

class ReportController {

	constructor($scope, $state, reportService, $interval, $timeout, messageService) {
		'ngInject';
		this.$scope = $scope;
		this.$state = $state;
		this.reportService = reportService;
		this.messageService = messageService;
		this.$interval = $interval;
		this.$timeout = $timeout;
		this.reports = [];
		this.groupChild = [];
		this.desenvNames = [];
		this.analistsNames = [];
		this.selected = {};
		this.isRefresh = false;
		this.primary = [{ name: 'Developers', code: 1, isSelected: true }, { name: 'Analysts', code: 2, isSelected: false }];
		this.initializer();
	}

	initializer() {
		// Filter default values
		this.setFilterDefault();
		this.isVev = true;
		this.isProject = true;

		// Todo Report Events
		this.$scope.$on('getTodoReportSuccess', (event, res) => {
			this.desenvReport = res.filter(value => value.code !== reportCodes.ANALISYS);
			this.desenvNames = this.desenvReport.map(value => ({ name: value.name, code: value.code }));
			this.hasReport = true;
			this.isRefreshLoader = undefined;

			if (!this.isRefresh) {
				this.isVev = true;
				this.isProject = true;
			}
			this.changePrimary(this.getPrimarySelected());
		});
		this.$scope.$on('getTodoReportError', (event, err) => {
			this.messageService.open(err);
			console.log(err);
		});

		// Analisys Report Events
		this.$scope.$on('getAnalistReportSuccess', (event, res) => {
			this.analisysReport = res;
			this.analistsNames = res.filter(value => ({ name: value.dsAnalista, code: value.nmAnalista }));
		});

		this.$scope.$on('getAnalistReportError', (event, err) => {
			this.messageService.open(err);
			console.log(err);
		});

	}

	changeGroup(groupName) {
		this.selected = groupName;
		this.isRefresh = true;
		this.autoRefresh();
		// Show SO's when an analyst is selected.
		groupName.code ? this.isShowSO = true : this.isShowSO = false;
	}

	changePrimary(item, isChanged) {
		this.setPrimarySelected(item.code);
		this.setGroupChild();

		if (item.code == primaryCodes.DEVELOPMENT) {
			this.reports = this.desenvReport;
		} else if (item.code == primaryCodes.ANALISYS) {
			this.reports = this.analisysReport;
		}

		if (!this.selected.code || isChanged) this.selected = this.groupChild.find(value => !value.code);
		if (isChanged) this.setFilterDefault();
		this.autoRefresh();
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

	isObjectEmpty(obj = {}) {
		return Object.keys(obj).length === 0;
	}

	getPrimarySelected() {
		return this.primary.find(value => value.isSelected);
	}

	setPrimarySelected(code) {
		this.primary.forEach(value => value.code == code ? value.isSelected = true : value.isSelected = false);
	}

	setGroupChild() {
		const primaryCodeSelected = this.getPrimarySelected().code;
		this.groupChild = [];
		this.groupChild.push({ name: "All groups", code: undefined });

		if (primaryCodeSelected == primaryCodes.DEVELOPMENT) this.groupChild = this.groupChild.concat(this.desenvNames);
		else if (primaryCodeSelected == primaryCodes.ANALISYS) this.groupChild = this.groupChild.concat(this.analistsNames);
	}

	isAnalisysSelected() {
		return this.getPrimarySelected().code == primaryCodes.ANALISYS;
	}

	isDevelopmentSelected() {
		return this.getPrimarySelected().code == primaryCodes.DEVELOPMENT;
	}

	setFilterDefault() {
		this.isRefresh = true;
		this.isShowBack = true;
		this.isShowSO = false;
		this.isChangeCard = false;
	}

}

export default {
	template: template,
	controller: ReportController
};