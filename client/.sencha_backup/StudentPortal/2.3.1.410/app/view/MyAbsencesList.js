Ext.define('StudentPortal.view.MyAbsencesList', {
   extend: 'Ext.Panel',
   requires:[
      'StudentPortal.custom.MyAbsencesListView'
   ],
   alias: 'widget.myabsenceslist',
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
                  itemId: 'myAbsencesDateFrom'            
               },
               {
                  xtype: 'datePickerTds', 
                  label: 'To',
                  labelWidth: '25%',
                  width: '150px',   
                  labelCls: 'date-picker',                
                  itemId: 'myAbsencesDateTo'
               }
            ]
         },             
         {
            xtype: 'myabsenceslistview'
         },
         {
            xtype: 'toolbar',
            docked: 'bottom',
            itemId: 'absenceLegend',
            hidden: true,
            showAnimation: {
                type: 'slideIn',
                duration: 100,
                direction: 'up'
            }, 
            hideAnimation: {
                type: 'slideOut',
                duration: 100,
                direction: 'down'
            }
           },
         {
            xtype: 'toolbar',
            docked: 'bottom',
            cls: 'absences-buttons',
            items: [
               {
                  xtype: 'container',
                  cls: 'absences-toolbar-buttons',
                  centered: true,
                  items: {
                     xtype: 'button',
                     text: 'Add Absence',
                     iconCls: 'add',
                     itemId: 'absenceAdd',
                     style: 'left:30px'
                  }          
               },
               {
                  xtype: 'container',
                  docked: 'right',
                  items: {
                     xtype: 'button',
                     text: 'Legend',
                     cls: 'absence-legend-button',
                     docked: 'bottom',
                     itemId: 'showLegend',
                     border: 0
                  }
               }
            ]
         }
      ]
   }
});