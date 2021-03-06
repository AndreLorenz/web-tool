'use strict';

function config($logProvider, $compileProvider, $httpProvider) {
  'ngInject';

  $logProvider.debugEnabled(true);

  if ('' === 'production') {
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

  $httpProvider.interceptors.push(($location, $q, $injector) => {
    return {
      request: config => {
        config.headers = config.headers || {};
        const auth = $injector.get('authService');
        if (auth.getToken()) {
          config.headers['x-access-token'] = auth.getToken();
        }

        return config;
      },

      responseError: response => {
        const auth = $injector.get('authService');
        const messageService = $injector.get('messageService');
        if ([401, 402, 404, 502].includes(response.status)) {
          $location.path('/login');
          auth.logout();
        }
        if (response.data) messageService.open(response.data);

        return $q.reject(response);
      }
    }
  });


}

export default config;
