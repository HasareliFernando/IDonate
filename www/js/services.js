angular.module('app.services', [])

.factory('BlankFactory', [function(){


}])


.service('BlankService', [function(){

}])
.service('productService', [function() {
  var productList = [];

  var addProduct = function(newObj) {
      productList.push(newObj);
  };

  var getProducts = function(){
      return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

}])

.service('SignInService',function($q,$http) {
    return {
        login: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            //var encodedString = 'username=' + encodeURIComponent(name) + '&telephone=' + encodeURIComponent(pw);

            $http({
              method: 'POST',
              url:'http://127.0.0.1/idonate/server/login.php',
              data: {username : encodeURIComponent(name), telephone : encodeURIComponent(pw)},
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function mySuccess(response) {
                if (response.data.error.code == '000') {
                  deferred.resolve(response.data.userData.userID);
                } else {
                  deferred.reject('Wrong credentials.');
                }
                  
              }, function myError(response) {
                
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})


.service('SignUpService', function($q,$http) {
    return {
        register: function(name, tp, fname, lname) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            //var encodedString = 'username=' + encodeURIComponent(name) + '&telephone=' + encodeURIComponent(pw);

            $http({
              method: 'POST',
              url:'http://127.0.0.1/idonate/server/registration.php',
              data: {username : encodeURIComponent(name), telephone : encodeURIComponent(tp), firstname : encodeURIComponent(fname), lastname : encodeURIComponent(lname)},
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function mySuccess(response) {
             console.log(response.data);

               // console.log(response.data);
                if (response.data.error.code == '001') {
                  console.log("success");
                  deferred.resolve(response.data.userData.firstName);
                } else {
                  deferred.reject('Wrong credentials.');
                  console.log("wrong credentail");
                }
                  
              }, function myError(response) {
                console.log("error");
               
                
              });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});

