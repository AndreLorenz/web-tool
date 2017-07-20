'use strict';
import template from './preview-generator.html';

class PreviewGeneratorController {

  constructor($rootScope, $scope, generatorService) {
    'ngInject';
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.generatorService = generatorService;
    this.initializer();
    this.generatorService.getGeneratorFiles(4802);
    this.tree = [];
    this.structure = [];
    this.editorOptions = {
      theme: 'twilight',
      lineNumbers: true,
      readOnly: true,
      mode: "javascript",
      htmlMode: true,
    };
  }

  initializer() {
    this.$scope.$on('getGeneratorFilesSuccess', (event, res) => {
      this.tree = res;
      console.log(this.tree);
    });
    this.$scope.$on('getGeneratorFilesError', (event, err) => {
      console.log(err);
    });
  }



  onClike(item) {
    if (item.children.length > 0) {
      item.expanded = !item.expanded;
    } else {
      this.contentRows = item.content.split('\n').length;
      this.content = item.content;
      this.name = item.name.replace('.js', '');
      this.oldName = this.name;
      this.src = item.src;
      this.uid = item.uid;
    }
  }

  save() {
    this.editorOptions.readOnly = true;
    this.saveFile(this.tree);
  }

  saveFile(tree) {
    return tree.find(value => {
      if (value.uid === this.uid) {
        value.content = this.content;
        if (value.name != this.oldName) {
          value.name = `${this.name}.js`;
          value.src = value.src.replace(this.oldName, this.name);
        }
        return;
      }
      return this.saveFile(value.children);
    });
  }


  commitStructure(tree) {
    if (!tree) return;
    tree.forEach(value => {
      if (value.src) this.structure.push(value);
      if (value.children) this.commitStructure(value.children);
    });
  }
}

export default {
  templateUrl: template,
  controller: PreviewGeneratorController
};