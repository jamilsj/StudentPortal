Ext.define('StudentPortal.view.MyAttendance', {
   extend: 'Ext.Panel',
   xtype: 'myattendance',
   requires:[
      'StudentPortal.view.MyAttendanceList',
      'StudentPortal.view.MyAttendanceDetail'
   ],
   config: {
      fullscreen: true,
      activeItem: 0,

      layout: {
         type: 'card'
      },
      items: [
         {
            xtype: 'myattendancelist'
         },
         {
            xtype: 'myattendancedetail'
         }     
      ]
   }
});