'use strict';

/* Controllers */

var superCalControllers = angular.module('superCal.controllers', ['ngResource']);

/*superCalControllers.factory("Column", ['$resource',function ($resource) {
    return $resource("http://localhost:8081/supercal/CompareRatePlans", {}, {
        update: {

        }
    });
}]);*/

superCalControllers.controller('MainCtrl', function($scope, myPageCtx) {
  $scope.pageCtx = myPageCtx;
});

superCalControllers.provider('myPageCtx', function() {

  var defaultCtx = {
    title: 'Default Title',
    headerUrl: 'partials/login-header.html',
    footerUrl: 'partials/footer.html',
    loaderUrl: 'partials/loadingBox.html'
  };

  var currentCtx = angular.copy(defaultCtx);

  return {
    $get: function($rootScope) {
      // We probably want to revert back to the default whenever
      // the location is changed.
      $rootScope.$on('$locationChangeStart', function() {
        angular.extend(currentCtx, defaultCtx);
      }); 

      return currentCtx; 
    }
  };
})

superCalControllers.service('sharedProperties', function () {
    var userName = '';
    var fromLogin = false;
    return {
        getUserName: function () {
            return userName;
        },
        setUserName: function(value) {
            userName = value;
        },
        getFromLogin: function() {
            return fromLogin;
        },
        setFromLogin: function(value) {
            fromLogin = value;
        }        
    };
});

superCalControllers.controller('menuHeaderContlr', ['$scope','sharedProperties', function(scope, sharedProperties) {

    console.log('Inside menuHeaderContlr');
    scope.username = 'Signed in as: ' + sharedProperties.getUserName();

}]);
  
superCalControllers.controller('viewRatePlanContlr', ['$scope','sharedProperties','myPageCtx','$http','$sce' ,'$resource', function(scope, sharedProperties, myPageCtx, http, sce, resource) {
    
    console.log('Inside viewRatePlanContlr');
    myPageCtx.headerUrl = 'partials/header.html';
    if(sharedProperties.getUserName() != '' && sharedProperties.getFromLogin() == true) {
        scope.showme = true;
        scope.username = sharedProperties.getUserName();
        sharedProperties.setFromLogin(false);
    }
    
 /*   var User = resource('http://localhost:8081/supercal/ViewRatePlan/GetProducts', {});
    User.get({}, function(user){
	scope.products = user;
    });
    
    scope.products = resource('http://localhost:8081/supercal/ViewRatePlan/GetProducts', {}, {
      query: {method:'GET', params:{}, isArray:true}
    }); */
    
    http.get('http://localhost:8081/supercal/ViewRatePlan/GetProducts').
        success(function(data) {
            scope.products = data;
    });
    
    // get rate plan family based on product Id
    scope.getRatePlanFamilies = function(productId){
        http.get('http://localhost:8081/supercal/ViewRatePlan/LoadRatePlanFamilies?productId='+productId).
            success(function(data) {
                scope.planFamilies = data;
            });
    };
    
    scope.getRatePlans = function(ratePlanFamilyId){
        scope.loading = true;
        http.get('http://localhost:8081/supercal/ViewRatePlans?ratePlanFamilyId='+ratePlanFamilyId).
            success(function(data) {
                scope.ratePlans = data;
                scope.loading = false;
            });
    };
    
    scope.getHTMLContent = function(htmlContent) {
        return sce.trustAsHtml(htmlContent);
    };
        
}]);
  
superCalControllers.controller('compareRatePlanContlr', ['$scope','$http','$resource', '$sce', function(scope, http, resource, sce) {

    console.log('Inside compareRatePlanContlr');
    
    http.get('http://localhost:8081/supercal/ViewRatePlan/GetProducts').
        success(function(data) {
            scope.products = data;
    });
    
    // get rate plan family based on product Id
    scope.getRatePlanFamilies = function(productId){
        http.get('http://localhost:8081/supercal/ViewRatePlan/LoadRatePlanFamilies?productId='+productId).
            success(function(data) {
                scope.planFamilies = data;
            });
    };
    
    scope.getRatePlans = function(ratePlanFamilyId,planNo){
        http.get('http://localhost:8081/supercal/CompareRatePlans/GetRatePlans?ratePlanFamilyId='+ratePlanFamilyId).
            success(function(data) {
                if(planNo == '1')
                    scope.plan1 = data;
                else if (planNo == '2')
                    scope.plan2 = data;
                else if (planNo == '3')
                    scope.plan3 = data;
            });
        };
   
    scope.compRatePlans = function(){
        
        http.get('http://localhost:8081/supercal/CompareRatePlans?ratePlan1Id='+scope.ratePlan1+'&ratePlan2Id='+scope.ratePlan2+'&ratePlan3Id='+scope.ratePlan3).
                success(function(data) {
                    alert(data);
                scope.ratePlans = data;
            });
        };
 
    scope.getHTMLContent = function(htmlContent) {
        return sce.trustAsHtml(htmlContent);
    };
    
}]);
 
superCalControllers.controller('boltOnSearchContlr', ['$scope', function($scope) {

    console.log('Inside boltOnSearchContlr');
}]);

superCalControllers.controller('loginContlr', ['$scope','$location','sharedProperties',function(scope ,location, sharedProperties) {

    console.log('Inside loginContlr');
    scope.submitForm = function() {
              sharedProperties.setUserName(scope.username);
              sharedProperties.setFromLogin(true);
              location.path('/ViewRatePlans');
    };
    
}]);
  
superCalControllers.controller('emailBoltContlr', ['$scope', function($scope) {

    console.log('Inside emailBoltContlr');
}]);
  
superCalControllers.controller('emailChangePlanContlr', ['$scope', function($scope) {

    console.log('Inside emailChangePlanContlr');
}]);
  
superCalControllers.controller('searchEmailContlr', ['$scope', function($scope) {

    console.log('Inside searchEmailContlr');
}]);

superCalControllers.controller('batchSearchEmailContlr', ['$scope', function($scope) {

    console.log('Inside batchSearchEmailContlr');
}]);