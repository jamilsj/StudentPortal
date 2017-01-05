Ext.define('StudentPortal.model.MyAttendance', {
   extend: 'Ext.data.Model',
   config: {
      fields: [
         {
            name: 'attendance',
            type: 'string',
            convert: function (value, record) {
               return  value + '%'
            }
         }, {
            name: 'attended',
            type: 'number'
         }, {
            name: 'late_count',
            type: 'number'
         }, {
            name: 'module_description',
            type: 'string'

         }, {
            name: 'module_finish_date',
            type: 'date'
         }, {
            name: 'module_id',
            type: 'string'
         }, {
            name: 'module_start_date',
            type: 'date'
         }, { 
            name: 'total_events',
            type: 'number'
         }         
      ]
   }
});