Ext.define('StudentPortal.store.MyAttendanceDetail', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.MyAttendanceDetail'
   ],
   config: {
      model: 'StudentPortal.model.MyAttendanceDetail',
      storeId: 'myAttendanceDetail',
      proxy: {
         type: 'ajax',
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/studPortalAttGrid',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store MyAttendanceDetail',[response, operation]);
            }
         } 
      }
   }
});
