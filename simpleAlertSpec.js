describe('simpleAlert: Testing', function() {
  var defaultElement, customElement, scope, simpleAlertFactory,
    complexTestData, simpleTestData,
    simpleTitle, simpleText, simpleFunction,
    successParams, failParams;

  // create a default app (container)
  beforeEach(module('simpleAlert'));

  beforeEach(inject(function($rootScope, $compile, _simpleAlertFactory_) {
    scope = $rootScope.$new();
    simpleAlertFactory = _simpleAlertFactory_;
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
    simpleFunction = function(params) {/*no-op*/
    };
    successParams = [1, 2, 3];
    failParams = [-1, -2, -3];

    // --- test data objects ---
    simpleTestData = {message: simpleText};

    complexTestData = {
      id: 'test',
      type: 'info',
      message: 'Complex example demo text',
      okLabel: 'Continue',
      callback: Function,
      callbackParamsArray: [ 1, 2, 3 ],
      cancelLabel: 'Cancel',
      cancelCallback: Function, cancelCallbackParamsArray: [ -1, -2, -3 ],
      title: undefined,
      timeout: 0,
      defaultClasses: "",
      classes: "",
      closeIcon: true,
      closeIconClasses: 'glyphicon glyphicon-remove-sign',
      clickToClose: false };
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

    it("should not have a message value defined before factory call", function() {
      var isolated = defaultElement.isolateScope();
      expect(isolated.msgObj[undefined]).toBeUndefined();
    });

    it("should have a message value defined after factory call", function() {
      simpleAlertFactory.show(simpleTestData);
      var isolated = defaultElement.isolateScope();
      scope.$digest();
      expect(isolated.msgObj[undefined].message).toBe(simpleText);
    });

    it("should not bleed data into a custom alert scope", function() {
      simpleAlertFactory.show(simpleTestData);
      var isolated = defaultElement.isolateScope();
      scope.$digest();
      expect(isolated.msgObj['test']).toBeUndefined();
    });

    it("should not have a message value defined after clear", function() {
      simpleAlertFactory.show(simpleTestData);
      var isolated = defaultElement.isolateScope();

      scope.$digest();
      expect(isolated.msgObj).toBeDefined();
      simpleAlertFactory.clearAll();
      scope.$digest();
      expect(isolated.msgObj[undefined]).toEqual({}); //.toBeUndefined(); 
    });

  });

  describe('a populated default simple alert with complex configuration', function() {

    it("should not have a message value defined before factory call", function() {
      var isolated = customElement.isolateScope();
      expect(isolated.msgObj['test']).toBeUndefined();
    });

    it("should have all custom values defined after factory call", function() {
      simpleAlertFactory.show(complexTestData);
      var isolated = customElement.isolateScope();
      scope.$digest();
      expect(isolated.msgObj['test']).toEqual(complexTestData);
    });

    it("should not bleed data into the default alert scope", function() {
      simpleAlertFactory.show(complexTestData);
      var isolated = defaultElement.isolateScope();
      scope.$digest();
      expect(isolated.msgObj[undefined]).toBeUndefined();
    });
    // spyOn(complexTestData, 'callback'); expect to have been called with...
    // 
  });
  describe('callback handling', function() {
    //spyOn(complexTestData,'callback');
  })
  describe('clearing a simple alert', function() {
  })
  describe('canceling a simple alert', function() {
  })
});
