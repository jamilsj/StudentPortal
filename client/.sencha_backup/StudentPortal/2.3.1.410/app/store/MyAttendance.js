Ext.define('StudentPortal.store.MyAttendance', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.MyAttendance'
   ],
   config: {
      model: 'StudentPortal.model.MyAttendance',
      storeId: 'myAttendance',
      proxy: {
         type: 'ajax',
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/studPortalModAttGrid',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store MyAttendance',[response, operation]);
            }
         } 
      }
   }
});

