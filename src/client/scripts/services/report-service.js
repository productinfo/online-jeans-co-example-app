define([
   '../application',
   '../constants'
], function (
   application,
   constants
) {

   function expandReportData (report, data) {
      if (!report.expand) {
         return data.slice(0);
      }

      var result = [];

      data.forEach(function (record) {

         let expansionField = report.expand;
         let expansionItems = record[expansionField];

         Object.keys(expansionItems).forEach(function (expandTo) {
            let expandedItem = Object.assign({}, record);
            expandedItem[expansionField] = expandTo;
            expandedItem.total = expansionItems[expandTo];

            result.push(expandedItem);
         });
      });

      return result;
   }

   function sortReportData (report, data) {
      if (report.sort) {
         var sort = /([\-+])?([a-z]+)/.exec(report.sort);
         var field = sort[2];
         var asc = sort[1] !== '-';

         data.sort(function (A, B) {

            var a = A[report.sort], b = B[report.sort];
            if (a == b) {
               return B.total - A.total;
            }

            return a == b ? 0 : a > b ? 1 : -1;
         });
      }

      return data;
   }

   function uniqueIds (records) {
      return records.map(function (record, index) {
         record.id = index;
         return record;
      });
   }

   function httpData (ajax) {
      return ajax.data;
   }

   application.service('reportService', function ($http) {

      this.loadReport = function loadReport (report) {
         return $http.get(report.url)
            .then(httpData)
            .then(expandReportData.bind(null, report))
            .then(sortReportData.bind(null, report))
            .then(uniqueIds);
      };

      this.loadReportTypes = function loadReportTypes () {
         return $http.get(constants.REPORT_TYPES_URL)
            .then(httpData);
      };

   });

});
