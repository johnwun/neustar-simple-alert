angular.module('simpleAlert')
.directive('simpleAlert', function(simpleAlertService) {
  return {
     scope: { 
       id:'@' 
    },
    template: '<div class="alert alert-{{msg.type}}" ng-show="msg.message.length">'+
  '<strong ng-show="msg.title.length" ng-bind="msg.title"></strong>'+
  '<p>{{msg.message}}</p>'+
  '<button ng-show="msg.cancelLabel.length" class="btn btn-icon" data-ng-click="cancel()">{{msg.cancelLabel}}</button>'+
  '<button ng-show="msg.okLabel.length" class="btn btn-icon" data-ng-click="clear()">{{msg.okLabel}}</button>'+
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