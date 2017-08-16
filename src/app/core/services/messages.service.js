import modalComponent from '../../components/modal/modal.component';

export class MessageService {

  constructor() {
    'ngInject';
  }

  openSuccess(message) {
    this.verifyType(message, 'success');
    setTimeout(() => document.getElementsByClassName("alert").parentNode.removeChild(node), 2000);
  }

  openInfo(message) {
    this.verifyType(message, 'info');
    setTimeout(() => document.getElementsByClassName("alert").parentNode.removeChild(node), 2000);
  }

  openWarning(message) {
    this.verifyType(message, 'warning');
    setTimeout(() => document.getElementsByClassName("alert").parentNode.removeChild(node), 2000);
  }

  openErro(message) {
    this.verifyType(message, 'danger');
    setTimeout(() => document.getElementsByClassName("alert").parentNode.removeChild(node), 2000);
  }

  verifyType(message, type) {
    if (Array.isArray(message)) angular.element(document.body).append(this.getHtml());
    else angular.element(document.body).append(this.getHtml(message, type));
    angular.element(document.getElementsByClassName('alert')).fadeIn(1000)
  }

  getHtml(message, type) {
    return `<div class="alert alert-${type}" role="alert">
      <div class="container">
        <div class="alert-icon">
          <i class="now-ui-icons ${type == 'success' ? 'ui-2_like' : type == 'info' ? 'travel_info' : type == 'warning' ? 'ui-1_bell-53' : 'objects_support-17'}"></i>
        </div>
        ${message}
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">
            <i class="now-ui-icons ui-1_simple-remove"></i>
          </span>
        </button>
      </div>
    </div>`;
  }
}