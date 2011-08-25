Ext.define('MV.view.memviz.List', {
  extend: 'Ext.grid.Panel',
  alias : 'widget.memvizlist',

  title : 'All entries',

  store: 'Memviz',

  initComponent: function() {

    this.columns = [
      {header: 'Clé',  dataIndex: 'key',  flex: 1},
      {header: 'Valeur', dataIndex: 'value', flex: 1}
    ];

    this.callParent(arguments);
  }
});