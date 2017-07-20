'use strict';
import template from './home.html';

class HomeController {

  constructor() {
    'ngInject';
    this.cards = [{
        'title': 'Generate Structure',
        'description': 'Generate the Structure for tasy HTML5',
        'img': require('../../../assets/images/github.svg'),
        'uisref': 'generator'
      },
      {
        'title': 'View Reports for Groups',
        'description': 'View Reports for Groups',
        'img': require('../../../assets/images/angular.png'),
        'uisref': 'generator'
      },
      {
        'title': 'Generate Structure',
        'description': 'Generate the Structure for tasy HTML5',
        'img': require('../../../assets/images/yeoman.png'),
        'uisref': 'generator'
      },
      {
        'title': 'Generate Structure',
        'description': 'Generate the Structure for tasy HTML5',
        'img': require('../../../assets/images/me.jpg'),
        'uisref': 'generator'
      }
    ]
  }
}

export default {
  templateUrl: template,
  controller: HomeController
};