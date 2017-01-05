Ext.define('StudentPortal.view.Menu', {
   extend: 'Ext.Menu',
   xtype:'mainmenu',
   requires: [],
   config: {
      cls: 'main-menu',
      width: 220,
      border: 5,
      scrollable: 'vertical',
      Defauts: {
         xtype: 'button'
      },
      items: [
         {
            text: 'Profile',
            itemId: 'profile',
            iconCls: 'icon-profile',
            cls: 'item-menu',
            labelCls: 'menu-button'
         }, {
            text: 'My Attendance',
            itemId: 'myAttendance',
            iconCls: 'icon-pie-chart',
            labelCls: 'menu-button',
            cls: 'item-menu'
         }, {
            text: 'Swipe Log',
            itemId: 'swipeLog',
            iconCls: 'compose',
            labelCls: 'menu-button',
            cls: 'item-menu'
         }, {
            text: 'My Absences',
            itemId: 'myAbsences',
            iconCls: 'time',
            labelCls: 'menu-button',
            cls: 'item-menu'
         }, {
            text: 'Help',
            itemId: 'help',
            iconCls: 'info',
            labelCls: 'menu-button',
            cls: 'item-menu'
         }
      ]
   }
});