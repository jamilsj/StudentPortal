Ext.define('StudentPortal.view.SwipeLogList', {
   extend: 'Ext.List',
   xtype: 'swipeloglist',
   config: {
      cls: 'background-list',
      itemCls: 'swipe-log-list',
      style: 'border:0',
      emptyText: "<div>No items found.</div>",
      itemHeight: 70, 
      loadingText: "Loading ...",
      itemTpl: '<div class="list-block swipe-log">'+'<div class="table">'+
                 '<div class="row">'+
                    '<span class="cell cell1">'+
                       '<div class="icon-time"></div>'+
                    '</span>'+
                    '<span class="cell cell2">'+
                       '{access_date_time} - {access_time}'+
                    '</span>'+

                    '<span class="cell" style="width:40px; vertical-align:bottom">'+
                       '<tpl if="matched">'+
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
                 '<tpl if="error_short_description!=undefined">' +
                    '<div class="row">'+
                      '<span class="cell cell1">'+
                         '<div class="icon-warning"></div>'+
                      '</span>'+
                      '<span class="cell cell2">'+
                         '{error_short_description}'+
                      '</span>'+
                    '</div>'+
                 '</tpl>' +
              '</div>'+'</div>'
   }
});