'use strict';
import template from './preview-generator.html';

class PreviewGeneratorController {

  constructor($scope, generatorService) {
    'ngInject';
    this.$scope = $scope;
    this.generatorService = generatorService;
    this.initializer();
    this.generatorService.getGeneratorFiles();
    this.tree = [];
    this.structure = [];
  }

  initializer() {
    this.$scope.$on('getGeneratorFilesSuccess', (event, res) => {
      this.loadFiles(res);
      console.log(this.tree);
    });
    this.$scope.$on('getGeneratorFilesError', (event, err) => {
      console.log(err);
    });
  }

  onClike(file) {
    this.contentRows = file.content.split('\n').length;
    this.content = file.content;
    this.name = file.name.replace('.js', '');
    this.oldName = this.name;
    this.src = file.src;
    this.uid = file.uid;
  }

  save() {
    this.allowEdit = false;
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

  loadFiles(lines = []) {
    lines.forEach(line => {
      const lineFields = line.fileName.split(`\\`);
      this.findFolder(lineFields, 0, line);
    });
  }


  findFolder(lineFields, i, line, childrenPath = this.tree) {
    if (lineFields.length === i) return;
    var children = childrenPath.find((value) => value.name === lineFields[i]);
    if (children) this.findFolder(lineFields, ++i, line, children.children);
    else {
      let index = 0;
      if (lineFields.length - 1 === i) {
        index = childrenPath.push({
          name: lineFields[i],
          content: line.file,
          src: line.fileName,
          children: []
        });
      } else {
        index = childrenPath.push({
          name: lineFields[i],
          children: []
        });
      }
      this.findFolder(lineFields, ++i, line, childrenPath[index - 1].children);
    }

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