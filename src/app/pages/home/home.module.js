'use strict';

import homeComponent from './home.component';
import './home.scss';

const homeModule = angular.module('home-module', []);

homeModule
  .component('homeComponent', homeComponent);

export default homeModule;