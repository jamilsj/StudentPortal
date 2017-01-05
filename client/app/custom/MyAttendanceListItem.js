Ext.define('StudentPortal.custom.MyAttendanceListItem', {
   extend: 'Ext.dataview.component.ListItem',
   xtype : 'myattendancelistitem',
   requires: [
      'StudentPortal.custom.MyAttendanceListInnerItem'
   ],
   config: {
      width: '99.2%',
      innerItem: {},
      dataMap: {
         getInnerItem: {
            updateModuleId: 'module_id',
            updateModule: 'module_description',
            updateAttended: 'attended',
            updateTotal: 'total_events',
            updateAttendance: 'attendance'
         }
      }
   },

   applyInnerItem: function (config) {
      return Ext.factory(config, StudentPortal.custom.MyAttendanceListInnerItem, this.getInnerItem());
   },

   updateInnerItem: function (newInnerItem, oldInnerItem) {
   
      if (newInnerItem) {
         this.add(newInnerItem);
      }

      if (oldInnerItem) {
         this.remove(oldInnerItem);
      }
   }   

});