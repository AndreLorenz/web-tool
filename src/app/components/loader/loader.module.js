'use strict';

import loaderComponent from './loader.directive';
import './loader.css';

const loaderModule = angular.module('loader-module', []);

loaderModule
  .directive('loader', loaderComponent);

export default loaderModule;