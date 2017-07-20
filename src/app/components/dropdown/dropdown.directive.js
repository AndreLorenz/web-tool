'use strict';

import dropdownTpl from './dropdown.html';

function dropdownComponent($log) {
  'ngInject';

  var directive = {
    restrict: 'E',
    templateUrl: dropdownTpl,
    controller: DropdownController,
    controllerAs: 'vm',
    scope: true,
    bindToController: {
      username: '@',
      values: '='
    }
  };



  return directive;

  function DropdownController(authService, $state) {
    'ngInject';
    this.execAction = (action) => {
      if (angular.isFunction(action)) {
        return action.call(this);
      }
    }
  }

}

export default dropdownComponent;