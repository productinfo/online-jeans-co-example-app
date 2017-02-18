define([
   '../application',
   '../services/report-service'
], function (
   application
) {

   application.controller('reportController', function (reportService) {

      var self = this;

      self.report = null;

      this.selectReport = function (report) {
         reportService.loadReport(report).then(function (data) {

            self.report = Object.assign(report, {
               content: data,
               columns: report.columns.concat({
                  label: 'Count',
                  field: 'total'
               })
            });

         });
      };

      reportService.loadReportTypes()
         .then(function (reportTypes) {
            self.reportTypes = reportTypes;
         });

      this.reportTypes = [
         {
            name: 'Manufacturers by Gender',
            url: '/api/manufacturers',
            expand: 'gender',
            columns: [
               {
                  label: 'Manufacturer',
                  field: 'name'
               },
               {
                  label: 'Gender',
                  field: 'gender'
               }
            ],
            sort: 'gender'
         },
         {
            name: 'Manufacturers by Country',
            url: '/api/manufacturers',
            expand: 'deliveryCountry',
            columns: [
               {
                  label: 'Manufacturer',
                  field: 'name'
               },
               {
                  label: 'Country',
                  field: 'deliveryCountry'
               }
            ],
            sort: 'deliveryCountry'
         },
         {
            name: 'Sizes by Country',
            url: '/api/sizes',
            sort: 'deliveryCountry'
         },
         {
            name: 'Months by Country',
            url: '/api/months',
            sort: 'deliveryCountry'
         },
         {
            name: 'Months Globally',
            url: '/api/months',
            sort: 'total'
         }
      ]

   })

});
