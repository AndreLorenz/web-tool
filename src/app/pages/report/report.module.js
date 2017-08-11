'use strict';

import reportComponent from './report.component';
import './report.scss';

const reportModule = angular.module('report-module', []);

reportModule
  .component('reportComponent', reportComponent);

export default reportModule;
