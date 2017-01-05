Ext.define('StudentPortal.controller.SwipeLog', {
   extend: 'Ext.app.Controller',
   requires: [
      'StudentPortal.store.SwipeLog',
      'StudentPortal.view.SwipeLog',
      'StudentPortal.view.SwipeLogList'
   ],
   config: {
      refs: {
         swipeDateFrom: '#swipeDateFrom',
         swipeDateTo: '#swipeDateTo',
         datePickerSwipeLog: 'swipelog datePickerTds',
         swipeLogList: 'swipeloglist',
         swipelog: 'swipelog'
      }
   },

   init: function() {
      var me = this;
      me.control({
         datePickerSwipeLog: {
            changeDate: 'doChangeDate'
         },
         swipeLogList: {
            initialize: 'doInitialize'
         }
      })
   },

   doInitialize: function(obj, eOpts) {
      var me = this;
      me.doChangeDate(obj, null, eOpts);

      var from = new Date();
      var dayFrom = from.getDate();
      from.setDate(dayFrom - tdsGlobal.getSwipeLogFromDaysBefore());

      me.getSwipeDateFrom().setValue(from);

      var to = new Date();
      me.getSwipeDateTo().setValue(to);
   },

   doChangeDate: function(obj, newDate, oldDate, eOpts) {
      var me = this;
      if ((me.getSwipeDateFrom().getValue()) && (me.getSwipeDateTo().getValue())) {

         var from = me.getSwipeDateFrom().getValue();
         var to = me.getSwipeDateTo().getValue();

         if ((newDate) && (oldDate)) {
            if ( from > to ){
               Ext.defer( function() {
                  Ext.Msg.alert(tdsGlobal.getText('invalidParameter'), tdsGlobal.getText('toBeforeFrom'),Ext.emptyFn);
               }, 10 );

               // Disable the events of the obj. 
               obj.suspendEvents();
               
               obj.setValue(oldDate);

               // Enable the events of the obj. 
               obj.resumeEvents(true);
             
               return;
            };
         }

         me.getSwipelog().setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
         });

         Ext.create('StudentPortal.store.SwipeLog', {
            params: {
               'query': '%',
               'mtch': ' ',
               'from': from,
               'to': to,
               'start': 0,
               'limit': 5,
               'sort': 'access_date_time',
               'dir': 'DESC'
            },

            listeners: {
               scope: me,
               load: me.onSwipeLoad
            }
         }).load();
      }
   },

   onSwipeLoad: function(store, records, successful, operation, eOpts) {
      var me = this;
      var swipeLogLst = me.getSwipeLogList();
      swipeLogLst.setStore(store);
      me.getSwipelog().setMasked(false);
   }

});