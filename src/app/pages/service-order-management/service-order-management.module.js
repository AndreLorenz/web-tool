'use strict';

import serviceOrderManagementController from './service-order-management.component';
import './service-order-management.scss';

const serviceOrderManagementModule = angular.module('service-order-management-module', []);

serviceOrderManagementModule
  .component('serviceOrderManagementController', serviceOrderManagementController);

export default serviceOrderManagementModule;
