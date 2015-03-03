angular.module('simpleAlert')
  .directive('simpleAlert', function($timeout, simpleAlertFactory) {
    return {
      restrict: 'E',
      scope: {
        id: '@'
        //TODO: add timeout value if auto-timeout
      },
      template: '<div data-ng-click="clickToClose()" class="alert alert-{{msg.type}} alert-dismissable {{msg.defaultClasses}} {{msg.classes}}" ng-show="msg.message.length">' +
        '<button class="close" data-dismiss="alert" data-ng-click="clear()" ng-show="msg.closeIcon">' +
        '<span class="{{msg.closeIconClasses}}"></span>' +
        '</button>' +
        '<h3 ng-show="msg.title.length" ng-bind="msg.title"></h3>' +
        '<p>{{msg.message}}</p>' +
        '<button ng-show="msg.cancelLabel.length" class="btn btn-default" data-ng-click="cancel()">{{msg.cancelLabel}}</button>' +
        '<button ng-show="msg.okLabel.length" class="btn btn-{{msg.type}}" data-ng-click="clear()">{{msg.okLabel}}</button>' +
        '</div>',
      link: function($scope) {
        var timeoutVar;
        $scope.msgObj = simpleAlertFactory.messages;

        // deep watch - can we avoid?  contains all named alert instances currently in play.
        $scope.$watch('msgObj', function(newVal, oldVal) {
          $timeout.cancel(timeoutVar);
          // The id here is the key so newVal[id] is an alert config object
          if (newVal[$scope.id] && !angular.equals(newVal[$scope.id], oldVal[$scope.id])) {
            $scope.msg = newVal[$scope.id];

            // add a timeout if 'timeout exists on msgObj'
            if (newVal[$scope.id].timeout) {
              timeoutVar = $timeout(function() {
                $scope.clear();
              }, +newVal[$scope.id].timeout);
            }
          }
        }, true);

        $scope.clickToClose = function() {
          if ($scope.msg.clickToClose) {
            $scope.clear();
          }
        };

        $scope.clear = function() {
          $timeout.cancel(timeoutVar);
          //removes the  message  and trigger the success handler
          simpleAlertFactory.clearById($scope.id);

        };

        $scope.cancel = function() {
          //removes the  message and trigger the cancel handler
          simpleAlertFactory.cancelById($scope.id);
        };

        $scope.$on('$destroy', function() {
          $timeout.cancel(timeoutVar);
          simpleAlertFactory.removeById($scope.id);
        });

      }
    };
  });
