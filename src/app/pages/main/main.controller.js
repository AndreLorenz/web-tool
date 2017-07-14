'use strict';




import moment from 'moment';


import angularLogo from '_images/angular.png';

function MainController($log) {
  'ngInject';

  $log.debug('Hello from main controller!');




	this.moment_version = moment.version;


    this.angularLogo = angularLogo;

}

export default MainController;
