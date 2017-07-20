'use strict';

import navbarDirective from './navbar.directive';
import './navbar.css';

const navbarModule = angular.module('navbar-module', []);

navbarModule
  .directive('navbar', navbarDirective);

export default navbarModule;
