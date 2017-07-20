'use strict';

import settingsComponent from './settings.component';
import './settings.scss';

const settingsModule = angular.module('settings-module', []);

settingsModule
  .component('settingsComponent', settingsComponent);

export default settingsModule;