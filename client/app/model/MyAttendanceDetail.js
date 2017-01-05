Ext.define('StudentPortal.model.MyAttendanceDetail', {
   extend: 'Ext.data.Model',
   config: {
      fields: [
         {
            name: 'attended_ind',
            type: 'string'
         }, {
            name: 'event_date_time',
            type: 'date',
            convert: function (value, record) {
               var dt = new Date(value);
               return Ext.Date.format(dt, 'd/m/Y');  
            }
         }, {
            name: 'event_time',
            type: 'time',
            convert: function (value, record) {
               var dt = new Date(value);
               return Ext.Date.format(dt, 'H:i');
            }
         }, {
            name: 'event_type_description',
            type: 'string'
         },{
            name: 'location_description',
            type: 'string'
         }
      ]
   }
});