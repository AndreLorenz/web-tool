'use strict';

import inputListDirective from './input-list.directive';
import './input-list.css';

const inputListModule = angular.module('inputList-module', []);

inputListModule
  .directive('inputList', inputListDirective);

export default inputListModule;