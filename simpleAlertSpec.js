describe('simpleAlert: Testing', function() {
  var defaultElement, customElement, scope, simpleAlertService,
    complexTestData, simpleTestData,
    simpleTitle, simpleText,simpleFunction,
    successParams,failParams;
  
  // create a default app (container)
  beforeEach(module('simpleAlert'));
  
  // TODO: this is a temporary hack for testing in plnkr. 
  // Use ng-html2js in prod.
  beforeEach(inject(function($templateCache) {
    var alertTemplate = null;
    var req = new XMLHttpRequest();
    req.onload = function() {
        alertTemplate = this.responseText;
    };
    req.open("get", "alertTemplate.html", false);
    req.send();
    $templateCache.put("alertTemplate.html", alertTemplate);
}));
 
  beforeEach(inject(function($rootScope, $compile, _simpleAlertService_) {
    scope = $rootScope.$new();
    simpleAlertService = _simpleAlertService_;
    defaultElement =
        ' <data-simple-alert></data-simple-alert>';
        
    customElement =
        ' <data-simple-alert id="test"></data-simple-alert>';

    defaultElement = $compile(defaultElement)(scope);  
    customElement = $compile(customElement)(scope);
    scope.$digest();
    
    // --- test data values ---
    simpleText = 'message text';
    simpleTitle = 'title text';
    simpleFunction = function(params){/*no-op*/};
    successParams = [1,2,3];
    failParams = [-1,-2,-3];
    
    // --- test data objects ---
    simpleTestData = {message:simpleText};
    
    complexTestData = { 
      id:'test',
      type:"info",
      title:"Warning:",
      message:'Complex example demo text', 
      cancelLabel:"Cancel",
      cancelCallback:simpleFunction,
      cancelCallbackParamsArray:failParams, 
      okLabel:"Continue",
      callback:simpleFunction,
      callbackParamsArray:successParams
    };
  }));
  
  describe('an empty default simple alert', function() {
    
    it("should have a message Object defined", function() {
      var isolated = defaultElement.isolateScope();  
     expect(isolated.msgObj).toBeDefined(); 
    });
    
    it("should not have a message Object id defined", function() {
      var isolated = defaultElement.isolateScope(); 
     expect(isolated.msgObj.id).toBeUndefined();
    });
  });

  describe('a populated default simple alert with minimal configuration', function() {
    
    it("should not have a message value defined before service call", function() {
      var isolated = defaultElement.isolateScope();  
     expect(isolated.msgObj[undefined]).toBeUndefined(); 
    });
    
    it("should have a message value defined after service call", function() { 
      simpleAlertService.show(simpleTestData);
      var isolated = defaultElement.isolateScope();  
      scope.$digest();
      expect(isolated.msgObj[undefined].message).toBe(simpleText); 
    });
    
    it("should not bleed data into a custom alert scope", function() { 
      simpleAlertService.show(simpleTestData);
      var isolated = defaultElement.isolateScope();  
      scope.$digest();
      expect(isolated.msgObj['test']).toBeUndefined(); 
    });
   /* 
    it("should not have a message value defined after clear", function() {
        simpleAlertService.show(simpleTestData);
        var isolated = defaultElement.isolateScope();  
        scope.$digest();
        expect(isolated.msgObj[undefined].message).toBe(simpleText); 
        scope.clear();
        scope.$digest();
        expect(isolated.msgObj[undefined]).toBeUndefined(); 
    });*/
    
  });
  
  describe('a populated default simple alert with complex configuration', function() {
    
    it("should not have a message value defined before service call", function() {
      var isolated = customElement.isolateScope();  
     expect(isolated.msgObj['test']).toBeUndefined(); 
    });
    
    it("should have all custom values defined after service call", function() { 
      simpleAlertService.show(complexTestData);
      var isolated = customElement.isolateScope();  
      scope.$digest();
      expect(isolated.msgObj['test']).toEqual(complexTestData); 
    });
    
    it("should not bleed data into the default alert scope", function() { 
      simpleAlertService.show(complexTestData);
      var isolated = defaultElement.isolateScope();  
      scope.$digest();
      expect(isolated.msgObj[undefined]).toBeUndefined(); 
    });
     // spyOn(complexTestData, 'callback'); expect to have been called with...
     // 
  });
  describe('callback handling', function() {})
  describe('clearing a simple alert', function() {})
  describe('canceling a simple alert', function() {})
});