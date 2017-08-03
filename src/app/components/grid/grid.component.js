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
		this.myData = [
			{
				"serviceOrder": "1405799",
				"description": "#PRG 1 - 833728 - Gestão de consignados - Gestão de consignados",
				"tab": "Gestão de consignados",
				"milestone": "Milestone 1",
				"function": "ComSol_FS",
				"status": "Concluída",
				"expected ": "Sim",
				"active started date": "07/06/2017",
				"minutes expected": "238",
				"minutes executed": "245",
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