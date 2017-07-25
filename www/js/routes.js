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
    controller: 'iDonate2Ctrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('settings', {
    url: '/page6',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl',
    reload: true
  })

  .state('timeline', {
    url: '/page7',
    templateUrl: 'templates/timeline.html',
    controller: 'timelineCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('bloodRequest', {
    url: '/page8',
    templateUrl: 'templates/bloodRequest.html',
    controller: 'bloodRequestCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('addPost', {
    url: '/page9',
    templateUrl: 'templates/addPost.html',
    controller: 'addPostCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('searchBloodBank', {
    url: '/page10',
    templateUrl: 'templates/searchBloodBank.html',
    controller: 'searchBloodBankCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('bloodCompatibility', {
    url: '/page11',
    templateUrl: 'templates/bloodCompatibility.html',
    controller: 'bloodCompatibilityCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('reportUser', {
    url: '/page12',
    templateUrl: 'templates/reportUser.html',
    controller: 'reportUserCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('addAsDonor', {
    url: '/page13',
    templateUrl: 'templates/addAsDonor.html',
    controller: 'addAsDonorCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('addAsDonor2', {
    url: '/page14/:term',
    templateUrl: 'templates/addAsDonor2.html',
    controller: 'addAsDonor2Ctrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('addAsDonor3', {
    url: '/page15',
    templateUrl: 'templates/addAsDonor3.html',
    controller: 'addAsDonor3Ctrl',
    reload: true,
    params: {
        user: null
    }
  })

      .state('myProfile', {
    url: '/myProfile',
    templateUrl: 'templates/myProfile.html',
    controller: 'myProfileCtrl',
    reload: true
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
    controller: 'NotificationController',
    reload: true,
    params: {
        user: null,
        bag1:null,
        bag2:null
    }
  })

  .state('contactDonor', {
    url: '/contactDonor/:term',
    templateUrl: 'templates/contactDonor.html',
    controller: 'contactDonorCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('bloodRequestnot', {
    url: '/bloodRequestnot/:term',
    templateUrl: 'templates/bloodRequestnot.html',
    controller: 'bloodRequestnotCtrl',
    reload: true,
    params: {
        user: null,
        bag1:null
    }
  })

  .state('verifiedStatus', {
    url: '/verifiedStatus',
    templateUrl: 'templates/verifiedStatus.html',
    controller: 'verifiedStatusCtrl',
    reload: true,
    params: {
        user: null
    }
  })

  .state('canDonate', {
    url: '/candonate',
    templateUrl: 'templates/candonate.html',
    controller: 'candonateCtrl',
    reload: true,
    params: {
        user: null
    }
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpCtrl',
      
  })

  .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html',
      controller: 'SignInCtrl'
      
  })


$urlRouterProvider.otherwise('/signin')



});
