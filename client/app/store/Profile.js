Ext.define('StudentPortal.store.Profile', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.Profile'
   ],
   config: {
      model: 'StudentPortal.model.Profile',
      proxy: {
         type: 'ajax',
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: false,
         url: '/' + tdsGlobal.getDeployContext() + '/studentProfile',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store Profile',[response, operation]);
            }
         }         
      }
   }
});
