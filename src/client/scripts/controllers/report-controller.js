define([
   '../application',
   '../services/report-service'
], function (
   application
) {

   application.controller('reportController', function (reportService) {

      var self = this;

      self.report = null;
      self.reportTypes = [];

      self.selectReport = function (report) {
         reportService.loadReport(report).then(function (data) {
            self.report = Object.assign({ content: data }, report);
         });
      };

      reportService.loadReportTypes()
         .then(function (reportTypes) {
            self.reportTypes = reportTypes;
            self.reportTypes.forEach(function (report) {
               report.columns.push({
                  label: 'Count',
                  field: 'total'
               });
            })
         });

   })

});
