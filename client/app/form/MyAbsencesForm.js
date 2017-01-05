Ext.define('StudentPortal.form.MyAbsencesForm', {
   extend: 'Ext.form.Panel',
   alias: 'widget.myabsencesform',

   requires: [
      'StudentPortal.custom.TimePickerField',
      'StudentPortal.store.AbsenceReason',
      'StudentPortal.store.DocumentType',
      'Ext.field.File',
      'Ext.form.FieldSet'
   ],
   config: {
      cls:'my-absences',
      fullscreen: true,
      items: [
         {  
            xtype: 'toolbar',
            docked: 'top',
            items: {
               xtype: 'button',
               text: ' back',
               iconCls: 'icon-circle-left',
               itemId: 'backToMyAbsences'
            }
         },
         {
            xtype: 'fieldset',
            title: 'Absence Information',
            defaults: {
               required: true,
               labelWidth: '37%',
               clearIcon: false
            },
            items: [
               {
                  xtype: 'textfield',
                  label: "Student Id",
                  name: 'student_id',
                  readOnly: true,
                  hidden: true
               },{
                  xtype: 'selectfield',
                  name : 'absence_reason',
                  label: 'Reason',
                  usePicker: false,
                  valueField: 'acode',
                  displayField: 'adescription'
               },{
                  xtype: 'datePickerTds', 
                  label: 'Start Date',
                  picker: {
                     yearFrom : new Date().getFullYear()-1
                  },
                  name: 'start_date_tmp'
               },{
                  xtype:'timepickerfield',
                  label:'Start Time',
                  name: 'start_time'
               },{
                  xtype: 'datePickerTds', 
                  label: 'End Date',
                  picker: {
                     yearFrom : new Date().getFullYear()-1
                  },
                  name: 'end_date_tmp'
               },{
                  xtype:'timepickerfield',
                  label:'End Time',
                  name: 'end_time'
               },{
                  xtype: 'textareafield',
                  name : 'absence_comment',
                  required: false,
                  label: 'Comment'
               },{
                  xtype: 'textareafield',
                  name : 'approved_ind',
                  value: 'N',
                  hidden: true
               },{
                  xtype: 'textareafield',
                  name : 'end_date',
                  value: '',
                  hidden: true
               },{
                  xtype: 'textareafield',
                  name : 'start_date',
                  value: '',
                  hidden: true
               },{
                  xtype: 'textareafield',
                  name : 'document_name',
                  value: '',
                  hidden: true
               }
            ]
         },
         {
            xtype: 'fieldset',
            hidden: true, //TODO - phase 2 we will implement - STDTPORTAL-11
            title: 'Upload Document',
            defaults: {
               labelWidth: '37%'
            },
            items: [
               {
                  xtype: 'selectfield',
                  name : 'document_type_code',
                  label: 'Category',
                  valueField: 'acode',
                  usePicker: false,
                  displayField: 'adescription'
               },{
                  xtype: 'textfield',
                  label: "Description",
                  name: 'document_short_desc'
               },{
                  xtype: 'filefield',
                  itemId: 'absenceFile',
                  label: "Document",
                  multiple: true,
                  name: 'file_upload'
               }
            ]
         },
         {
            docked: 'bottom',
            xtype: 'toolbar',
            cls: 'absences-buttons',
            items: {
               xtype: 'container',
               layout: 'hbox',
               cls: 'absences-toolbar-buttons',
               centered: true,
               items: [
                  {
                     xtype: 'button',
                     itemId: 'reset',
                     text: 'Reset',
                     iconCls: 'icon-undo2'
                  },               
                  {
                     xtype: 'button',
                     itemId: 'save',
                     text: 'Save',
                     iconCls: 'icon-floppy-disk'
                  }               
               ]
            }
         }         
      ]
   }
});


