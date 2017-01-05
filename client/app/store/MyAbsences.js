Ext.define('StudentPortal.store.MyAbsences', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.Absence'
   ],
   config: {
      storeId: 'myabsences',
      model: 'StudentPortal.model.Absence',
      proxy: {
         type: 'ajax',
         autoLoad: false,
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/absenceGrid',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         headers: {
            "DateTimeFormat": 'MM/DD/YYYY HH12:MI AM'            
         },         
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store AbsenceReason',[response, operation]);
            }
         } 
      }
   }
});
