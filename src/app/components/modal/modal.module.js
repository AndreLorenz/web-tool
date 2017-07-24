'use strict';

import modalComponent from './modal.component';
import './modal.css';

const modalModule = angular.module('modal-module', []);

modalModule
  .component('modalComponent', modalComponent);

export default modalModule;