Ext.define('MV.view.cache.Detail', {
  extend: 'Ext.tree.Panel',
  alias : 'widget.cachedetail',
  title : 'Entry detail',
  autoScroll: true,

  initComponent: function() {
    this.callParent(arguments);
  }
});