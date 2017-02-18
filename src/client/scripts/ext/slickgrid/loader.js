define(['require', 'module', 'jquery'], function (require, module, jquery) {

   this.jQuery = jquery;

   jQuery.fn.drag = function () {
      // ignored in this POC
   };

   var loader = [ 'slickgrid/slick.core', 'slickgrid/slick.grid', 'slickgrid/slick.dataview' ]
      .reduce(function (chain, path) {
         return chain.then(function () {
            return new Promise(function (resolve) {
              require([].concat(path), resolve);
            });
         })
      }, Promise.resolve())
      .then(function () {
         loader = null;
      });

   return function slickGridFactory (selector, data, columns, options) {
      if (loader) {
         return loader.then(function () {
            return slickGridFactory(selector, data, columns, options);
         });
      }

      let dataView = new Slick.Data.DataView([]);
      let slickGrid = new window.Slick.Grid(selector, dataView, columns, options);

      dataView.onRowCountChanged.subscribe(function (e, args) {
         slickGrid.updateRowCount();
         slickGrid.render();
      });

      dataView.onRowsChanged.subscribe(function (e, args) {
         slickGrid.invalidateRows(args.rows);
         slickGrid.render();
      });

      slickGrid.onSort.subscribe(function (e, args) {
         var cols = args.sortCols || [{
               sortCol: args.sortCol,
               sortAsc: args.sortAsc
            }];
         var sortedFields = cols.length;

         dataView.sort(function (A, B) {
            var result, a, b, field, sign;

            for (var i = 0; i < sortedFields; i++) {
               field = cols[i].sortCol.field;
               sign = cols[i].sortAsc ? 1 : -1;

               a = A[field];
               b = B[field];
               if (result = (a == b ? 0 : (a > b ? 1 : -1))) {
                  return result * sign;
               }
            }
            return 0;
         });
      });

      dataView.setItems(data);

      return Promise.resolve( slickGrid );

   };


});
