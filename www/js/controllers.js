angular.module('app.controllers', ['ngCordova'])
  
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
   
.controller('iDonate2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('timelineCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('bloodRequestCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {

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
      $('#location').html('Latitude: '+lat+'     ,      '+'Longitude:'+lng);
    }

    $('#bloodRequest-button15').click(function(){
      //var addAsDonorInput31=$scope.addAsDonorInput31;
      
      var group=$('#bloodRequest_select1').val();
      var type=$('#bloodRequest_select2').val();
      
      
     
      //var data="addAsDonorInput31="+addAsDonorInput31;
      if(group == '' || type==''|| lat==null ||lng==null ){
        alert('Required');
      }
      else{
        
        $.ajax({
          type:"POST",
          url:"http://127.0.0.1/IDonate/server/bloodRequest.php",
          data:{bloodRequest_select1:group,bloodRequest_select2:type,Location:lat,Location2:lng},
          cache:false,
          success:function(result){
            alert(result);
            if(result=="Your request perfectly send"){ 
              $state.go('iDonate2');
            }else{ $state.go('bloodRequest');}

           
          }
        })
      }
    
  });


}])
   
.controller('addPostCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('searchBloodBankCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('bloodCompatibilityCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('reportUserCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('addAsDonorCtrl', ['$scope', '$stateParams', '$cordovaGeolocation','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName



function ($scope, $stateParams,$cordovaGeolocation,$state) {
  var options={timeout:1000, enableHighAccuracy: false};
  var geocoder;
  var lat;
  var lng;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  var latlong=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  lat=position.coords.latitude;
  lng=position.coords.longitude;
  codeLatLng(lat, lng);
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
   

 

	$('#addAsDonor-button29').click(function(){
			//var addAsDonorInput31=$scope.addAsDonorInput31;
      
			var nic=$('#addAsDonorInput31').val();
      var gender=$('#addAsDonor_select2').val();
      var blood=$('#addAsDonor_select3').val();
      myRegExp = new RegExp(/^[0-9]{9}[vVxX]$/);
      if(!(myRegExp.test(nic)))
      {
          alert("Invalid NIC ");
      }else{
     
			//var data="addAsDonorInput31="+addAsDonorInput31;
			if(nic == '' || gender==''|| blood=='' ){
				$('#response').html('Required');
			}
			else{
        
				$.ajax({
          type:"POST",
          url:"http://127.0.0.1/IDonate/server/addAsDonor.php",
          data:{addAsDonorInput31:nic,addAsDonor_select2:gender,addAsDonor_select3:blood,Location:lat,Location2:lng},
          cache:false,
          success:function(result){
            alert(result);
            if(result=="Next"){ 
              $state.go('addAsDonor2',{'term':nic});
            }else{ $state.go('iDonate2');}

           
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
  $('#addAsDonor2-button31').click(function(){
      //var addAsDonorInput31=$scope.addAsDonorInput31;
      
      var date=$('#addAsDonor2_input35').val();
      var no=$('#addAsDonor2_input36').val();
      var nic=$stateParams.term;
     
        
        $.ajax({
          type:"POST",
          url:"http://127.0.0.1/IDonate/server/addAsDonor2.php",
          data:{addAsDonor2_input35:date,addAsDonor2_input36:no,Nic:nic},
          cache:false,
          success:function(result){
            alert(result);
            $state.go('iDonate2');
          }
        })
    
  });

}])
   
.controller('addAsDonor3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


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
