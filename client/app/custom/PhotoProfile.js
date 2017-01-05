Ext.define('StudentPortal.custom.PhotoProfile', {
   extend: 'Ext.field.Field',
   requires: [
      'Ext.Img'
   ],
   xtype: 'photoprofile',
   config: {
      component: {
         xtype: 'image'
      }
   },
   updateValue: function(value, oldValue) {
      var me = this,
         component = me.getComponent();

      component.setSrc(value);
   },
   proxyConfig: {
      width: '100%',
      height: '100%'
   }

});