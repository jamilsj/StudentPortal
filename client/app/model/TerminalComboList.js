Ext.define('StudentPortal.model.TerminalComboList', {
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