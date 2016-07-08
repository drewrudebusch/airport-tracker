angular.module('AirportCtrls', ['AirportServices'])

.controller('AirportCtrl', ['$scope', 'Airport', 'Auth', function($scope, Airport, Auth) {
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

.controller('HomeCtrl', ['$scope', 'Airport', 'Auth', function($scope, Airport, Auth) {

}])

.controller('ShowCtrl', ['$scope', '$stateParams', 'Airport', 'Auth', 'User',
                function($scope, $stateParams, Airport, Auth, User) {
  $scope.airport = {};
  $scope.airportVisited = false;

  Airport.get({id: $stateParams.id}, function success(data) {
    console.log(data);
    $scope.airport = {
      "_id": data._id,
      "airport_code": data.airport_code,
      "airport_name": data.airport_name,
      "city": data.city,
      "country": data.country,
      "state": data.state
    }
  }, function error(data) {
    console.log(data);
  });

  $scope.currentUser = Auth.currentUser();
  $scope.user = User.get({ id: $scope.currentUser._doc._id }, function(user) {
        console.log('id: ', $scope.user);
        $scope.visited = checkAirport($scope.airport, user.airports)
        console.log('visited: ', $scope.visited)
      });
  
  function checkAirport(obj, arr ) {    
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === obj._id) {
            return true;
        }
    }
    return false;
  }

  $scope.addAirport = function(airportObject) {
      User.get({ id: $scope.currentUser._doc._id }, function(user) {
      // console.log(user.airports)
      // console.log(airportObject)
      console.log('visited: ', $scope.visited);

        if ($scope.visited) {
          console.log('Airport is already in this user list')
        } else {
          user.airports.push(airportObject)
          console.log('user inside function: ', $scope.user)
          User.update({ id: user.id }, user, function(user) {
            $scope.user = user
            console.log('$scope.user: ', $scope.user);
            $scope.visited = true;
          });
        }
      });
  }
}])

.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.location = $location.path()
  $scope.isLoggedIn = function() {
    return Auth.isLoggedIn();
  }
  console.log('is logged in: ', Auth.isLoggedIn());
  $scope.Auth = Auth;
  $scope.currentUser = function(){
    return Auth.currentUser();
  }
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
    $location.path('/');
  }
}])

.controller('AuthCtrl', ['$scope', '$http', '$location', 'Auth',
                function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
    }, function error(res) {
      console.log(data);
    });
    $scope.userLogin();
  }

  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  }
}])

.controller('ProfileCtrl', ['$scope', '$location', 'Airport', 'Auth', 'User', function($scope, $location, Airport, Auth, User) {
  $scope.currentUser = Auth.currentUser();
  $scope.user = User.get({ id: $scope.currentUser._doc._id }, function(user) {
        console.log('id: ', $scope.user);
        $scope.myAirports = user.airports
      });
}])

