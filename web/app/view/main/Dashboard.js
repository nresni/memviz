Ext.define('MV.view.main.Dashboard', {
  extend: 'Ext.Panel',
  alias : 'widget.dashboard',

  layout: 'border',

  defaults: {
    collapsible: true,
    split: true
  },

  initComponent: function() {
    this.items = [
      {
        xtype: 'cachelist',
        region:'center',
        collapsible: false
      },
      {
        xtype: 'cachedetail',
        region: 'south',
        height: 300
      },
      {
        xtype: 'nav',
        region: 'west'
      }
    ];

    this.callParent(arguments);
  }
});