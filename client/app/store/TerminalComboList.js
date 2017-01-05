Ext.define('StudentPortal.store.TerminalComboList', {
   extend: 'Ext.data.Store',
   requires: [
      'StudentPortal.model.TerminalComboList'
   ],
   config: {
      storeId: 'terminalComboList',
      model: 'StudentPortal.model.TerminalComboList',
      proxy: {
         type: 'ajax',
         autoLoad: true,
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/terminalComboList',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store terminalComboList',[response, operation]);
            }
         } 
      }
   }
});