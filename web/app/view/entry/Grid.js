Ext.define('MV.view.entry.Grid', {
  extend: 'Ext.grid.Panel',
  alias : 'widget.entrygrid',

  layout: 'fit',

  title : 'All entries',

  border: false,

  initComponent: function() {

    Ext.apply(this, {
      store: 'Entry',

      columns: [
        {header: 'Clé',  dataIndex: 'key', flex: 1},
        {header: 'Valeur', dataIndex: 'value', width: 1000}
      ]
    });

    this.callParent(arguments);
  }
});