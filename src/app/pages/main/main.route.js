'use strict';

import mainTpl from './main.html';
import mainController from './main.controller';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/',
      component: 'loginComponent',
      onEnter: (authService, $state) => {
        if (authService.getToken()) {
          return $state.transitionTo('home');
        }
        return true;
      }
    })
    .state('home', {
      url: '/',
      component: 'homeComponent'
    })
    .state('generator', {
      url: '/generator',
      component: 'generatorComponent',
    })
    .state('settings', {
      url: '/settings',
      component: 'settingsComponent',
    })
    .state('report', {
      url: '/report',
      component: 'reportComponent',
      onEnter: (reportService) => {
        reportService.getTodoReport();
        reportService.getAnalistReport();
      }
    })
    .state('preview-generator', {
      url: '/',
      component: 'previewGeneratorComponent',
      params: {
        config: undefined
      },
      onEnter: ($state, $stateParams) => {
        if (!$stateParams.config) return $state.transitionTo('generator');
      }
    });
}

export default routeConfig;