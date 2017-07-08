angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('LogIn', {
    url: '/page3',
    templateUrl: 'templates/LogIn.html',
    controller: 'LogInCtrl'
  })

  .state('iDonate', {
    url: '/page4',
    templateUrl: 'templates/iDonate.html',
    controller: 'iDonateCtrl'
  })

  .state('iDonate2', {
    url: '/page5',
    templateUrl: 'templates/iDonate2.html',
    controller: 'iDonate2Ctrl'
  })

  .state('settings', {
    url: '/page6',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('timeline', {
    url: '/page7',
    templateUrl: 'templates/timeline.html',
    controller: 'timelineCtrl'
  })

  .state('bloodRequest', {
    url: '/page8',
    templateUrl: 'templates/bloodRequest.html',
    controller: 'bloodRequestCtrl'
  })

  .state('addPost', {
    url: '/page9',
    templateUrl: 'templates/addPost.html',
    controller: 'addPostCtrl'
  })

  .state('searchBloodBank', {
    url: '/page10',
    templateUrl: 'templates/searchBloodBank.html',
    controller: 'searchBloodBankCtrl'
  })

  .state('bloodCompatibility', {
    url: '/page11',
    templateUrl: 'templates/bloodCompatibility.html',
    controller: 'bloodCompatibilityCtrl'
  })

  .state('reportUser', {
    url: '/page12',
    templateUrl: 'templates/reportUser.html',
    controller: 'reportUserCtrl'
  })

  .state('addAsDonor', {
    url: '/page13',
    templateUrl: 'templates/addAsDonor.html',
    controller: 'addAsDonorCtrl'
  })

  .state('addAsDonor2', {
    url: '/page14/:term',
    templateUrl: 'templates/addAsDonor2.html',
    controller: 'addAsDonor2Ctrl'
  })

  .state('addAsDonor3', {
    url: '/page15',
    templateUrl: 'templates/addAsDonor3.html',
    controller: 'addAsDonor3Ctrl'
  })

      .state('myProfile', {
    url: '/myProfile',
    templateUrl: 'templates/myProfile.html',
    controller: 'myProfileCtrl'
  })

  .state('view', {
    url: '/view',
    templateUrl: 'templates/view.html',
    controller: 'viewCtrl'
  })

  .state('reminders', {
    url: '/reminders',
    templateUrl: 'templates/reminders.html',
    controller: 'remindersCtrl'
  })

  .state('status', {
    url: '/status',
    templateUrl: 'templates/status.html',
    controller: 'statusCtrl'
  })

  .state('editProfile', {
    url: '/editProfile',
    templateUrl: 'templates/editProfile.html',
    controller: 'editProfileCtrl'
  })
  .state('notification', {
    url: '/notification/:term',
    templateUrl: 'templates/notification.html',
    controller: 'NotificationController'
  })

  .state('contactDonor', {
    url: '/contactDonor/:term',
    templateUrl: 'templates/contactDonor.html',
    controller: 'contactDonorCtrl'
  })

  .state('bloodRequestnot', {
    url: '/bloodRequestnot/:term',
    templateUrl: 'templates/bloodRequestnot.html',
    controller: 'bloodRequestnotCtrl'
  })

  .state('verifiedStatus', {
    url: '/verifiedStatus',
    templateUrl: 'templates/verifiedStatus.html',
    controller: 'verifiedStatusCtrl'
  })

  .state('canDonate', {
    url: '/candonate',
    templateUrl: 'templates/candonate.html',
    controller: 'candonateCtrl'
  })


$urlRouterProvider.otherwise('/page3')



});
