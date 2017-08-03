'use strict';
import template from './home.html';

class HomeController {

  constructor() {
    'ngInject';
    this.cards = [{
        'title': 'Generate Structure',
        'description': 'Generate the Structure for tasy HTML5',
        'img': require('../../../assets/images/generator.svg'),
        'uisref': 'generator'
      },
      {
        'title': 'View Reports for Groups',
        'description': 'View Reports for Groups',
        'img': require('../../../assets/images/report.svg'),
        'uisref': 'generator'
      },
      {
        'title': 'Delete collaborators',
        'description': 'Delete collaborators',
        'img': require('../../../assets/images/deleted.svg'),
        'uisref': 'generator'
      },
      {
        'title': 'Service Order Management',
        'description': 'Management of the Programmers Service Order',
        'img': require('../../../assets/images/service_order.svg'),
        'uisref': 'somanagement'
      }
    ]
  }
}

export default {
  templateUrl: template,
  controller: HomeController
};