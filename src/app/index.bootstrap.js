'use strict';

// index.html page to dist folder
import '!!file-loader?name=[name].[ext]!../favicon.ico';


// vendor files
import "./index.vendor";

// main App module
import "./index.module";


import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/sass/now-ui-kit.scss";
import 'angular-bootstrap-grid-tree/src/treeGrid.css';
import "../assets/styles/sass/index.scss";

angular.element(document).ready(() => {
  angular.bootstrap(document, ['tasy-web-tool'], {
    strictDi: true
  });
});
