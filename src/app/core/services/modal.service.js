import modalComponent from '../../components/modal/modal.component';

export class ModalService {

  constructor($rootScope, ngDialog) {
    'ngInject';
    this.ngDialog = ngDialog;
    this.$rootScope = $rootScope;
    this.modal;
    this.config = {};
  }

  open(title, files, width) {
    this.modal = this.ngDialog.open({
      template: modalComponent.templateUrl,
      controller: modalComponent.controller,
      controllerAs: '$ctrl',
      overlay: true,
      showClose: false,
      disableAnimation: false,
      width: width,
      closeByEscape: true,
      closeByDocument: true,
    });
    this.$rootScope.$on('ngDialog.opened', function (e) {
      e.targetScope.$$childTail.$ctrl.title = title;
      e.targetScope.$$childTail.$ctrl.files = files;
    });
  }

  close() {
    return this.modal.close();
  }
}