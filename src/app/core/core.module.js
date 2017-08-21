'use strict';

import { GeneratorService } from './services/generator.service';
import { ReportService } from './services/report.service';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { serviceConfig } from './services/service-config.constant';
import { MessageService } from './services/messages.service';
import { MongoDBService } from './services/mongodb.service';

const coreModule = angular.module('core-module', [])
	.constant('serviceConfig', serviceConfig)
	.service('generatorService', GeneratorService)
	.service('reportService', ReportService)
	.service('authService', AuthService)
	.service('modalService', ModalService)
	.service('messageService', MessageService)
	.service('mongoDBService', MongoDBService);

export default coreModule;
