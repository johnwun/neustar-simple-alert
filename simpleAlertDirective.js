angular.module('simpleAlert')
.directive('simpleAlert', function(simpleAlertService) {
  return {
    restrict: 'E',
     scope: { 
       id:'@' 
       //TODO: add timeout value if auto-timeout
       //TODO: add dismissable flag
    },
    template: '<div class="alert large alert-{{msg.type}} alert-dismissable" ng-show="msg.message.length">'+
  '<h3 ng-show="msg.title.length" ng-bind="msg.title"></h3>'+
  '<p>{{msg.message}}</p>'+
  '<button ng-show="msg.cancelLabel.length" class="btn btn-default" data-ng-click="cancel()">{{msg.cancelLabel}}</button>'+
  '<button ng-show="msg.okLabel.length" class="btn btn-{{msg.type}}" data-ng-click="clear()">{{msg.okLabel}}</button>'+
  '</div>',
    link:function($scope){ 
      $scope.msgObj = simpleAlertService.messages;
      
      // deep watch - can we avoid?
      $scope.$watch('msgObj',function(newVal,oldVal){
         
         // The id here is the key so newVal[id] is an alert config object
        if(newVal[$scope.id] && ! angular.equals(newVal[$scope.id],oldVal[$scope.id])){ 
        $scope.msg = newVal[$scope.id];
        }
      },true);
     
      $scope.clear = function(){ 
        //removes the  message  and trigger the success handler
        simpleAlertService.clearById($scope.id);  
      };
      
      $scope.cancel = function(){ 
        //removes the  message and trigger the cancel handler
        simpleAlertService.cancelById($scope.id); 
      };
      
      $scope.$on('$destroy', function() {
           simpleAlertService.removeById($scope.id); 
      });
      
    }
  };
});