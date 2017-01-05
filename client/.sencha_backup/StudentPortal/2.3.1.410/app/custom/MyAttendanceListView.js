Ext.define('StudentPortal.custom.MyAttendanceListView', {
   extend: 'Ext.List',
   xtype: 'myattListView',
   requires: [
      'StudentPortal.custom.MyAttendanceListItem'
   ],
   config: {
      cls: 'bg-my-attendance background-list',
      itemCls: 'my-att-list-inner-item',
      useComponents: true,
      defaultType: 'myattendancelistitem',
      onItemDisclosure: true,
      selectedCls: 'list-selected',
      itemHeight: '140px',
      emptyText: "<div>No items found.</div>",
      loadingText: "Loading ..."
   }
});