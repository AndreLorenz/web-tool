'use strict';

import { GeneratorService } from './services/generator.service';
import { AuthService } from './services/auth.service';

const coreModule = angular.module('core-module', [])
	.service('generatorService', GeneratorService)
	.service('authService', AuthService);


export default coreModule;
