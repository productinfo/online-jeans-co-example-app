define([
   'slickgrid',
   '../application',
   '../constants'
], function (
   gridFactory,
   application,
   constants
) {



   application.directive('slickGrid', function () {

      function reconfigure (is, was, scope) {
         scope[constants.GRID_CONTROLLER].reconfigure(scope.columns, scope.content);
      }

      function toGridColumn (input, i, all) {
         return {
            id: input.field,
            field: input.field,
            name: input.label,
            sortable: true
         };
      }

      return {
         restrict: 'AE',
         link: function (s, e, attrs, c) {

            s.$watch('columns', reconfigure);
            s.$watch('content', reconfigure);

         },
         controllerAs: constants.GRID_CONTROLLER,
         controller: function ($element) {

            let builder;

            this.reconfigure = function reconfigure (columns, content) {
               if (!columns || !content) {
                  $element.empty();
                  return;
               }

               if (!builder) {
                  builder = gridFactory(
                     $element,
                     [],
                     [],
                     {
                        enableColumnReorder: false,
                        rowHeight: 24,
                        fullWidthRows: true,
                        forceFitColumns: true
                     });
                  return;
               }

               builder.then(function (grid) {
                  grid.getData().setItems(content);
                  grid.setColumns(columns.map(toGridColumn));
               });

            };

         },
         scope: {
            content: '=*?',
            columns: '=*?'
         }
      };

   });

});
