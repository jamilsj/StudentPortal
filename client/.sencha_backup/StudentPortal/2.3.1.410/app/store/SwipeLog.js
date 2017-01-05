Ext.define('StudentPortal.store.SwipeLog', {
   extend: 'Ext.data.Store',
   xtype: 'SwipeLog',
   requires: [
      'StudentPortal.model.SwipeLog'
   ],
   config: {
      model: 'StudentPortal.model.SwipeLog',
      storeId: 'swipeLogStore',
      proxy: {
         type: 'ajax',
         autoSync: true,
         autoLoad: true,
         noCache: false,
         startParam: false,
         limitParam: false,
         pageParam: false,
         autoAbort: true,
         url: '/' + tdsGlobal.getDeployContext() + '/studPortalSwipeLogGrid',
         reader: {
            type: 'json',
            rootProperty: 'items'
         },
         listeners: {
            exception: function(proxy, response, operation){
               console.debug('Error loading store SwipeLog',[response, operation]);
            }
         } 
      }
   }
});
