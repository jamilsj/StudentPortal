Ext.define('StudentPortal.view.Help', {
   extend: 'Ext.Panel',
   alias:'widget.help',
   config: {
      layout: {
         type: 'fit'         
      },
      items: [
         {
            xtype  : 'panel', 
            scroll : 'vertical',
            cls:'help-iframe'
         }   
      ],
      listeners: {
         initialize: function(){
            var me = this;
            Ext.Ajax.request({
               url: tdsGlobal.getExtenalContent(),
               success: function(response, opts) {
                  me.getItems().items[0].setHtml(response.responseText);
               }
            });
         }
      }
   }
});


