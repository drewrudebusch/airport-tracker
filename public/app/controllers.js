angular.module('AirportCtrls', ['AirportServices'])
.controller('HomeCtrl', ['$scope', 'Airport', 'Auth', function($scope, Airport, Auth) {
  $scope.Auth = Auth;
  $scope.airports = [];

  Airport.query(function success(data) {
    $scope.airports = data;
    console.log(data);
  }, function error(data) {
    console.log(data);
  });

  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchAirports   = '';     // set the default search/filter term

}])

.controller('ShowCtrl', ['$scope', '$stateParams', 'Airport', 'Auth', 'User',
                function($scope, $stateParams, Airport, Auth, User) {
  $scope.airport = {};

  Airport.get({id: $stateParams.id}, function success(data) {
    console.log(data);
    $scope.airport = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.addAirport = function(airportObject) {
    $scope.currentUser = Auth.currentUser();
      console.log('id: ', $scope.currentUser._doc._id);
      $scope.user = User.get({ id: $scope.currentUser._doc._id }, function() {
        $scope.user.airports.push(airportObject)
        console.log('user inside function: ', $scope.user)
        $scope.user.$update({ id: $scope.user.id }, function() {
          //updated in the backend
        });
      });
      console.log('user data: ', $scope.user);
  }
  

  console.log('current user: ', Auth.currentUser())



}])

.controller('NewCtrl', ['$scope', '$location', 'Airport', function($scope, $location, Airport) {
  $scope.airport = {
    country: '',
    state: '',
    city: '',
    airport_code: '',
    airport_name: ''
  };
  $scope.createAirport = function() {
    Airport.save($scope.airport, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  console.log('is logged in: ', Auth.isLoggedIn());
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
    $location.path('/');
  }
}])

.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  }
}])

.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  }
}]);
