import modalComponent from '../../components/modal/modal.component';

export class ModalService {

  constructor($rootScope, ngDialog) {
    'ngInject';
    this.ngDialog = ngDialog;
    this.$rootScope = $rootScope;
    this.modal;
    this.config = {};
  }

  open(title, contents, width) {
    this.modal = this.ngDialog.open({
      template: modalComponent.template,
      controller: modalComponent.controller,
      controllerAs: '$ctrl',
      overlay: true,
      showClose: false,
      disableAnimation: false,
      width: width,
      closeByEscape: true,
      closeByDocument: true,
    });
    this.$rootScope.$on('ngDialog.opened', (e, $dialog) => {
      $dialog.scope().$ctrl.addContents(contents);
    });
  }

  addContents(contents) {
    this.$rootScope.$broadcast("modal.addContents", {
      title: "Files2",
      contents: [{
        src: 'src/app/corCpaF8/items/shared/protocoloWDBP.js',
        message: 'Arquivo gerado com sucesso!',
        type: 'success'
      },
      {
        src: 'src/app/corCpaF8/items/shared/particularWPUMC.js',
        message: 'Arquivo com conflito!',
        type: 'warning'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      },
      {
        src: 'src/app/corCpaF8/items/shared/protocoloItemWDBP.js',
        message: 'Arquivo já existe, impossível sobreescrever!',
        type: 'error'
      }]
    });
  }

  close() {
    return this.modal.close();
  }
}