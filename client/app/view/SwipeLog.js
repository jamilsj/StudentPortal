Ext.define('StudentPortal.view.SwipeLog', {
   extend: 'Ext.Panel',
   requires:[
      'StudentPortal.view.SwipeLogList',
      'StudentPortal.custom.DatePickerTds'
   ],
   alias: 'widget.swipelog',
   config: {
      layout: {
         type: 'fit'
      },
      items: [
         {
            docked: 'top',
            xtype: 'toolbar',
            items: [
               {
                  xtype: 'datePickerTds', 
                  label: 'From',
                  labelWidth: '35%',
                  width: '170px',  
                  labelCls: 'date-picker',                
                  itemId: 'swipeDateFrom'            
               },
               {
                  xtype: 'datePickerTds', 
                  label: 'To',
                  labelWidth: '25%',
                  width: '150px',   
                  labelCls: 'date-picker',                
                  itemId: 'swipeDateTo'
               }
            ]
         },             
         {
            xtype: 'swipeloglist'
         },
         {
            docked: 'bottom',
            xtype: 'toolbar',
            items: [
               {
                  xtype: 'panel',
                  flex: 1,
                  style: 'margin-left:5px;margin-bottom:12px',

                  html: '<div class="swipelog-toolbar">'+
                        '<div class="text">Matched</div>'+
                        '<div class="flaticon-white65"></div>'+
                        '<div class="text">Unmatched</div>'+
                        '<div class="flaticon-cross47"></div>'+
                        '</div>'
               }
            ]
         }         
      ]
   }
});