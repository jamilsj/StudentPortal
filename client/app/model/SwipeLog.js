Ext.define('StudentPortal.model.SwipeLog', {
   extend: 'Ext.data.Model',
   config: {
      fields: [
         {
            name: 'access_date_time',
            type: 'date',
            convert: function (value, record) {
               var dt = new Date(value);
               return Ext.Date.format(dt, 'd/m/Y');  
            }
         }, {
            name: 'access_time',
            type: 'time',
            convert: function (value, record) {
               var dt = new Date(value);
               return Ext.Date.format(dt, 'H:i:s');
            }
         }, {
            name: 'device_description',
            type: 'string'
         }, {
            name: 'device_id',
            type: 'string'
         }, {
            name: 'location_description',
            type: 'string',
            convert: function (value, record) {
               if (!value) {
                  return record.data.device_description;
               }
               else {
                  return value;
               }
            }
         }, {
            name: 'location_id',
            type: 'string'
         }, {
            name: 'matched',
            type: 'boolean'
         }, {
            name: 'error_short_description',
            type: 'string'
         }                    
      ]
   }
});