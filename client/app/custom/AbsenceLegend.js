Ext.define('StudentPortal.custom.AbsenceLegend', {
   extend: 'Ext.Panel',
   alias:'widget.absencelegend',
   config: {
      modal: true,
      hideOnMaskTap:true,      
      styleHtmlContent: true,
      marginBottom: 40,
      marginRight: 20,
      width: 140, 
      cls: 'absence-panel-legend',
      html: '<div class="container-legend">'+
            '<span class="flaticon-question42 absence-legend absence-reason"></span>'+
            '<span class="legend" style="margin-left:1px"> Reason </span>'+
            '</div>'+
            '<div class="container-legend">'+
            '<span class="flaticon-calendar146 absence-legend"></span>'+
            '<span class="legend"> Start/End Date </span>'+
            '</div>'+
            '<div class="container-legend">'+
            '<span class="flaticon-citation absence-legend"></span>'+
            '<span class="legend"> Comment </span>'+
            '</div>'+
            '<div class="container-legend">'+
            '<span class="flaticon-delete81 absence-legend delete-legend"></span>'+
            '<span class="legend"> Delete </span>'+
            '</div>'+
            '<div class="container-legend">'+
            '<span class="flaticon-edit26 absence-legend edit-legend"></span>'+                        
            '<span class="legend"> Edit </span>'+
            '</div>'+
            '<div class="container-legend">'+
            '<span class="flaticon-cross47 absence-legend notAproved-legend"></span>'+
            '<span class="legend"> Not Approved </span>'+ 
            '</div>'+
            '<div class="container-legend">'+
            '<span class="flaticon-white65 absence-legend aproved-legend"></span>'+
            '<span class="legend"> Approved (will not affect attendance %) </span>'+
            '</div>'
   }
});