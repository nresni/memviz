Ext.define('MV.controller.Memviz', {
  extend: 'Ext.app.Controller',

  stores: ['Memviz'],
  models: ['Memviz'],
  views: ['memviz.List'],

  init: function() {
    this.control({
      'memvizlist': {
        itemdblclick: this.editCache
      }
    });
  },

  editCache: function(grid, record) {
    console.log('Double click on ' + record.get('key'));
  }
});