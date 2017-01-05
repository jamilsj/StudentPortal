Ext.define('StudentPortal.view.TerminalList', {
   extend: 'Ext.form.Panel',
   requires:[
      'StudentPortal.store.TerminalComboList',
      'Ext.field.File',
      'Ext.form.FieldSet'
   ],
   alias: 'widget.terminallist',
   config: {

      layout: {
         type: 'fit'
      },
       
            items: [
                {
                    xtype: 'selectfield',
                    label: 'Terminal',
                    centered: true,
                    name: 'terminal_code',
                    
                    
                    options: [
                        {text: 'Choose Terminal',  value: '1'},
                        {text: 'O Casey Theatre',  value: '00000001'},
                        {text: 'kieranspc', value: '00000002'},
                        {text: 'Opticon 000000575176',  value: '00000003'},
                        {text: 'Opticon 000000957843',  value: '00000004'},
                        {text: 'Crewe Lecture Theater',  value: '00000029'}
                    ]
                
                }
            ]
        
    
   }
});
