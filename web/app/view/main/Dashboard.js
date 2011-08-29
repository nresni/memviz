Ext.define('MV.view.main.Dashboard', {
  extend: 'Ext.Panel',
  layout: 'border',
  alias : 'widget.dashboard',

  initComponent: function() {
    this.items = [
      {
        xtype: 'panel',
        layout: 'border',
        region: 'center',
        defaults: {
          collapsible: true,
          split: true
        },
        items: [
          {
            xtype: 'cachelist',
            collapsible: false,
            region:'center'
          },
          {
            title: 'Footer',
            region: 'south',
            height: 200,
            minSize: 75,
            maxSize: 250,
            xtype: 'cachedetail'
          }
        ]
      },
      {
        xtype: 'nav'
      }
    ];

    this.callParent(arguments);
  }
});