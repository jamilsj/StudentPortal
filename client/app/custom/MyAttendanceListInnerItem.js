Ext.define('StudentPortal.custom.MyAttendanceListInnerItem', {
   extend: 'Ext.Container',
   xtype: 'myattendancelistinneritem',
   requires: [
      'Ext.field.Hidden',
      'StudentPortal.custom.PieChartPanel'
   ],
   config: {
      layout: {
         type: 'hbox',
         pack: 'start'
      },
      moduleId: undefined,
      module: undefined,
      total: undefined,
      attended: undefined,
      attendance: undefined,
      defaults: {},
      items: [
         {
            xtype: 'container',
            layout: 'vbox',
            flex: 1,
            items: [
               {
                  xtype: 'container',
                  layout: 'hbox',
                  items: [
                     {
                        xtype: 'image',
                        imageCls: 'icon-my-Att-module'
                     },
                     {
                        xtype: 'container',
                        cls: 'text-my-att text-bold',
                        name: 'moduleId',
                        minWidth: '75px',
                        maxWidth: '20em'                  
                     }
                  ]
               },
               {
                  xtype: 'container',
                  cls:'my-att-sep',
                  name: 'module',
                  minWidth: '75px',
                  maxWidth: '20em'                  
               },               
               {
                  xtype: 'container',
                  layout: 'hbox',
                  items: [
                     {
                        xtype: 'image',
                        imageCls: 'icon-my-att-chart'
                     },
                     {
                        xtype: 'container',
                        cls: 'text-my-att',
                        name: 'attendance',
                        minWidth: '75px',
                        maxWidth: '20em'                  
                     }
                  ]
               }               
            ]
         },
         {
            name: 'pchartpanel',
            xtype: 'piechartpanel',
            height:'130px',
            flex: 1
         },
         {
            xtype: 'hiddenfield',
            name: 'total'
         },
         {
            xtype: 'hiddenfield',
            name: 'attended'
         }         

      ]
   },

   applyModuleId: function (ModuleId) {
      this.updateModuleId(ModuleId);
      return ModuleId;
   },
   updateModuleId: function (newModuleId) {
      this.down('container[name="moduleId"]').setHtml(newModuleId);
   },


   applyModule: function (module) {
      this.updateModule(module);
      return module;
   },
   updateModule: function (newModule) {
      this.down('container[name="module"]').setHtml(newModule);
   },


   applyTotal: function (total) {
      this.updateTotal(total);
      return total;
   },
   updateTotal: function (newTotal) {
      this.down('textfield[name="total"]').setValue(newTotal);
   },   


   applyAttended: function (attended) {
      this.updateAttended(attended);
      return attended;
   },
   updateAttended: function (neAttended) {
      this.down('textfield[name="attended"]').setValue(neAttended);
   },


   applyAttendance: function (attendance) {
      this.updateAttendance(attendance);
      return attendance;
   },
   updateAttendance: function (newAttendance) {
      this.down('container[name="attendance"]').setHtml(newAttendance);
   }   

});