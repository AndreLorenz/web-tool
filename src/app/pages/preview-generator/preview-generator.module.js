'use strict';

import previewGeneratorComponent from './preview-generator.component';
import './preview-generator.scss';

const previewGeneratorModule = angular.module('preview-generator-module', []);

previewGeneratorModule
  .component('previewGeneratorComponent', previewGeneratorComponent);

export default previewGeneratorModule;
