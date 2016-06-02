angular.module('AirportServices', ['ngResource'])
.factory('Airport', ['$resource', function($resource) {
  return $resource('/api/airports/:id', {}, {
    query: {isArray: true},
    get: {method: 'GET', cache: false, isArray: true},

  });
}])

.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secretairport-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secretairport-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretairport-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      // console.log('Get token returned: ', token)
      return token ? true : false;
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload;
        } catch(err) {
          return false;
        }
      }
    }
  }
}])

.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])