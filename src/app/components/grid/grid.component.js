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
				cellFilter: 'mapStatus',
				headerCellClass: this.highlightFilteredHeader
			},
			{ name: 'expected', width: '*', filter: {
					type: this.uiGridConstants.filter.SELECT,
					selectOptions: [{ value: '1', label: 'Sim' }, { value: '2', label: 'Não' }]
				},
				cellFilter: 'mapExpected',
				headerCellClass: this.highlightFilteredHeader },
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
				"status": "1",
				"expected": "1",
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
				"status": "2",
				"expected": "2",
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
				"status": "4",
				"expected": "1",
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
				"status": "3",
				"expected": "2",
				"activeStartedDate": "07/06/2017",
				"minutesExpected": "238",
				"minutesExecuted": "245",
				"observation": "Only a teste",
				"problem?": "Não"
			}
		]
	}

	filter() {
		const genderHash = {
			1: 'Documentação',
			2: 'Programação',
			3: 'Concluída',
			4: 'Teste',
			5: 'Impedimento',
			6: 'Falta Vídeo'
		};

		return (input) => {
			if (!input) return '';
			else return genderHash[input];
		};
	}
}

export default {
	templateUrl: template,
	controller: GridController
};