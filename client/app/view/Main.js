Ext.define('StudentPortal.view.Main', {
   extend: 'Ext.Container',
   xtype: 'mainview',
   requires: [
      'Ext.Menu',
      'StudentPortal.view.MyAttendance',
      'StudentPortal.view.Profile',
      'StudentPortal.view.Help',
      'StudentPortal.view.MyAbsences',
      'StudentPortal.view.SwipeLog',
      'StudentPortal.view.Menu'
   ],
   config: {
      layout: {
         type: 'card',
         animation: {
            type: 'fade',
            duration: 700
         }
      },
      items: [
         {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'main-toolbar',
            items:  {
               xtype: 'button',
               itemId: 'startMenu',
               iconCls: 'list'
            }
         },
         {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'title-toolbar',
            items: {
               text : 'Profile',
               itemId: 'titlePortal',
               iconCls : 'icon-profile',
               labelCls: 'title-toolbar-text',
               style: 'color:#FFFFFF'
            }
         },         
         {
            xtype: 'profile'
         }         
      ],
      listeners: {
         initialize: function(){
            Ext.Viewport.setMenu(this.createMenu(),{
               side: 'left',
               reveal: true
            });
         }
      }
   },
   createMenu: function(){
      return Ext.create('StudentPortal.view.Menu',{});
   }
});