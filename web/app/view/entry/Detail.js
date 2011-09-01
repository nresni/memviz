Ext.define('MV.view.entry.Detail', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.entrydetail',

  title : 'Detail',
  height: 300,

  layout: 'fit',
  border: false,

  initComponent: function() {

    this.items = [
      {
        xtype: 'entrytree'
      }
    ];

    this.callParent(arguments);
  }
});