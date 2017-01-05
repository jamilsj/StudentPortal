Ext.define('StudentPortal.model.AbsenceReason', {
   extend: 'Ext.data.Model',
   config: {
      fields: [
         {
            name: 'acode',
            type: 'string'
         }, {
            name: 'adescription',
            type: 'string'
         }
      ]
   }
});