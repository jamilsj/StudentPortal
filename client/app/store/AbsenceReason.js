Ext.define('StudentPortal.store.AbsenceReason', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.AbsenceReason'
   ],
   config: {
      storeId: 'absenceReason',
      model: 'StudentPortal.model.AbsenceReason',
      proxy: {
         type: 'ajax',
         autoLoad: true,
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/absenceReason',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store AbsenceReason',[response, operation]);
            }
         } 
      }
   }
});
