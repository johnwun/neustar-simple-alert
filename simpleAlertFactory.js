var msg = angular.module('simpleAlert', []);
msg.factory('simpleAlertFactory', function($timeout) {
  var timeoutVar;
  var internal = {
    messages: {},
    default: {
      id: undefined,
      type: 'warning',
      message: '',
      defaultClasses: '', // use this to set site-wide customizations
      // custom
      classes: '',

      //OK is optional
      okLabel: '',
      callback: angular.noop,
      callbackParamsArray: [undefined],

      // cancel is optional
      cancelLabel: '',
      cancelCallback: angular.noop,
      cancelCallbackParamsArray: [undefined],
      title: undefined,
      timeout: 0,
      closeIcon: true,
      closeIconClasses: 'glyphicon glyphicon-remove-sign',
      clickToClose: false
    }
  };

  var show = function(opts) {
    var msg = angular.extend({}, internal.default, opts);
    internal.messages[msg.id] = msg;
  };

  var clearById = function(id) {
    internal.messages[id].callback.apply(this, internal.messages[id].callbackParamsArray);
    internal.messages[id] = {};
    timeoutVar = $timeout(function() {
      delete internal.messages[id];
    }, 0);
  };

  var removeById = function(id) {
    delete internal.messages[id];
  };

  var clearAll = function() {
    angular.forEach(internal.messages, function(value, key) {
      internal.messages[key] = {};
    });

    $timeout(function() {
      angular.forEach(internal.messages, function(value, key) {
        delete internal.messages[key];
      });

    }, 0);


  };

  var cancelById = function(id) {
    internal.messages[id].cancelCallback.apply(this, internal.messages[id].cancelCallbackParamsArray);
    internal.messages[id] = {};
    // delayed delete so everything has a chance to execute.
    timeoutVar = $timeout(function() {
      delete internal.messages[id];
    }, 0);

  };

  var setDefault = function(key, newDefault) {
    internal.default[key] = newDefault;
  };
  return {
    setDefault: setDefault,
    show: show,
    cancelById: cancelById,
    clearById: clearById,
    removeById: removeById,
    clearAll: clearAll,
    messages: internal.messages
  };

});
