Ext.define('StudentPortal.model.DocumentType', {
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