var app = angular.module('hospitalApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/home.html', controller: 'HomeCtrl' })
    .when('/doctors', { templateUrl: 'views/doctors.html', controller: 'DoctorsCtrl' })
    .when('/book', { templateUrl: 'views/book.html', controller: 'BookAppointmentCtrl' })
    .when('/appointments', { templateUrl: 'views/appointments.html', controller: 'AppointmentsCtrl' })
    .otherwise({ redirectTo: '/' });
}]);

app.run(['$rootScope', '$location', function ($rootScope, $location) {
  $rootScope.isActive = function (path) { return $location.path() === path; };
  $rootScope.currentYear = new Date().getFullYear();
}]);

app.directive('pageHeader', function () {
  return {
    restrict: 'E',
    scope: { title: '@', subtitle: '@' },
    template: '<div class="page-head"><div class="page-head-inner"><h1>{{title}}</h1><p>{{subtitle}}</p></div></div>'
  };
});

app.directive('appAlert', function () {
  return {
    restrict: 'E',
    scope: { type: '@', message: '=' },
    template: '<div class="alert alert-{{type}}" ng-if="message"><span class="material-icons">{{type === "success" ? "check_circle" : "error"}}</span><div>{{message}}</div></div>'
  };
});
