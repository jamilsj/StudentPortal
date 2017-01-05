Ext.define("StudentPortal.custom.TimePickerField", {
  extend: "Ext.field.Text",
  xtype: "timepickerfield",

  constructor: function (config) {

    var i,
    data_hours = [],
    data_minuts = [],
    data_AMPM = [],
    me = this,
    format = '24-hour', //or '12-hour'
    hours = 24,
    val = 15,
    ampm = {},
    slots = [];

    if (format == '12-hour') {
       hours = 13;  
    }
    else {
      hours  = 24;
    }

    for(i=0; i<hours; i++) {
      data_hours.push({
        text: i,
        value: i
      });
    };

    data_minuts.push({
      text: '00',
      value: '00'
    });
    
    for(i=0; i<3; i++) {
      data_minuts.push({
        text: val,
        value: val
      });
      val = val + 15;
    }

    data_AMPM.push({
      text:'PM',
      value:'PM'
    });

    data_AMPM.push({
      text:'AM',
      value:'AM'
    });
    
    slots.push(
      {
        name: "hours",
        title: "Hours",
        data: data_hours
      },
      {
        name: "minuts",
        title: "Minuts",
        data: data_minuts
      }
    );  

    if(format == '12-hour') {
      ampm = {
        name: "AMPM",
        title: "test",
        data: data_AMPM
      };
      slots.push(ampm);
    }

    this.picker = Ext.create("Ext.Picker", {
      hidden: true,
      zIndex: 9999,
      hideOnMaskTap : true,
      slots: slots,
      listeners: {
        change: function (picker, values) { 
          descAMPM = ''; 
          if(format == '12-hour') {
            descAMPM = values.AMPM;
          }
          me.setValue(StudentPortal.global.Util.addZeroInTime(values.hours)+':'+values.minuts+' '+descAMPM);
        }
      }
    });

    Ext.Viewport.add(this.picker);

    // We want to release focus on the field so that the keyboard doesn't show up
    // while we're picking a time.

    this.on("focus", function (field, e) {
      me.picker.show();
      field.blur();
    });

    this.callParent(arguments);
  }
});
