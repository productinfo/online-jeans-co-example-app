require.config({

   packages: [
      {
         name: 'slickgrid',
         main: 'loader'
      },
   ],

   paths: {
      'angular': 'ext/angular-1.6.1.min',
      'jquery': 'ext/jquery-3.1.1.min',
      'slickgrid': 'ext/slickgrid'
   },

   shim: {
      angular: {
         exports: 'angular'
      }
   },

   deps: [
      'bootstrap'
   ]

});
