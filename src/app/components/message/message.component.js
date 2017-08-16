'use strict';
import template from './message.html';

class MessageController {

  constructor() {
    'ngInject';
    this.initializer();
  }
}



export default {
  template: template,
  controller: MessageController
};