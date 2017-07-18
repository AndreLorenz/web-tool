'use strict';

import dropdownDirective from './dropdown.directive';
import './dropdown.css';

const dropdownModule = angular.module('dropdown-module', []);

dropdownModule
  .directive('dropdown', dropdownDirective);

export default dropdownModule;