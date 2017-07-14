'use strict';

import loginComponent from './login.component';
import './login.scss';

const loginModule = angular.module('login-module', []);

loginModule
  .component('loginComponent', loginComponent);

export default loginModule;
