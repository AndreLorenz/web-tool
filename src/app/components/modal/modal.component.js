'use strict';
import template from './modal.html';

class ModalController {

  constructor($scope, $state, generatorService, authService, modalService) {
    'ngInject';
    this.$scope = $scope;
    this.modalService = modalService;
    this.contents = [];
    this.initializer();
  }

  initializer() {
    this.$scope.$on("modal.addContents", (event, res) => {
      this.addContents(res);
    });
  }


  closeDialog() {
    this.contents = [];
    this.modalService.close();
  }

  addContents(content) {
    this.contents.push(content);
  }
}

export default {
  template: template,
  controller: ModalController
};