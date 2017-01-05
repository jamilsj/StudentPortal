Ext.define('StudentPortal.view.Maps', {
    extend: 'Ext.navigation.View',
    alias: 'widget.maps',

    requires: [
        'Ext.Panel',
        'Ext.Map',
        'Ext.navigation.Bar',
        'Ext.Button'
    ],

    config: {
       
                items  : [
                    {
                        xtype: 'map',
                        height: '100%',
                        width: '100%',
                        itemId: 'map',
                        position: 'absolute',
                        top: '400',
                        bottom: '500',
                        left: '100',
                        right: '100',
                        //centered: true,
                        useCurrentLocation: true



                        
                       
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
                     text: 'Register',
                     //iconCls: 'add',
                     itemId: 'Register',
                     style: 'left:30px'
                  }          
               }]
                   } 
                
            
        ]
       
    }
});