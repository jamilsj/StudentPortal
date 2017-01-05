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
               url: '/' + tdsGlobal.getDeployContext() + '/helpUrl',
               disableCaching: false,
               method: 'GET',
               params : {
                  'setting_name':'student_portal_help_url'
               },
               success: function(response, opts) {
                  var res = JSON.parse(response.responseText).items[0].acode;
                  var url = '<iframe src=' + '"' + res + '"' + ' ' + 'frameborder="0" scrolling="no" class = "help-url"></iframe>'
                  me.getItems().items[0].setHtml(url);
               },
               failure: function(response) {
                  var msg = 'Error loading the file : ' + '('+response.status+ ') - ' + response.statusText;
                  Ext.Msg.alert('Error', msg , Ext.emptyFn); 
               }  
            });
         }
      }
   }
});


