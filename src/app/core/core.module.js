'use strict';

import { GeneratorService } from './services/generator.service';
import { ReportService } from './services/report.service';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { serviceConfig } from './services/service-config.constant';

const coreModule = angular.module('core-module', [])
	.constant('serviceConfig', serviceConfig)
	.service('generatorService', GeneratorService)
	.service('reportService', ReportService)
	.service('authService', AuthService)
	.service('modalService', ModalService);


export default coreModule;
