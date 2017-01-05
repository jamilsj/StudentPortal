Ext.define('StudentPortal.model.Profile', {
   extend: 'Ext.data.Model',
   config: {
      fields: [
         {
            name: 'photo_profile',
            type: 'string'
         }, {
            name: 'person_code',
            type: 'string'
         }, {
            name: 'forename',
            type: 'string'
         }, {
            name: 'surname',
            type: 'string'
         }, {
            name: 'name',
            convert: function (value, record) {
               return  record.get('forename') + ' ' + record.get('surname')
            }
         },{
            name: 'date_of_birth',
            type: 'date',
            convert: function (value, record) {
               if(value !== undefined) {
                  var dt = new Date(value);
                  return Ext.Date.format(dt, 'd/m/Y');  
               }
            }
         }, {
            name: 'course_name',
            type: 'string'
         }
      ]
   }
});