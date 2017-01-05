Ext.define('StudentPortal.controller.MyAttendance', {
   extend: 'Ext.app.Controller',
   requires: [
      'StudentPortal.store.MyAttendance'
   ],
   config: {
      refs: {
         myAttendance: 'myattendance',
         myAttListView: 'myattListView',
         myAttDateFrom: '#myAttDateFrom',
         myAttDateTo: '#myAttDateTo',
         datePickerMyAtt: 'myattendance datePickerTds',
         myAttendanceListItem: 'myattendancelistitem',
         myAttendanceDetail: 'myattendancedetail',
         backToMyAttendance: 'myattendancedetail #backToMyAttendance' 
      }
   },

   init: function() {
      var me = this;

      me.control({
         myAttendance: {
            initialize: 'doInitialize',
            show: 'doShow'
         },
         datePickerMyAtt: {
            changeDate: 'doChangeDate'
         },        
         myAttendanceListItem: {
            updatedata: 'updateDataList'
         },
         myAttListView: {
            disclose: 'doDisclose'
         },
         backToMyAttendance: {
            tap: 'doBackToMyAttendance'
         }
      });
   },

   doShow: function () {
      var me = this;
      me.getMyAttendance().setActiveItem(0);
   },
         
   doInitialize: function(obj, eOpts) {
      var me = this;
      me.doChangeDate(obj, null, eOpts);

      var from = new Date();
      var monthFrom = from.getMonth();
      from.setMonth(monthFrom - tdsGlobal.getAttendanceFromMonthsBefore());

      me.getMyAttDateFrom().setValue(from);

      var to = new Date();
      me.getMyAttDateTo().setValue(to);
   },

   doChangeDate: function(obj, newDate, oldDate, eOpts) {
      var me = this;
      
      if ((me.getMyAttDateFrom().getValue()) && (me.getMyAttDateTo().getValue())) {

         var from = me.getMyAttDateFrom().getValue();
         var to = me.getMyAttDateTo().getValue();

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

         me.getMyAttendance().setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
         });

         Ext.create('StudentPortal.store.MyAttendance', {
            params : {
               'query':'%',
               'eventType': false,
               'module':true,
               'course': ' ',
               'from':from,
               'to':to,
               'sort':'module_start_date',
               'dir':'ASC'
            },
            listeners:{
               scope: me,
               load: me.onMyAttendanceLoad
            }
         }).load(); 
      }
   },

   onMyAttendanceLoad: function(store, records, successful, operation, eOpts) {
      var me = this;
      me.getMyAttListView().setStore(store);
      me.getMyAttendance().setMasked(false);
   },

   doDisclose: function ( obj, record, target, index, e, eOpts ) {
      var me = this;
      var mid = record.get('module_id');
      var from = me.getMyAttDateFrom().getValue();
      var to = me.getMyAttDateTo().getValue();      

      me.getMyAttendance().setMasked({
         xtype: 'loadmask',
         message: 'Loading...'
      });

      Ext.create('StudentPortal.store.MyAttendanceDetail', {
         params : {
            'query':'%',
            'mid':mid,
            'from':from,
            'to':to,
            'start':0,
            'limit':10,
            'sort':'module_start_date',
            'dir':'ASC'
         },
         listeners:{
            scope: me,
            load: me.onMyAttendanceDetailLoad
         }
      }).load(); 
   },   

   onMyAttendanceDetailLoad: function(store, records, successful, operation, eOpts) {
      var me = this;
      var myAttendanceDetail = me.getMyAttendanceDetail();
      me.getMyAttendance().setActiveItem(1);
      myAttendanceDetail.setStore(store);
      Ext.Viewport.down('#titlePortal').setText('My Attendance - Detail');
      me.getMyAttendance().setMasked(false);
   },

   doBackToMyAttendance: function () {
      var me = this;
      Ext.Viewport.down('#titlePortal').setText('My Attendance');
      me.getMyAttendance().setActiveItem(0);
   },

   updateDataList: function (obj, newData, eOpts) {
      var me = this;
      if (newData !== null) {

         var tot = newData.total_events;
         var att = newData.attended;
         var chart = obj.down('piechartpanel').down('oc-piechart');

         me.upDateChart(tot,att,chart);      
      }
   },

   upDateChart: function(tot, att, chart){
      var abs = tot - att;
      var obj1 = {label:'Absence', value:abs};
      var obj2 = {label:'Attended', value:att};

      var data = [];      
      data.push(obj1,obj2); 

      var task = setInterval(function(){
           try {
               chart.renderChartData(data);
               clearInterval(task);
          }
          catch (e) {
          }
      }, 20);
   }
});