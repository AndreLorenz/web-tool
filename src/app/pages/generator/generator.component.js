'use strict';
import template from './generator.html';

class GeneratorController {

  constructor($scope, $state, generatorService, authService) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.generatorService = generatorService;
    this.authService = authService;
    this.config = {
      webservice: true
    };
    this.modules = [];
    this.previewStructure = false;
    this.labelPreview = 'Preview Informations'
    this.user = this.authService.getUser() || {};
    this.initializer();
  }

  initializer() {
    this.$scope.$on('getUserSuccess', (event, res) => {
      console.log(res);
    });
    this.$scope.$on('getUserError', (event, err) => {
      console.log(err);
    });
    this.getModules();
  }

  createStructure(config) {

  }

  logout() {
    this.authService.logout();
    this.$state.transitionTo('login');
  }

  getFunctionDetail() {
    if (this.config.code) {
      this.generatorService.getFunctionDetail(this.config.code).then(response => {
        this.config = {
          ...this.config,
          ...response
        };
        this.labelPreview = 'Reload Informations'
        this.config.functionModule = this.config.selectedModule.title;
      });
      this.previewStructure = true;
    }
  }

  moduleSearch(str, array) {
    const matches = [];
    array.forEach(module => {
      if (module.name.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) matches.push(module)
    });
    return matches;
  }

  getModules() {
    return this.generatorService.getModules().then(response => {
      this.modules = response;
    });
  }

}

export default {
  templateUrl: template,
  controller: GeneratorController
};