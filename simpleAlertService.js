var msg = angular.module('simpleAlert', []);
msg.service('simpleAlertService', function() {
  
  var internal = {
    messages:{},
    default:{
      id:undefined,
      type:'warning', 
      message:'', 
      
      //OK is optional
      okLabel:'OK',
      callback:angular.noop,
      callbackParamsArray:[undefined],
      
      // cancel is optional
      cancelLabel:'',
      cancelCallback:angular.noop,
      cancelCallbackParamsArray:[undefined],
      title:undefined,

      closeIcon:false,
      clickToClose:false
    }
  }; 
   
  var show = function(opts){ 
    var msg = angular.extend({},internal.default, opts);
    internal.messages[msg.id] = msg; 
  };
  
  var clearById = function(id){ 
    internal.messages[id].callback.apply(this,internal.messages[id].callbackParamsArray);
    // NOTE: This successfully blanks the value, but fails to 
    // reset it to it's original undefined state
    // if used across a large application it will lead to an
    // empty objects stored in the service for each alert in the app.
    //
    // To prevent this (and to prevent errors from crossing page boundaries, 
    // we call the remove function inside the directives destroy function.
    internal.messages[id] = {};
  };
  
  var removeById = function(id){
    delete internal.messages[id];
  };
  
  var clearAll = function(){ 
    angular.forEach(internal.messages, function(value, key) { 
      internal.messages[key] = {}; 
    } );
  };
  
  var cancelById = function(id){ 
    internal.messages[id].cancelCallback.apply(this,internal.messages[id].cancelCallbackParamsArray);
    internal.messages[id] = {}; 
  };
  
  return { 
    show:show,
    cancelById:cancelById,
    clearById:clearById,
    removeById:removeById,
    clearAll:clearAll,
    messages:internal.messages
  };
  
});