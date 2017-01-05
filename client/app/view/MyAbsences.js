Ext.define('StudentPortal.view.MyAbsences', {
   extend: 'Ext.Panel',
   alias: 'widget.myabsences',
   requires:[
      'StudentPortal.view.MyAbsencesList',
      'StudentPortal.form.MyAbsencesForm'
   ],
   config: {
      fullscreen: true,
      activeItem: 0,

      layout: {
         type: 'card'
      },

      items: [
         {
            xtype: 'myabsenceslist'
         },
         {
            xtype: 'myabsencesform'
         }     
      ]
   }
});