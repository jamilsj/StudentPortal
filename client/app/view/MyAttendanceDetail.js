Ext.define('StudentPortal.view.MyAttendanceDetail', {
   extend: 'Ext.List',
   xtype: 'myattendancedetail',
   requires: [
      'StudentPortal.store.MyAttendanceDetail'
   ],
   itemHeight: 130,   
   config: {
      cls: 'background-list',
      style: 'border:0',
      emptyText: "<div>No items found.</div>",
      itemHeight: 90, 
      loadingText: "Loading ...",
      items: {  
            xtype: 'toolbar',
            docked: 'top',
            items: {
               xtype: 'button',
               text: ' back',
               iconCls: 'icon-circle-left',
               itemId: 'backToMyAttendance'
            }
      },
      itemTpl: '<div class="list-block swipe-log">'+'<div class="table">'+
                 '<div class="row">'+
                    '<span class="cell cell1">'+
                       '<div class="icon-time"></div>'+
                    '</span>'+
                    '<span class="cell cell2">'+
                       '{event_date_time} - {event_time}'+
                    '</span>'+
                    '<span class="cell" style="width:40px; vertical-align:bottom">'+
                       '<tpl if="attended_ind">'+
                             '<div class="flaticon-white65"></div>'+
                       '<tpl else>'+
                            '<div class="flaticon-cross47"></div>'+
                       '</tpl>'+
                    '</span>'+
                 '</div>'+
                 '<div class="row">'+
                    '<span class="cell cell1">'+
                       '<div class="icon-location"></div>'+
                    '</span>'+
                    '<span class="cell cell2">'+
                        '{location_description}'+
                    '</span>'+
                 '</div>'+
                 '<div class="row">'+
                    '<span class="cell cell1">'+
                       '<div class="icon-my-Att-module"></div>'+
                    '</span>'+
                    '<span class="cell cell2">'+
                        '{event_type_description}'+
                    '</span>'+
                 '</div>'+                 
              '</div>'+'</div>'
   }
});