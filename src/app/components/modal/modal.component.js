'use strict';
import template from './modal.html';

class ModalController {

  constructor($scope, $state, generatorService, authService, modalService) {
    'ngInject';
    this.modalService = modalService;
    this.title;
    this.files;
  }


  closeDialog() {
    this.modalService.close();
  }
}

export default {
  templateUrl: template,
  controller: ModalController
};