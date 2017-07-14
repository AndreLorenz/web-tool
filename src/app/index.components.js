'use strict';

import footerModule from './components/footer/footer.module';
import navbarModule from './components/navbar/navbar.module';
import loginModule from './components/login/login.module';
import generatorModule from './components/generator/generator.module';
import previewGeneratorModule from './components/preview-generator/preview-generator.module';

export default angular.module('index.components', [
	footerModule.name, 
	loginModule.name,
	generatorModule.name,
	previewGeneratorModule.name,
	navbarModule.name
]);
