'use strict';
import template from './grid.html';

class GridController {

	constructor($scope, $state, generatorService, authService, modalService) {
		'ngInject';
		this.$scope = $scope;
		this.modalService = modalService;
		this.initializer();
	}

	initializer() {
		this.gridOptions = {};
		this.gridOptions.columnDefs = [
			{ name: 'serviceOrder', width: '*' },
			{ name: 'description', width: '*' },
			{ name: 'tab', width: '*' },
			{ name: 'milestone', width: '*' },
			{ name: 'function', width: '*' },
			{ name: 'status', width: '*' },
			{ name: 'expected', width: '*' },
			{ name: 'activeStartedDate', width: '*' },
			{ name: 'minutesExpected', width: '*' },
			{ name: 'observation', width: '*' },
			{ name: 'problem?', width: '*' }
		];

		this.gridOptions.data = [
			{
				"serviceOrder": "1405799",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FS",
				"status": "Concluída",
				"expected": "Sim",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			},
			{
				"serviceOrder": "1405799",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FS",
				"status": "Concluída",
				"expected": "Sim",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			},
			{
				"serviceOrder": "1405799",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FS",
				"status": "Concluída",
				"expected": "Sim",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			},
			{
				"serviceOrder": "1405799",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FS",
				"status": "Concluída",
				"expected": "Sim",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			}
		]
	}
}

export default {
	templateUrl: template,
	controller: GridController
};