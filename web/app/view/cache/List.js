Ext.define('MV.view.cache.List', {
  extend: 'Ext.grid.Panel',
  alias : 'widget.cachelist',

  title : 'All entries',

  store: 'Cache',

  columnLines: true,

  autoScroll: false,

  initComponent: function() {

    this.columns = [
      {header: 'Clé',  dataIndex: 'key', flex: 1},
      {header: 'Valeur', dataIndex: 'value', flex: 1}
    ];

    this.callParent(arguments);
  }
});