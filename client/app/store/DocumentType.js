Ext.define('StudentPortal.store.DocumentType', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.DocumentType'
   ],
   config: {
      storeId: 'documentType',
      model: 'StudentPortal.model.DocumentType',
      proxy: {
         type: 'ajax',
         autoLoad: true,
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/documentTypeCombo',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store DocumentType',[response, operation]);
            }
         } 
      }
   }
});
