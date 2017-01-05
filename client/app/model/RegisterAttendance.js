Ext.define("StudentPortal.model.RegisterAttendance", {
   extend: "Ext.data.Model",
   config: {
      fields  : [

         { name : 'terminal_code',type: 'string' },
         { name : 'terminal_description',type: 'string' }
        
      ]
   }
});