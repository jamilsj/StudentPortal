Ext.define('StudentPortal.view.RegisterAttendance', {
   extend: 'Ext.Panel',
   alias: 'widget.registerattendance',
   requires:[
      'StudentPortal.view.TerminalList'
   ],
   config: {

      fullscreen: true,
      activeItem: 0,

      layout: {
         type: 'vbox'
      },

      items: [
         {
            xtype: 'terminallist',
            flex: 1,
            scrollable: false

         },
         {
            xtype: 'maps',
            flex: 8
         }    
      ],
      listeners: {

      }
   },
  
});