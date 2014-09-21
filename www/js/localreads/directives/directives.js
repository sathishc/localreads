
var localReadsDirectives = angular.module('localreads.directives', []);
localReadsDirectives.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});


localReadsDirectives.directive('googleplace',function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {

            var options = {
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {

                var placeObject = scope.gPlace.getPlace();
                scope.userModel.user.latitude = placeObject.geometry.location.lat();
                scope.userModel.user.longitude = placeObject.geometry.location.lng();
                scope.settingsModel.placeName = placeObject.formatted_address;



                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });

        }
    };
});

