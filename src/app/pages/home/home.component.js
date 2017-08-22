'use strict';
import template from './home.html';

class HomeController {

  constructor($scope, authService) {
    'ngInject';
    this.$scope = $scope;
    this.authService = authService;
    this.initialize();
  }

  initialize() {
    this.$scope.$on('getUserDataSuccess', (event, res) => {
      this.cards = res.pages.filter(item => item.typePage == "C");
      console.log(this.cards);
    });
    this.$scope.$on('getUserDataError', (event, err) => {
      console.log(err);
    });
  }
}

export default {
  template: template,
  controller: HomeController
};