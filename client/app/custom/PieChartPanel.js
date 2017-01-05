Ext.define('StudentPortal.custom.PieChartPanel', {
   extend: 'Ext.Container',
   xtype: 'piechartpanel',
   config: {
      items: { 
         xtype: 'oc-piechart',
         chartOptions: {
            x: function(d) { return d.label },
            y: function(d) { return d.value; },
            showLabels: true,
            labelType: 'value',
            donutRatio:0.40,
            showLegend: false,
            height: '140',
            labelSunbeamLayout: true,
            donutLabelsOutside: true,
            donut: true,
            color: ['#FF0000','#33CC33']                 
         }     
      }
   }
});