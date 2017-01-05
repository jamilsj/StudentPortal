Ext.define('StudentPortal.custom.DatePickerTds', {
   extend: 'Ext.field.DatePicker', 
   xtype: 'datePickerTds',
   config: {
      destroyPickerOnHide: true,
      picker: {
         yearFrom : new Date().getFullYear()-5,
         hideOnMaskTap : true
      },
      dateFormat: 'd/m/Y',
      listeners: {
         change: function( obj, newDate, oldDate, eOpts) {
            this.fireEvent('changeDate', obj, newDate, oldDate, eOpts);
         }
      }
   }
});