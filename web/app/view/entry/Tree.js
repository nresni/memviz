Ext.define('MV.view.entry.Tree', {
  extend: 'Ext.tree.Panel',
  alias : 'widget.entrytree',

  autoScroll: true,
  scroll: 'both',
  useArrows: true,

  initComponent: function() {
    this.callParent(arguments);
  }
});