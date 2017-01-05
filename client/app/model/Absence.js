Ext.define("StudentPortal.model.Absence", {
   extend: "Ext.data.Model",
   config: {
      fields  : [
         { name : 'student_id',type: 'string' },
         { name : 'absence_comment',type: 'string',
            convert: function (value, record) {
               if(value == undefined) {
                  return '';
               }
               return  value;
            }
         },
         { name : 'start_date_tmp',type: 'datePickerTds' },
         { name : 'end_date_tmp',type: 'datePickerTds' },
         { name : 'document_short_desc',type: 'textfield' },
         { name : 'absence_reason_id',type: 'string' },
         { name : 'absence_reason',type: 'string' },
         { name : 'approved_ind',type: 'string' },
         { name : 'document',type: 'number' },
         { name : 'end_date',type: 'string'},
         { name : 'end_date_time',type: 'string',
            convert: function(value, record) {
               if (typeof value !== 'undefined') {
                  var edt = value.split("T")[0] + " " +  value.split("T")[1].replace('Z','');
                  return edt.substring( 0,( edt.length - 3 ) )
               }
            }
         },
         { name : 'start_date',type: 'string' },
         { name : 'start_date_time',type: 'string',
            convert: function(value, record){
               if (typeof value !== 'undefined') {
                  var sdt = value.split("T")[0] + " " + value.split("T")[1].replace('Z','');
                  return sdt.substring( 0,( sdt.length - 3 ) )
               }
            }
         }
      ],
      validations : [
         {
            type: 'presence',
            field: 'absence_reason',
            message: 'Can not be blank.'
         },
         {
            type: 'presence',
            field: 'start_date_tmp',
            message: 'Can not be blank.'
         },{
            type: 'presence',
            field: 'end_date_tmp',
            message: 'Can not be blank.'
         },{
            type: 'length',
            max: 4000,
            field: 'absence_comment',
            message: 'Length can not be more than 4000.'
         },{
            type: 'length',
            max: 50,
            field: 'document_short_desc',
            message: 'Length can not be more than 50.'
         }  
      ]
   }
});