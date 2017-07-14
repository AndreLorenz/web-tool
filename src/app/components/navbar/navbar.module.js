'use strict';

import footerDirective from './navbar.directive';
import './navbar.scss';

const footerModule = angular.module('navbar-module', []);

footerModule
  .directive('navbar', footerDirective);

export default footerModule;
