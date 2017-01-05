Ext.define('StudentPortal.custom.MyAbsencesListView', {
   extend: 'Ext.List',
   xtype: 'myabsenceslistview',
   requires: [
      'StudentPortal.custom.MyAbsencesListItem'
   ],

   config: {
      cls: 'bg-my-attendance background-list',
      itemCls: 'my-att-list-inner-item',
      useComponents: true,
      defaultType: 'myabsenceslistitem',
      selectedCls: 'list-selected',
      itemHeight: '120px',
      emptyText: "<div>No items found.</div>",
      loadingText: "Loading ..."
   }
});