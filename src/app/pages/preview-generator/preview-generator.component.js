'use strict';
import template from './preview-generator.html';

class PreviewGeneratorController {

  constructor($rootScope, $scope, generatorService, $state, $stateParams, modalService, messageService) {
    'ngInject';
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.generatorService = generatorService;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.modalService = modalService;
    this.messageService = messageService;
    this.initializer();
    this.tree = [];
    this.editorOptions = {
      theme: 'twilight',
      lineNumbers: true,
      readOnly: true,
      mode: "javascript",
    };
    if (this.$stateParams) this.generatorService.getGeneratorFiles(this.$stateParams.config.schematicsCode);
  }

  initializer() {
    this.$scope.$on('getGeneratorFilesSuccess', (event, res) => {
      this.tree = res;
      this.hasTree = true;
    });
    this.$scope.$on('getGeneratorFilesError', (event, err) => {
      this.messageService.open(err);
      this.$state.transitionTo('generator');
    });
  }

  edit() {
    this.editorOptions.readOnly = false;
  }

  onClike(item) {
    if (item.children.length > 0) {
      item.expanded = !item.expanded;
    } else {
      this.contentRows = item.content.split('\n').length;
      this.content = item.content;
      this.oldContent = item.content;
      this.name = item.name.replace(`.${item.name.split('.').pop()}`, '');
      this.extension = item.name.split('.').pop();
      this.oldName = this.name;
      this.src = item.src;
      this.uid = item.uid;
    }
  }

  save() {
    this.editorOptions.readOnly = true;
    this.saveFile(this.tree);
  }


  undoChanges() {
    this.editorOptions.readOnly = true;
    this.content = this.oldContent;
  }

  saveFile(tree) {
    return tree.find(value => {
      if (value.uid === this.uid) {
        value.content = this.content;
        if (value.name != this.oldName) {
          value.name = `${this.name}.${this.extension}`;
          value.src = value.src.replace(this.oldName, this.name);
        }
        return;
      }
      return this.saveFile(value.children);
    });
  }

  downloadStructure() {
    const config = this.$stateParams.config || {};
    config.structure = [];
    this.generateStructure(this.tree, config.structure);
    this.generatorService.downloadStructure(config);
  }


  generateStructure(tree, structure) {
    if (!tree) return;
    tree.forEach(value => {
      if (value.src) structure.push(value);
      if (value.children) this.generateStructure(value.children, structure);
      else this.generateStructure(false, structure);
    });
  }
}

export default {
  template: template,
  controller: PreviewGeneratorController
};