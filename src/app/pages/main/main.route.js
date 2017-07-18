'use strict';

import mainTpl from './main.html';
import mainController from './main.controller';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: mainTpl,
      controller: mainController,
      controllerAs: 'main'
    })
    .state('login', {
      url: '/login',
      component: 'loginComponent',
      onEnter: (authService, $state) => {
        if (authService.getToken()) {
          return $state.transitionTo('generator');
        }
        return true;
      }
    })
    .state('generator', {
      url: '/generator',
      component: 'generatorComponent',
    })
    .state('settings', {
      url: '/settings',
      component: 'settingsComponent',
    })
    .state('preview-generator', {
      url: '/preview-generator',
      component: 'previewGeneratorComponent',
    });

}

export default routeConfig;