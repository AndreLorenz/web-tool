'use strict';
import template from './generator.html';

class GeneratorController {

  constructor($scope, $state, generatorService, authService, modalService) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.generatorService = generatorService;
    this.authService = authService;
    this.modalService = modalService;
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

  createModule() {
    this.modalService.open("Cleiton fodão", {
      title: "Files",
      contents: [{
        src: 'src/app/corCpaF8/items/shared/protocoloWDBP.js',
        message: 'Arquivo gerado com sucesso!',
        type: 'success'
      },
      {
        src: 'src/app/corCpaF8/items/shared/particularWPUMC.js',
        message: 'Arquivo com conflito!',
        type: 'warning'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      }]
    }
      , 800);

    setTimeout(() => {
      this.modalService.addContents({});
    }, 10000)
  }

  createStructure(config) {
    this.$state.go('preview-generator', {
      config
    });
  }

  createBranch(config) {
    return this.generatorService.createBranch(config.branchName).then(result => console.log(result)).catch(result => console.log(result));
  }

  logout() {
    this.authService.logout();
    this.$state.transitionTo('login');
  }

  getFunctionDetail() {
    if (this.config.code && this.config.selectedModule && (this.config.selectedModule.title || this.config.selectedModule.originalObject)) {
      this.generatorService.getFunctionDetail(this.config.code).then(response => {
        this.config = {
          ...this.config,
          ...response
        };
        this.labelPreview = 'Reload Informations'
        this.config.functionModule = this.config.selectedModule.title || this.config.selectedModule.originalObject;
      });
      this.previewStructure = true;
    }
  }

  validModule() {
    if (this.config.selectedModule) {
      return !this.modules.filter(item => item.name == this.config.selectedModule.originalObject || item.name == this.config.selectedModule.originalObject.name).length > 0;
    }
    return true;
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