Ext.define('StudentPortal.custom.MyAbsencesListItem', {
   extend: 'Ext.dataview.component.ListItem',
   xtype : 'myabsenceslistitem',
   requires: [
      'StudentPortal.custom.MyAbsencesListInnerItem'
   ],
   config: {
      width: '99.2%',
      innerItem: {},
      dataMap: {
         getInnerItem: {
            updateAbsenceReason: 'absence_reason',
            updateApprovedInd: 'approved_ind',
            updateAbsenceComment: 'absence_comment',
            updateStartDate: 'start_date',
            updateStartDateTime: 'start_date_time',
            updateEndDate: 'end_date',
            updateEndDateTime: 'end_date_time'
         }
      }
   },

   applyInnerItem: function (config) {
      return Ext.factory(config, StudentPortal.custom.MyAbsencesListInnerItem, this.getInnerItem());
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