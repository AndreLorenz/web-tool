'use strict';

import loaderTpl from './loader.html';

function loaderComponent($log) {
  'ngInject';

  var directive = {
    restrict: 'E',
    template: loaderTpl,
    controller: LoaderController,
    controllerAs: 'vm',
    scope: true,
    bindToController: {
      message: '@'
    }
  };

  return directive;

  function LoaderController() {
    console.log("Loader")
  }

}

export default loaderComponent;