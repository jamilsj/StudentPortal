Ext.define('StudentPortal.view.MyAttendanceList', {
   extend: 'Ext.Panel',
   xtype: 'myattendancelist',
   requires:[
      'StudentPortal.custom.MyAttendanceListView',
      'StudentPortal.custom.DatePickerTds'
   ],   
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
                  itemId:'myAttDateFrom'
               },
               {
                  xtype: 'datePickerTds', 
                  label: 'To',
                  labelWidth: '25%',
                  width: '150px',
                  itemId:'myAttDateTo',
                  labelCls: 'date-picker'
               }
            ]
         },  
         {
            xtype: 'myattListView'
         },
         {
            docked: 'bottom',
            xtype: 'toolbar',
            items: [
               {
                  xtype: 'image',
                  src: 'resources/images/MyAttChartLegend.png',
                  flex: 1,
                  style: 'margin-left:5px;background-position: left;',
                  html: ' '
               }
            ]
         }         
      ]
   }
});