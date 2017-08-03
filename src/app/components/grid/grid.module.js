'use strict';

import gridComponent from './grid.component';
import './grid.scss';

const gridModule = angular.module('grid-module', []);

gridModule
  .component('grid', gridComponent);

export default gridModule;