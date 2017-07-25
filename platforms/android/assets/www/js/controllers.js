angular.module('app.controllers', ['ngCordova'])

.controller('MyCtrl', ['$scope', '$ionicHistory',
function ($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}
])

.controller('LogInCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  

}])

.controller('iDonateCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('iDonate2Ctrl', ['$scope','$state' ,'$stateParams', '$ionicPlatform', '$cordovaBadge','$cordovaLocalNotification','$http','$cordovaBadge','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams, $ionicPlatform, $cordovaBadge,$cordovaLocalNotification,$http, $cordovaBadge,$timeout) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});

  var bag1=0;
  var bag2=0;
  var num=0;
    $scope.username=$stateParams.user;
    var user=$scope.username;

      var url3="http://idonate.000webhostapp.com/server/countnotification.php?user="+user;
      var url4="http://idonate.000webhostapp.com/server/countnotification2.php?user="+user;

       $timeout(function(){
        $http.get(url3).success(
      function(response){
        if(response.status==1){
        bag1=response.info[0].count;
        num=num+bag1;
      }
      });
      
       
        $http.get(url4).success(
      function(response2){
        if(response2.status==1){
        bag2=response2.info[0].count;
        num=num+bag2;
      }
      });

      
       $scope.badge=num;
        }, 10);
       $scope.Notification = function() {


                $http.get(url3).success(
                function(response){
                  if(response.status==1){
                  bag1=response.info[0].count;
                }
                });
                
                 
                  $http.get(url4).success(
                function(response2){
                  if(response2.status==1){
                  bag2=response2.info[0].count;
                }
                });


             $state.go('notification',{'term':$scope.username,'bag1':bag1,'bag2':bag2});
           }


}])

.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
 

}])

.controller('timelineCtrl', ['$scope', '$stateParams', '$http','$state', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$ionicPopup) {
$state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
  $http.get("http://idonate.000webhostapp.com/server/getPost.php").success(
      function(response){
        $scope.acc=response;
      });
  $scope.username=$stateParams.user;


}])

.controller('bloodRequestCtrl', ['$scope', '$stateParams','$http','$state', '$ionicPopup', '$timeout','$cordovaSocialSharing', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$ionicPopup,$timeout,$cordovaSocialSharing) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
      $scope.user=$stateParams.user;
      var lat=null;
      var lng=null;
      var mapCanvas = document.getElementById("map");
      var myCenter=new google.maps.LatLng(7.20,80.6);
      var mapOptions = {center: myCenter, zoom: 7};
      var map = new google.maps.Map(mapCanvas, mapOptions);
      google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(map, event.latLng);

      });


    function placeMarker(map, location) {
      var city=null;
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      lat=location.lat();
      lng=location.lng();
      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
      });
      infowindow.open(map,marker);
      var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
            if (results[1]) {
             //formatted address
             $('#location').html(results[0].formatted_address)
            //find country name
                 for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {

                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        city= results[0].address_components[i];
                        break;
                    }
                }
            }



            } else {
             $('#location').html("No results found");
            }
          } else {
            $('#location').html("Geocoder failed due to: " + status);
          }
        });

    }



    $('#bloodRequest-button15').click(function(){
      //var addAsDonorInput31=$scope.addAsDonorInput31;

      var group=$('#bloodRequest_select1').val();
      var type=$('#bloodRequest_select2').val();

      

      //var data="addAsDonorInput31="+addAsDonorInput31;
      if(group == '' || type==''|| lat==null ||lng==null ){
        
        $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Required',
               template: 'All fields are required'
             });
           }
      }
      else{

         $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Confirm',
               template: 'Your request will send to relavent donors and You will recive notification'
             });

             confirmPopup.then(function(res) {
               if(res) {

                     $.ajax({
                      type:"POST",
                      url:"http://idonate.000webhostapp.com/server/bloodRequest.php",
                      data:{userid:$scope.user,bloodRequest_select1:group,bloodRequest_select2:type,Location:lat,Location2:lng},
                      cache:false,
                      success:function(result){
                        if(result == 'No Eligible Donors Found'){
                          var confirmPopup = $ionicPopup.confirm({
                           title: 'Error loading, please retry',
                           template: 'No Eligible Donors Found'
                         });

                        }else{
                            window.plugins.socialsharing
                        .shareViaSMS('You have new notifications in the IDOnate app.You will need to use app to see and respond them.', result)

                        }
                       
                      }
                    })


               } else {
                 console.log('You are not sure');
               }
             });
           };
       
      }

  });


}])

.controller('addPostCtrl', ['$scope', '$stateParams','$http','$state','$ionicPopup','$timeout','$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$ionicPopup,$timeout,$ionicHistory) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
  $scope.userid=$stateParams.user;
  $('#addPost-button8').click(function(){
      //var addAsDonorInput31=$scope.addAsDonorInput31;
      
      var vanue=$('#addPost-input11').val();
      var date=$('#addPost-input12').val();
      var time_f=$('#addPost-input16').val();
      var time_t=$('#addPost-input18').val();
      var description=$('#addPost-input19').val();
      var contact=$('#addPost-input21').val();
       if(vanue =='' || date=='' || time_f=='' || time_t=='' || description=='' || contact=='' ){
      
        $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Required',
               template: 'All fields are required without image'
             });
           }
      }else{ 
       
       $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Confirm',
               template: 'Confirm to post this'
             });

             confirmPopup.then(function(res) {
                $.ajax({
                      type:"POST",
                      url:"http://idonate.000webhostapp.com/server/addPost.php",
                      data:{user:$stateParams.user,input_vanue:vanue,input_date:date,input_timeF:time_f,input_timeT:time_t,input_desc:description,input_contact:contact},
                      cache:false,
                      success:function(result){
                        alert(result);
                         $state.transitionTo('timeline', {}, { reload: 'timeline'});

                       
                      }
                 }) 
             });
           };



         
    }





      })
 

}])

.controller('searchBloodBankCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('bloodCompatibilityCtrl',['$scope','$state', '$stateParams','$cordovaSocialSharing','$cordovaCamera', '$cordovaFile', '$cordovaFileTransfer', '$cordovaDevice', '$ionicPopup', '$cordovaActionSheet',

function($scope,$state,$stateParams, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
  $scope.image = null;
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
   // Present Actionsheet for switch beteen Camera / Library
// Present Actionsheet for switch beteen Camera / Library
 document.addEventListener("deviceready", function() {  // Present Actionsheet for switch beteen Camera / Library
$scope.loadImage = function() { 
  var options = {
    title: 'Select Image Source',
    buttonLabels: ['Load Library', 'Use Camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
    window.plugins.actionsheet.show(options,function(btnIndex) {
    
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      
      $scope.selectPicture(type);

    }else{
      
    }
  });
};
})

// Take image with the camera or from library and store it inside the app folder
// Image will not be saved to users Library.
$scope.selectPicture = function(sourceType){
 
  navigator.camera.getPicture(onSuccess, onFail, {
                
                  quality: 100,
                  destinationType: Camera.DestinationType.FILE_URI,
                  sourceType: sourceType,
                  saveToPhotoAlbum: false
                
            });


        function onSuccess(imagePath) {
          
                        // Grab the file name of the photo in the temporary directory
              var currentName = imagePath.replace(/^.*[\\\/]/, '');
           
              //Create a new name for the photo
              var d = new Date(),
              n = d.getTime(),
              newFileName =  n + ".jpg";
           
              // If you are trying to load image from the gallery on Android we need special treatment!
              if (device.platform == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                
                window.FilePath.resolveNativePath(imagePath, function(entry) {
                  
                  window.resolveLocalFileSystemURL(entry, copyFile, fail);
                  
                  function fail(e) {
                    alert(e);
                    console.error('Error: ', e);
                  }
                    function copyFile(fileEntry) {
                          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                          
                          window.resolveLocalFileSystemURL(
                            cordova.file.dataDirectory, 
                            function(namePath) {
                              fileEntry.copyTo(
                                namePath, 
                                newFileName, 
                                onCopySuccess, 
                                fail
                              );

                            }, 
                            fail
                          ); 
                        }
                              function onCopySuccess(entry) {
                                  
                                  $scope.image = newFileName;
                                  pathForImage(image);
                                }

                                function fail(error) {
                                  $scope.showAlert('Error', error.exception);
                                }
                }
              );
              } else {
                
                var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                window.FilePath.resolveNativePath(imagePath, function(entry) {
                window.resolveLocalFileSystemURL(entry, moveFile, fail);
                  
                  function fail(e) {
                    alert(e);
                    console.error('Error: ', e);
                  }
                    function moveFile(fileEntry) {
                           
                          
                          window.resolveLocalFileSystemURL(
                            cordova.file.dataDirectory, 
                            function(namePath) {
                              
                              fileEntry.moveTo(
                                namePath, 
                                newFileName, 
                                onCopySuccess, 
                                fail
                              );

                            }, 
                            fail
                          ); 
                        }
                              function onCopySuccess(entry) {
                                  
                                  $scope.image = newFileName;
                                  pathForImage(image);
                                }

                                function fail(error) {
                                  $scope.showAlert('Error', error.exception);
                                }
              });
                // Move the file to permanent storage
               
              }

        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
  
};

// Returns the local path inside the app for an image
function  pathForImage(image) {
  if (image === null) {
    $scope.src='None';
  } else {
    $scope.src=cordova.file.dataDirectory + image;
  }
};

$scope.uploadImage = function() {
  // Destination URL
  var url = "http://idonate.000webhostapp.com/server/upload.php";
 
  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);
 
  // File name only
  var filename = $scope.image;;
 
 

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName="filename";
    options.chunkedMode = false;
    options.mimeType="multipart/form-data";
    var params = {};
    params.fileName = filename;
    options.params = params;

    var ft = new FileTransfer();

    ft.upload(targetPath, encodeURI(url), function(e){
          $ionicLoading.hide();
          alert("upload success!");
        },
        function(e){
          $ionicLoading.hide();
          alert("Upload failed!");
        }, options)




}




}])

.controller('reportUserCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('addAsDonorCtrl', ['$scope', '$state','$stateParams', '$cordovaGeolocation','$http','$state', '$ionicPopup', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName



function ($scope,$state, $stateParams,$cordovaGeolocation,$http,$state,$ionicPopup,$timeout) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
  var options={timeout:1000, enableHighAccuracy: false};
  var geocoder;
  var lat;
  var lng;
  $scope.locationmodel="GeoLocation";
   var userid=$stateParams.user;
  $scope.locationChange = function (locationmodel) {

    if(locationmodel=="Set Location"){
      $('#location').html("Please, Select your location");
      var mapCanvas = document.getElementById("getmap");
      var myCenter=new google.maps.LatLng(7.20,80.6);
      var mapOptions = {center: myCenter, zoom: 7};
      var map = new google.maps.Map(mapCanvas, mapOptions);
      google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(map, event.latLng);

      });


    }else{
      codeLatLng(lat,lng);
    }

    };

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  var latlong=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  lat=position.coords.latitude;
  lng=position.coords.longitude;
  codeLatLng(lat,lng);


   })
   function codeLatLng(lat, lng) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         $('#location').html(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }



        } else {
         $('#location').html("No results found");
        }
      } else {
        $('#location').html("Geocoder failed due to: " + status);
      }
    });
  }


    function placeMarker(map, location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      lat=location.lat();
      lng=location.lng();
      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
      });
      infowindow.open(map,marker);
      var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
            if (results[1]) {
             //formatted address
             $('#location').html(results[0].formatted_address)
            //find country name
                 for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {

                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        city= results[0].address_components[i];
                        break;
                    }
                }
            }



            } else {
             $('#location').html("No results found");
            }
          } else {
            $('#location').html("Geocoder failed due to: " + status);
          }
        });

    }


	$('#addAsDonor-button29').click(function(){
			//var addAsDonorInput31=$scope.addAsDonorInput31;

			var nic=$('#addAsDonorInput31').val();
      var gender=$('#addAsDonor_select2').val();
      var blood=$('#addAsDonor_select3').val();
      myRegExp = new RegExp(/^[0-9]{9}[vVxX]$/);
      if(!(myRegExp.test(nic)))
      {
     
     $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Invalid NIC',
               template: 'Please check your NIC number!'
             });
           }
          
      }else{

			//var data="addAsDonorInput31="+addAsDonorInput31;
			if(nic == '' || gender==''|| blood=='' ){
				$('#response').html('Required');
			}
			else{

				$.ajax({
          type:"POST",
          url:"http://idonate.000webhostapp.com/server/addAsDonor.php",
          data:{user:userid,addAsDonorInput31:nic,addAsDonor_select2:gender,addAsDonor_select3:blood,Location:lat,Location2:lng},
          cache:false,
          success:function(result){
           
            if(result=="Next"){
               $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Confirm',
               template: 'Next step'
             });

             confirmPopup.then(function(res) {
              $state.go('addAsDonor2',{'term':nic}); 
             });
           };
              
            }else{
               $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Something do worng!',
               template: 'you already register as a donor'
             });

             confirmPopup.then(function(res) {
              $state.go('iDonate2');
             });
           };
              
            
             }


          }
        })
			}
    }
	});



}])

.controller('addAsDonor2Ctrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
  $('#addAsDonor2-button31').click(function(){
      //var addAsDonorInput31=$scope.addAsDonorInput31;

      var date=$('#addAsDonor2_input35').val();
      var no=$('#addAsDonor2_input36').val();
      var nic=$stateParams.term;


        $.ajax({
          type:"POST",
          url:"http://idonate.000webhostapp.com/server/addAsDonor2.php",
          data:{addAsDonor2_input35:date,addAsDonor2_input36:no,Nic:nic},
          cache:false,
          success:function(result){
            alert(result);
            if(result=="Done"){$state.go('iDonate2');}
            else{$state.go('addAsDonor2');}


          }
        })

  });

}])

.controller('addAsDonor3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.userid=$stateParams.user;


}])
 .controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('viewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('remindersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('statusCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('editProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
.controller('MapController', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var srilanka = {lat: 7.20, lng: 80.7718};
  var point={lat: 8.3114, lng: 80.4037};
  var point2={lat: 6.9271, lng: 79.8612};
        // Create a map object and specify the DOM element for display.
        var mapOption = new google.maps.Map(document.getElementById('map'), {
          center: srilanka,
          scrollwheel: false,
          zoom: 7
        });
        // Create a marker and set its position.
        var marker = new google.maps.Marker({
          map: mapOption,
          position: point,
          title: 'Hello World!'
        });
        var marker2 = new google.maps.Marker({
          map: mapOption,
          position: point2,
          title: 'Hello World!'
        });
        $scope.map=new google.maps.Map(document.getElementById("map"),mapOption);


}])
.controller('GetMapController', ['$scope', '$stateParams', '$cordovaGeolocation',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope,$stateParams,$cordovaGeolocation){

var options={timeout:1000, enableHighAccuracy: false};
$cordovaGeolocation.getCurrentPosition(options).then(function(position){
  var latlong=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  var lat=position.coords.latitude;
  var lng=position.coords.longitude;

    var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  var mapOption =  {
          center: latlong,
          zoom: 15,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };


        var map=new google.maps.Map(document.getElementById("getmap"),mapOption);
        $scope.map;
        var userMarker = new google.maps.Marker({
            position: latlong,
            map: map,
            icon: image
        });

      },
      function(error)
      {
        console.log();
      }




)
}])
.controller('NotificationController', ['$scope','$state', '$stateParams','$http', '$ionicPlatform', '$cordovaBadge','$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope,$state,$stateParams,$http, $ionicPlatform, $cordovaBadge,$timeout) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
    $scope.user=$stateParams.user;

      var user_id=$stateParams.term;
      var url="http://idonate.000webhostapp.com/server/getNotification.php?user="+user_id;
      var url2="http://idonate.000webhostapp.com/server/getNotification2.php?user="+user_id;
     

     
       
        $scope.bagreq=$stateParams.bag1;
       
        $scope.bagacc=$stateParams.bag2;
      
      
     
      $scope.requestSelected = false;
      $scope.acceptSelected = false;
      $scope.verifySelected = false;
      $scope.reminderSelected = false;

  $scope.req_select = function () {
    $scope.requestSelected = true;
    $scope.acceptSelected = null;
    $scope.verifySelected = null;
    $scope.reminderSelected = null;
     $timeout(function(){
        $http.get(url2).success(
      function(response2){
        $scope.acc=response2;
      });
      }, 10);
  }
   $scope.acc_select = function () {
   $scope.requestSelected = null;
    $scope.acceptSelected = true;
    $scope.verifySelected = null;
    $scope.reminderSelected = null;
    $timeout(function(){
     $http.get(url).success(
      function(response){
        $scope.items=response;
      });
     }, 10);
  }
   $scope.ver_select = function () {
    $scope.requestSelected = null;
    $scope.acceptSelected = null;
    $scope.verifySelected = true;
    $scope.reminderSelected = null;
    
  }
   $scope.rem_select = function () {
    $scope.requestSelected = null;
    $scope.acceptSelected = null;
    $scope.verifySelected = null;
    $scope.reminderSelected = true;
    
  }


  $scope.goBack = function () {
     $scope.requestSelected = false;
      $scope.acceptSelected = false;
      $scope.verifySelected = false;
      $scope.reminderSelected = false;
      $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
      $scope.bagreq=0;

  }
   $scope.goBack1 = function () {
     $scope.requestSelected = false;
      $scope.acceptSelected = false;
      $scope.verifySelected = false;
      $scope.reminderSelected = false;
      $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
      $scope.bagacc=0;
  }
  $scope.undo = function (no) {
     $.ajax({
                type:"POST",
                url:"http://idonate.000webhostapp.com/server/undo.php",
                data:{No:no},
                cache:false,
                success:function(result){
                  
                  }
                });

     
  }








}])

.controller('contactDonorCtrl', ['$scope', '$stateParams', '$http','$state', '$ionicPopup', '$timeout','$cordovaSocialSharing', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state, $ionicPopup,$cordovaSocialSharing, $timeout) {
    $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
    var No=$stateParams.term;
    $scope.user=$stateParams.user;
    $scope.phone='+000,000,000';
    
           
             $scope.getnum=function(){
               $.ajax({
                type:"POST",
                url:"http://idonate.000webhostapp.com/server/sms.php",
                data:{user_id:$scope.user},
                cache:false,
                success:function(result){
                  $scope.phone=result;
                   $scope.sendSMS = function(number) {
                           
                          window.plugins.socialsharing
                          .shareViaSMS('',number)
            
               
                       }
                  }
                });
             }
               
           

              



     




}])

.controller('bloodRequestnotCtrl', ['$scope', '$stateParams', '$http','$state', '$ionicPopup', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state, $ionicPopup, $timeout) {
  $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false});
    var user="";
    var No=$stateParams.term;
    
    var url="http://idonate.000webhostapp.com/server/notification.php?no="+No;
            $http.get(url).success(
            function(response){
             $scope.items=response;
              var lat = response.info[0].lat;
              var long= response.info[0].long;
              user= response.info[0].user;
              var point={lat:Number(lat), lng:Number(long) };

              // Create a map object and specify the DOM element for display.
              var mapOption = new google.maps.Map(document.getElementById('map'), {
                center: point,
                scrollwheel: false,
                zoom: 10
              });
              // Create a marker and set its position.
              var marker = new google.maps.Marker({
                map: mapOption,
                position: point,
                title: 'Patient is here'
              });

              $scope.map=new google.maps.Map(document.getElementById("map"),mapOption);
              var geocoder = new google.maps.Geocoder();
                  var latlng = new google.maps.LatLng(Number(lat), Number(long));
                  geocoder.geocode({'latLng': latlng}, function(results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                      console.log(results)
                        if (results[1]) {
                         //formatted address
                         $('#location').html(results[0].formatted_address)
                        //find country name
                             for (var i=0; i<results[0].address_components.length; i++) {
                            for (var b=0;b<results[0].address_components[i].types.length;b++) {

                            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                    //this is the object you are looking for
                                    city= results[0].address_components[i];
                                    break;
                                }
                            }
                        }



                        } else {
                         $('#location').html("No results found");
                        }
                      } else {
                        $('#location').html("Geocoder failed due to: " + status);
                      }
                    });

            } )


             $('#bloodRequestnot-button17').click(function(){
              $state.go('notification',{'term':user});
             })




             $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Confirm',
               template: 'Are you sure you want to accept this?'
             });

             confirmPopup.then(function(res) {
               if(res) {
                
                
                

                      $.ajax({
                        type:"POST",
                        url:"http://idonate.000webhostapp.com/server/accept.php",
                        data:{no:No},
                        cache:false,
                        success:function(result){
      

                          if(result=="Done"){$state.go('notification',{'user':user}, { reload: true });}
                          else{$state.go('bloodRequestnot',{'term':No});}


                        }
                      })


               } else {
                 console.log('You are not sure');
               }
             });
           };




}])

.controller('candonateCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  $scope.bloodTypes = {
    "A+" : { "give" : ["A+", "AB+"], "get" : ["A+", "A-", "O+", "O-"] },
    "O+" : { "give" : ["O+", "A+", "B+", "AB+"], "get" : ["O+", "O-"] },
    "B+" : { "give" : ["B+", "AB+"], "get" : ["B+", "B-", "O+", "O-"] },
    "AB+" : { "give" : ["AB+"], "get" : ["Everyone"] },
    "A-" : { "give" : ["A+", "A-", "AB+", "AB-"], "get" : ["A-", "O-"] },
    "O-" : { "give" : ["Everyone"], "get" : ["O-"] },
    "B-" : { "give" : ["B+", "B-", "AB+", "AB-"], "get" : ["B-", "O-"] },
    "AB-" : { "give" : ["AB+", "AB-"], "get" : ["AB-", "A-", "B-", "O-"] }
  };

  $scope.bloodSelected = false;
  $scope.currentBloodGroups = null;

  $scope.checkBlood = function (selectedBlood) {
    if (typeof selectedBlood != 'undefined') {
      $scope.bloodSelected = selectedBlood;
      $scope.currentBloodGroups = $scope.bloodTypes[selectedBlood];
    }
  }

  $scope.goBack = function () {
    $scope.bloodSelected = false;
  }

  console.log($stateParams);
}])

.controller('verifiedStatusCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
.controller('SignInCtrl', function($scope, SignInService, $ionicPopup, $state) {
    $scope.loadsignup = function() {
        $state.go('signup');
    }
    $scope.data = {};
    $scope.login = function() {
  if($scope.data.username == undefined || $scope.data.mobilenumber == undefined){
    var alertPopup = $ionicPopup.alert({
        title: 'Reqired!',
        template: 'Please enter your credentials!'
    });
  }else{
    SignInService.login($scope.data.username, $scope.data.mobilenumber).success(function(data) {
        var user=data;
        $state.go('iDonate2', {user:user});
    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
        });
    });
  }
    }
})

.controller('SignUpCtrl', function($scope, SignUpService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.register = function() {
  if($scope.data.username == undefined || $scope.data.mobilenumber == undefined || $scope.data.firstname == undefined || $scope.data.lastname == undefined){
    var alertPopup = $ionicPopup.alert({
        title: 'Reqired!',
        template: 'Please fill in all fields!'
    });
  }else{
    SignUpService.register($scope.data.username, $scope.data.mobilenumber,$scope.data.firstname,$scope.data.lastname).success(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Registration Successful!',
            template: data
        });
        $state.go('signin');
    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Registration Unsuccessful!',
            template: 'There is an account already registered with same credentials!'
        });
    });
  }
    }
})
