describe('localreads', function () {
    var scope,
    controller;
    beforeEach(angular.mock.module('localreads'));

    describe('SearchCtrl',
        function () {
            beforeEach(angular.mock.inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('SearchCtrl', {'$scope': scope });
            }));

            it('sets the name', function () {
                expect(scope.counter).toBe(0);
            });
    });

});
