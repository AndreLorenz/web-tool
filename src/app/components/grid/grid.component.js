'use strict';
import template from './grid.html';

class GridController {

	constructor($scope, $state, uiGridConstants) {
		'ngInject';
		this.$scope = $scope;
		this.uiGridConstants = uiGridConstants;
		this.initializer();
	}

	initializer() {
		this.highlightFilteredHeader = (row, rowRenderIndex, col, colRenderIndex) => {
			if (col.filters[0].term) return 'header-filtered';
			else return '';
		};

		this.gridOptions = {};
		this.gridOptions.enableFiltering = true;
		this.gridOptions.columnDefs = [
			{ name: 'serviceOrder', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'description', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'tab', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'milestone', width: '*', headerCellClass: this.highlightFilteredHeader },
			{
				name: 'function', width: '*', headerCellClass: this.highlightFilteredHeader
			},
			{
				name: 'status', width: '*', filter: {
					type: this.uiGridConstants.filter.SELECT,
					selectOptions: [{ value: '1', label: 'Documentação' }, { value: '2', label: 'Programação' }, { value: '3', label: 'Concluída' }, { value: '4', label: 'Teste' }, { value: '5', label: 'Impedimento' }, { value: '6', label: 'Falta Vídeo' }]
				},
				headerCellClass: this.highlightFilteredHeader
			},
			{ name: 'expected', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'activeStartedDate', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'minutesExpected', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'observation', width: '*', headerCellClass: this.highlightFilteredHeader },
			{ name: 'problem?', width: '*', headerCellClass: this.highlightFilteredHeader }
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
				"serviceOrder": "1405798",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FC",
				"status": "Concluída",
				"expected": "Sim",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			},
			{
				"serviceOrder": "1405797",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FS",
				"status": "Programação",
				"expected": "Sim",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			},
			{
				"serviceOrder": "1405796",
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