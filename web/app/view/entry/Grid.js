Ext.define('MV.view.entry.Grid', {
  extend: 'Ext.grid.Panel',
  alias : 'widget.entrygrid',

  layout: 'fit',

  title : 'All entries',

  initComponent: function() {

    Ext.apply(this, {
      store: 'Entry',

      columns: [
        {header: 'Clé',  dataIndex: 'key', flex: 1},
        {header: 'Type',  dataIndex: 'type', flex: 0},
        {header: 'Valeur', dataIndex: 'value', flex: 3}
      ]
    });

    this.callParent(arguments);
  }
});