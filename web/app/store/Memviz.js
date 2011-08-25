Ext.define('MV.store.Memviz', {
  extend: 'Ext.data.Store',
  model: 'MV.model.Memviz',
  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: 'all',
    reader: {
      type: 'json',
      root: 'data',
      successProperty: 'success'
    }
  }
});