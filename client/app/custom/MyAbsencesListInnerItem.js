Ext.define('StudentPortal.custom.MyAbsencesListInnerItem', {
   extend: 'Ext.Container',
   xtype: 'myabsenceslistinneritem',
   config: {
      layout: {
         type: 'vbox',
         pack: 'start'
      },
      absenceReason: undefined,
      approvedInd: undefined,
      absenceComment: undefined,
      startDate: undefined,
      startDateTime: undefined,
      endDate: undefined,
      endDateTime: undefined,
      defaults: {
         cls: 'absence-list-row'
      },
      items: [
         {
            xtype: 'container',
            width: '100%',
            layout: 'hbox',
            items: [
               {
                  xtype: 'container',
                  name: 'absenceReason',
                  flex: 4
               },
               {
                  xtype: 'container',
                  flex: 1,
                  docked: 'right',
                  layout: 'hbox',
                  cls: 'absence-edit-buttons',
                  items: [
                     {
                        xtype: 'button',
                        iconCls: 'flaticon-delete81',
                        cls: 'absence-action-delete',
                        itemId: 'absenceDelete',
                        border: 0
                     },
                     {
                        xtype: 'button',
                        iconCls: 'flaticon-edit26',
                        cls: 'absence-action-edit',
                        itemId: 'absenceEdit',
                        border: 0
                     }
                  ]
               }
            ]
         },
         {
            xtype: 'container',
            width: '100%',
            layout: 'hbox',
            cls: 'absence-list-row-date',
            items: [
               {
                  xtype: 'container',
                  name: 'startDateTime',
                  flex: 1
               },
               {
                  xtype: 'container',
                  name: 'endDateTime',
                  flex: 1
               }
            ]
         },
         {
            xtype: 'container',
            width: '100%',
            layout: 'hbox',
            cls: 'absence-list-row-comment',
            items: [
               {
                  xtype: 'container',
                  name: 'absenceComment', 
                  flex: 4
               },            
               {
                  xtype: 'container',
                  name: 'approvedInd',
                  flex: 1,
                  style: 'text-align:right'

               }
            ]
         }
      ]
   },

   applyAbsenceReason: function (AbsenceReason) {
      this.updateAbsenceReason(AbsenceReason);
      return AbsenceReason;
   },
   updateAbsenceReason: function (newAbsenceReason) {
      var icon = '<span class="flaticon-question42 absence-question-icon"></span>';
      var text = '<span class="absence-list-title" >'+newAbsenceReason+'</span>'; 
      this.down('container[name="absenceReason"]').setHtml(icon + text);
   },


   applyStartDateTime: function (StartDateTime) {
      this.updateStartDateTime(StartDateTime);
      return StartDateTime;
   },
   updateStartDateTime: function (newStartDateTime) {
      var icon = '<span class="flaticon-calendar146 absence-calendar-icon"></span>';
      var text = '<span class="absence-list-date">'+newStartDateTime+'</span>'; 
      this.down('container[name="startDateTime"]').setHtml(icon + text);
   },


   applyEndDateTime: function (EndDateTime) {
      this.updateEndDateTime(EndDateTime);
      return EndDateTime;
   },
   updateEndDateTime: function (newEndDateTime) {
      var icon = '<span class="flaticon-calendar146 absence-calendar-icon"></span>';
      var text = '<span class="absence-list-date">'+newEndDateTime+'</span>';
      this.down('container[name="endDateTime"]').setHtml(icon + text);
   },


   applyAbsenceComment: function (AbsenceComment) {
      this.updateAbsenceComment(AbsenceComment);
      return AbsenceComment;
   },
   updateAbsenceComment: function (newAbsenceComment) {
      var icon = '<span class="flaticon-citation absence-citation-icon"></span>';
      var text = '<span class="absence-list-comment">'+newAbsenceComment+'</span>';       
      this.down('container[name="absenceComment"]').setHtml(icon + text);
   }, 

   applyApprovedInd: function (ApprovedInd) {
      this.updateApprovedInd(ApprovedInd);
      return ApprovedInd;
   },
   updateApprovedInd: function (newApprovedInd) {
      if (newApprovedInd == undefined)
         return;

      var icon = '';
      newApprovedInd = newApprovedInd.toUpperCase();

      if (newApprovedInd == 'Y') {
         icon = '<span class="flaticon-white65 absence-aproved-icon"></span>';
      }
      else if(newApprovedInd == 'N') {
         icon = '<span class="flaticon-cross47 absence-notAproved-icon"></span>';
      }

      this.down('container[name="approvedInd"]').setHtml(icon);
   }

});