Ext.define('StudentPortal.controller.Main', {
   extend: 'Ext.app.Controller',

   config: {
      refs: {
         main: 'mainview'
      }
   },

   init: function() {
      var me = this;
      me.control({
         'mainmenu button': {
            'tap': function(obj, e, eOpts) {
               if (obj.getItemId() !== 'startMenu') {
                  me.ativatePage(obj, e, eOpts);
               }
            }
         },
         'toolbar button': {
            'tap': function(obj, e, eOpts) {
               if (obj.getItemId() == 'startMenu') {

                  if (Ext.Viewport.getMenus().left.isHidden()) {
                     Ext.Viewport.showMenu('left');
                  }
                  else {
                     Ext.Viewport.hideMenu('left');
                  }
               }
            }
         }         
      })
   },

   ativatePage: function(item, e, eOpts) {
      var me = this;
      
      if(me.getMain() == undefined) {
         return;
      }

      me.getMain().setActiveItem(item.getItemId().toLowerCase());
      me.getMain().down('#titlePortal').setText(item.getText());
      me.getMain().down('#titlePortal').setIconCls(item.getIconCls());
      Ext.Viewport.hideMenu('left');
   }

});