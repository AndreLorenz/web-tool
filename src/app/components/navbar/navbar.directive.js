'use strict';

import navbarTpl from './navbar.html';

function navbarComponent($log) {
  'ngInject';

  var directive = {
    restrict: 'E',
    templateUrl: navbarTpl,
    controller: NavBarController,
    controllerAs: 'vm',
    scope: true,
    bindToController: {

    }
  };

  return directive;

  function NavBarController($scope, authService, $state) {
    'ngInject';
    if (authService.getUser()) {
      this.userLogo = authService.getUser().avatar_url;
      this.username = authService.getUser().name;
    }
    $scope.$on("userLogged", (event, res) => {
      this.userLogo = res.avatar_url;
      this.username = res.name || 'User Name';
    });

    this.logout = () => {
      authService.logout();
      $state.transitionTo('login');
      this.userLogo = undefined;
      this.username = undefined || 'User Name';
    }

    this.settings = () => {
      $state.transitionTo('settings');
    }

    this.dropdown = [{
        'value': 'Settings',
        'icon': 'ui-1_settings-gear-63',
        'type': 'menu',
        'action': this.settings
      }, {
        'type': 'divider'
      },
      {
        'value': 'Logout',
        'icon': 'ui-1_lock-circle-open',
        'type': 'menu',
        'action': this.logout
      }
    ];

    this.navItem = [{
      'name': 'Home',
      'uisref': 'home',
      'active': 'active'
    }, {
      'name': 'Generate',
      'uisref': 'Generate'
    }];
  }



}

export default navbarComponent;