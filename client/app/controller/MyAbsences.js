Ext.define('StudentPortal.controller.MyAbsences', {
   extend: 'Ext.app.Controller',
   requires: [
      'StudentPortal.store.MyAbsences',
      'StudentPortal.store.AbsenceReason',
      'StudentPortal.custom.AbsenceLegend',
      'Ext.ProgressIndicator'
   ],   
   config: {
      refs: {
         myAbsences: 'myabsences',
         myAbsencesListView: 'myabsenceslistview',
         myAbsencesAdd: 'myabsenceslist #absenceAdd',
         myAbsencesLegend: 'myabsenceslist #showLegend',
         absenceLegend: 'absencelegend',
         myAbsencesEdit: 'myabsenceslistinneritem #absenceEdit',
         myAbsencesDelete: 'myabsenceslistinneritem #absenceDelete',
         datePickerMyAbs: 'myabsenceslist datePickerTds',
         myAbsencesSave: 'myabsences #save',
         myAbsencesReset: 'myabsences #reset',         
         backToMyAbsences: 'myabsencesform #backToMyAbsences',
         myAbsencesForm: 'myabsencesform'
      }
   },
   
   myAbsencesStore: {},

   init: function() {
      var me = this;
      me.control({
         myAbsences: {
            initialize: 'doIniMyAbsences',
            show: 'doShow'
         },
         datePickerMyAbs: {
            changeDate: 'doChangeDate'
         },         
         myAbsencesAdd: {
            tap: 'doMyAbsencesAdd'
         },
         myAbsencesEdit: {
            tap: 'doMyAbsencesEdit'
         },
         myAbsencesDelete: {
            tap: 'doMyAbsencesConfirmDelete'
         },
         myAbsencesForm: {
            activate: 'doAbsenceFormActivate'
         },         
         myAbsencesSave: {
            tap: 'doSave'
         },
         myAbsencesReset: {
            tap: 'doReset'
         },
         backToMyAbsences: {
            tap: 'doBackToMyAbsences'
         },
         myAbsencesLegend: {
            tap: 'doMyAbsencesLegend'
         }
      });

      me.myAbsencesStore = Ext.create('StudentPortal.store.MyAbsences', {
         params : {
            'student': StudentPortal.global.Util.getUserCookie('pcode')
         },
         listeners:{
            scope: me,
            load: me.onMyAbsences
         }
      });
   },
  

   doMyAbsencesLegend: function (obj) {
      var me = this;
      var absenceLegendPanel = me.getAbsenceLegend();
      absenceLegendPanel.showBy(obj);
      absenceLegendPanel.show();       
   },

   // events from Absence LIST ********************************************************************
   doShow: function () {
      var me = this;
      
      me.getMyAbsences().setActiveItem(0);
      me.doChangeDate();
   },

   doIniMyAbsences: function(item, e, eOpts) {
      Ext.create('StudentPortal.custom.AbsenceLegend');

      var me = this;

      var from = new Date();
      var monthFrom = from.getMonth();
      from.setMonth(monthFrom - tdsGlobal.getAbsenceFromMonthsBefore());
      me.getMyAbsences().down('#myAbsencesDateFrom').setValue(from);

      var to = new Date();
      me.getMyAbsences().down('#myAbsencesDateTo').setValue(to);

      localStorage.setItem("absenceLocalStorage", "");
   },

   doChangeDate: function(obj, newDate, oldDate, eOpts) {
      var me = this;

      var from = me.getMyAbsences().down('#myAbsencesDateFrom').getValue();
      var to = me.getMyAbsences().down('#myAbsencesDateTo').getValue();

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

      if (from && to) {
         me.loadMyAbsences(from, to);
      }
   },

   loadMyAbsences: function(from, to) {
      var me = this;

      me.getMyAbsences().setMasked({
         xtype: 'loadmask',
         message: 'Loading...'
      });      

      from.setHours(0); 
      from.setMinutes(0);

      to.setHours(23);
      to.setMinutes(59);

      me.myAbsencesStore.load({
         params : {
            'from': from,
            'to': to,
            'student': StudentPortal.global.Util.getUserCookie('pcode')
         }
      }); 
   },

   onMyAbsences: function(store, records, successful, operation, eOpts) {
      var me = this;

      me.getMyAbsencesListView().setStore(store);
      me.getMyAbsences().setMasked(false);
   },

   doMyAbsencesEdit: function (obj, e, opts) {
      var me = this;
      me.getMyAbsences().setActiveItem(1);
      var task = setInterval(function(){
         if(me.checkStores()) {
               
            var records = obj.up('myabsenceslistitem').getRecord();
            var startTime = StudentPortal.global.Util.getTimeFromDateString(records.get('start_date_time'));
            var endTime = StudentPortal.global.Util.getTimeFromDateString(records.get('end_date_time'));
            
            records.set('start_date_tmp', records.get('start_date'));
            records.set('start_time', startTime);
            records.set('end_date_tmp', records.get('end_date'));
            records.set('end_time', endTime);

            me.getMyAbsencesForm().setRecord(records);

            var absenceObj = {};
            absenceObj['existing_absence_reason'] = records.get('absence_reason_id');
            absenceObj['existing_approved_ind'] = records.get('approved_ind');
            absenceObj['existing_start_date'] = StudentPortal.global.Util.isoDateString(records.get('start_date'));
            absenceObj['existing_start_time'] = StudentPortal.global.Util.isoDateString(records.get('start_date'));
            absenceObj['existing_end_date'] = StudentPortal.global.Util.isoDateString(records.get('end_date'));
            absenceObj['existing_end_time'] = StudentPortal.global.Util.isoDateString(records.get('end_date'));
            absenceObj['existing_absence_comment'] = records.get('absence_comment');

            localStorage.setItem("absenceLocalStorage", JSON.stringify(absenceObj));

            clearInterval(task);
         }
      }, 20);
   },

   saveForm: function() {
      var me = this,
          myAbsencesForm = me.getMyAbsencesForm(),
          fileName,progressIndicator,input,files,
          startTimeDate,endTimeDate,startDate,endDate,startTime,endTime;
      
      if (!me.validateForm()) {
         return false;
      }

      progressIndicator = Ext.create("Ext.ProgressIndicator", {
         loadingText: "Uploading: {percent}%"
      }); 

      input = Ext.Viewport.down("filefield").getComponent().input;
      files = input.dom.files;      

      fileName = files[0] ? files[0].name : ""
      var fileNameLength = fileName.length;
      var maxLenght = 50;
      if (fileNameLength > maxLenght) {
         var e = fileName.lastIndexOf(".");
         var z = fileNameLength - e;
         var fileName = fileName.substr(0, (maxLenght-(z+1))) + fileName.substr(e,fileNameLength);
      }

      startDate = new Date(myAbsencesForm.getValues().start_date_tmp);
      startTime = myAbsencesForm.getValues().start_time;
      startTimeDate = StudentPortal.global.Util.timeToDate(startDate,startTime);
      startTimeDate = StudentPortal.global.Util.isoDateString(startTimeDate); 

      endDate = new Date(myAbsencesForm.getValues().end_date_tmp);
      endTime = myAbsencesForm.getValues().end_time;
      endTimeDate = StudentPortal.global.Util.timeToDate(endDate,endTime);
      endTimeDate = StudentPortal.global.Util.isoDateString(endTimeDate); 

      myAbsencesForm.setValues({
          "start_date": startTimeDate,
          "end_date": endTimeDate,
          "document_name": fileName,
          "start_time":startTimeDate,
          "end_time":endTimeDate
      });      

      var absenceUrl = '/' + tdsGlobal.getDeployContext() + '/absenceAdd';
      var existingParams = "";

      if (localStorage.getItem("absenceLocalStorage") !== "")  {
         absenceUrl = '/' + tdsGlobal.getDeployContext() + '/absenceEdit';
         existingParams = JSON.parse(localStorage.getItem("absenceLocalStorage"));
      }

      myAbsencesForm.submit({
         xhr2: true,
         progress:progressIndicator,
         disableCaching: false,
         url: absenceUrl, 
         headers: existingParams,
         method: 'POST', 
         success: function(form, response) { 
            Ext.Msg.alert('Success', 'Absence saved successfuly', Ext.emptyFn);
               me.doBackToMyAbsences();
         },
         failure: function(form, response) {
            var msg = 'Error saving the form: ' + '('+response.status+ ') - ' + response.statusText;
            Ext.Msg.alert('Error', msg , Ext.emptyFn);

            myAbsencesForm.setValues({
                "start_time":startTime,
                "end_time":endTime
            });  
         }
      });    
   },

   doMyAbsencesAdd: function (obj, e, opts) {
      var me = this;

      me.getMyAbsencesForm().getFields('start_time').setValue("08:00");
      me.getMyAbsencesForm().getFields('end_time').setValue('23:59');      
      localStorage.setItem("absenceLocalStorage", "");
      me.getMyAbsences().setActiveItem(1);
   },

   doMyAbsencesConfirmDelete: function (obj, e, opts) {
      var me = this;

      Ext.Msg.show({
         title: 'confirm?',
         message: 'Do you want to delete absence?',
         width: 500,
         buttons: Ext.MessageBox.YESNO,
         fn: function(buttonId) {
            if(buttonId == 'yes') {
               me.doMyAbsencesDelete(obj, e, opts);
            }
         }
      });
   },

   doMyAbsencesDelete: function (obj, e, opts) {
      var records = obj.up('myabsenceslistitem').getRecord();
      var startDateFormated = StudentPortal.global.Util.isoDateString(records.get('start_date'));
      var endDateFormated = StudentPortal.global.Util.isoDateString(records.get('end_date'));
      var me = this;

      Ext.Ajax.request({
         url: '/'+tdsGlobal.getDeployContext()+'/absenceDelete',
         disableCaching: false,
         method: 'POST',
         params : {
            'existing_student_id': records.get('student_id'),
            'existing_absence_reason_id': records.get('absence_reason_id'),
            'existing_start_date': startDateFormated,
            'existing_end_date': endDateFormated,
            'existing_approved_ind': records.get('approved_ind'),
            'existing_absence_comment': records.get('absence_comment')
         },         
         success: function(response) {
            me.doChangeDate();
         },
         failure: function(response) {
            var msg = 'Error deleting the absence: ' + '('+response.status+ ') - ' + response.statusText;
            Ext.Msg.alert('Error', msg , Ext.emptyFn); 
         }       
      });    
   },

   // events from Absence FORM *************************************************************************
   doAbsenceFormActivate: function (newActiveItem, obj, oldActiveItem, eOpts) {
      var me = this;
      var dateToday = new Date();

      me.getMyAbsencesForm().down('datePickerTds[name="start_date_tmp"]').setValue(dateToday);
      me.getMyAbsencesForm().down('datePickerTds[name="end_date_tmp"]').setValue(dateToday);

      me.getMyAbsencesForm().setMasked({
         xtype: 'loadmask',
         message: 'Loading...'
      });      

      Ext.create('StudentPortal.store.AbsenceReason', {
         params : {
            'query': '%'
         },
         listeners:{
            scope: me,
            load: me.onAbsenceReason
         }
      }).load();   

      Ext.create('StudentPortal.store.DocumentType', {
         params : {
            'query': '%'
         },
         listeners:{
            scope: me,
            load: me.onDocumentType
         }
      }).load();
   }, 

   onAbsenceReason: function(store, records, successful, operation, eOpts) {
      var me = this;

      me.getMyAbsencesForm().down('textfield[name="student_id"]').setValue(StudentPortal.global.Util.getUserCookie('pcode'));
 
      var absenceReason = me.getMyAbsencesForm().down('selectfield[name="absence_reason"]'),
 
      record = [{acode:'', adescription:'Choose the absence reason'}];
 
      store.insert(0,record);
 
      absenceReason.setOptions(store.getData().items);
      absenceReason.setValue('0');
 
       if(me.checkStores()) {
         me.getMyAbsencesForm().setMasked(false);
      }
   },

   onDocumentType: function(store, records, successful, operation, eOpts) {
      var me = this;

      me.getMyAbsencesForm().down('selectfield[name="document_type_code"]').setOptions(records);
      
      if(me.checkStores()) {
         me.getMyAbsencesForm().setMasked(false);
      }
   },   

   checkStores: function(){
      var myComboStores = ['absenceReason', 'documentType'],
          loaded = true;
      
      Ext.each(myComboStores, function(storeId) {
         var store = Ext.getStore(storeId);
         if (store.isLoading()) {
            loaded = false;
         }
      });

      return loaded;
   },

   doSave: function () {
      var me = this;

      Ext.Msg.confirm("Confirmation",
         "Do you want to save absence?", 
         function(buttonId) {
            if(buttonId == 'yes') {
               me.saveForm();
            }
         }
      );
   },

   validateForm: function() {
      var me = this;
      var form = me.getMyAbsencesForm(),
          user = Ext.create('StudentPortal.model.Absence', form.getValues()),
          errors = user.validate(),
          input,
          files,
          errorMsg = "";

      Ext.each(form.query('textfield'), function(tf){
         tf.removeCls('invalid-field');
      });
      form.down('#absenceFile').removeCls('invalid-field')

      if(!errors.isValid()) {
         errors.each(function (item, index, length) {
            form.down("field[name='"+item.getField()+"']").addCls('invalid-field');
            errorMsg = errorMsg + ' <b>' + form.getFields(item.getField()).getLabel()+':</b> '+ item.getMessage() + '<br>';
         });
     }

      //Date Validation
      var sd = new Date(form.getValues().start_date_tmp);
      var st = form.getValues().start_time;
      var startDate =  StudentPortal.global.Util.timeToDate(sd,st);

      var ed = new Date(form.getValues().end_date_tmp);
      var et = form.getValues().end_time;
      var endDate =  StudentPortal.global.Util.timeToDate(ed,et);

      if (startDate >= endDate) {
         form.down("field[name='start_date_tmp']").addCls('invalid-field');
         form.down("field[name='end_time']").addCls('invalid-field');
         errorMsg = errorMsg + ' <b>End Date:</b> End Date should be greater than Start Date.<br>';
      }

      //File Validation
      input = form.down('#absenceFile').getComponent().input;
      files = input.dom.files;
      
      if (files[0] !== undefined) {

         var fileSizeAllowed = tdsGlobal.getFileSizeAllowed();
         var fileSizeAllowedMB = (fileSizeAllowed/(tdsGlobal.getFileSizeAllowed() / 10)).toFixed(2)+' MB';

         if (files[0].size > fileSizeAllowed) {
            form.down('#absenceFile').addCls('invalid-field')
            errorMsg = errorMsg + ' <b>Document:</b> File cannot be greater than '+fileSizeAllowedMB+'.<br>';
         }
      }

      if (errorMsg !== '') {
         Ext.defer( function() {
            var msg = Ext.Msg.alert('Validation Failed', errorMsg,  function(a,b,c,d){
               delete(c);
            });
         }, 100 );

         return false;         
      }

      return true;
   },   

   doReset: function () {
      var me = this;
      var form = me.getMyAbsencesForm();
      form.reset()
      Ext.each(form.query('textfield,filefield'), function(field){
            field.removeCls('invalid-field');
      });
   },

   doBackToMyAbsences: function () {
      var me = this;
      var formId = me.getMyAbsencesForm().getId();
      Ext.get(formId).dom.reset();

      me.doReset();
      me.getMyAbsences().setActiveItem(0);
      me.doChangeDate();
   }

});