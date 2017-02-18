define([
   'angular',
   './constants',
   './application',
   './controllers/report-controller',
   './directives/slick-grid',
], function (
   angular,
   constants
) {

   angular.bootstrap(document.body, [constants.ANGULAR_MODULE_NAME]);

});
