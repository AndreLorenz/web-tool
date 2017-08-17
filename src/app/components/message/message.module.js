'use strict';

import messageComponent from './message.component';
import './message.css';

const messageModule = angular.module('message-module', []);

messageModule
  .component('messageComponent', messageComponent);

export default messageModule;