'use strict';

import { GeneratorService } from './services/generator.service';
import { ReportService } from './services/report.service';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';

const coreModule = angular.module('core-module', [])
	.service('generatorService', GeneratorService)
	.service('reportService', ReportService)
	.service('authService', AuthService)
	.service('modalService', ModalService);


export default coreModule;
