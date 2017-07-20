'use strict';

import previewGeneratorComponent from './preview-generator.component';
import './preview-generator.css';

const previewGeneratorModule = angular.module('preview-generator-module', []);

previewGeneratorModule
  .component('previewGeneratorComponent', previewGeneratorComponent);

export default previewGeneratorModule;
