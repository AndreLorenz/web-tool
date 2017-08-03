'use strict';

// pages
import loginModule from './pages/login/login.module';
import generatorModule from './pages/generator/generator.module';
import previewGeneratorModule from './pages/preview-generator/preview-generator.module';
import settingsModule from './pages/settings/settings.module';
import homeModule from './pages/home/home.module';
import serviceOrderManagementModule from './pages/service-order-management/service-order-management.module';

// components
import navbarModule from './components/navbar/navbar.module';
import footerModule from './components/footer/footer.module';
import dropdownModule from './components/dropdown/dropdown.module';
import inputListModule from './components/input-list/input-list.module';
import modalModule from './components/modal/modal.module';
import gridModule from './components/grid/grid.module';


export default angular.module('index.components', [
	// pages
	loginModule.name,
	generatorModule.name,
	previewGeneratorModule.name,
	settingsModule.name,
	homeModule.name,
	serviceOrderManagementModule.name,
	// components
	navbarModule.name,
	footerModule.name,
	dropdownModule.name,
	inputListModule.name,
	modalModule.name,
	gridModule.name
]);