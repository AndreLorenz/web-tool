'use strict';

import generatorComponent from './generator.component';
import './generator.scss';

const generatorModule = angular.module('generator-module', []);

generatorModule
  .component('generatorComponent', generatorComponent);

export default generatorModule;
