'use strict';

import navbarTpl from './navbar.html';

function navbarComponent($log) {
	'ngInject';

  var directive = {
    restrict: 'E',
    templateUrl: navbarTpl,
    controller: NavBarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

  function NavBarController () {
	  $log.debug('Hello from footer controller!');
  }

}

export default navbarComponent;
