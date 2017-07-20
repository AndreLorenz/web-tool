'use strict';

import inputListTpl from './input-list.html';

function inputListComponent($log) {
  'ngInject';

  var directive = {
    restrict: 'E',
    templateUrl: inputListTpl,
    controller: InputListController,
    controllerAs: 'vm',
    scope: true,
    bindToController: {
      values: '=',
      label: '@',
      labelnew: '@',
      labelout: '@',
      model: '=',
      id: "@",
      type: "@"
    }
  };



  return directive;

  function InputListController() {
    this.values = [{
      'valor': 'comsol_fs',
    }, {
      'valor': 'fatact_f5',
    }, {
      'valor': 'fatact_gr',
    }, {
      'valor': 'atepac_a1',
    }]
    this.click = value => {
      this.model = value;
      this.focus = false;
      console.log("click");
    }

    this.focusLost = value => {
      console.log("blur");
      this.focus = false;
    };
  }

}

export default inputListComponent;