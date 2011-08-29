Ext.define('MV.controller.Main', {
  extend: 'Ext.app.Controller',

  stores: ['Cache', 'Detail'],

  models: ['Cache'],

  views: [
    'main.Dashboard',
    'cache.List',
    'nav.Nav',
    'cache.Detail'
  ],

  refs: [
    {
      ref: 'cacheDetail',
      selector: 'cachedetail'
    }
  ],

  init: function() {
    this.control({
      'nav button[text=Search]': {
        click: this.formSubmit
      },
      'cachelist': {
        itemclick: this.itemDetail
      }
    });
  },

  formSubmit: function(bt) {
    bt.up('form').getForm().submit({
      scope: this,
      success: function(form, action) {
        this.getCacheStore().loadData(action.result.data);
      }
    });
  },

  itemDetail: function(grid, record) {
    var entry = record,
      tree = this.getCacheDetail();
    tree.setRootNode({
      text: record.get('key'),
      expanded: true
    });
    this.setChildren(record.get('value'), tree.getRootNode());
  },

  setChildren: function(data, root) {
    var obj = Ext.JSON.decode(data);

    for (r in obj) {
      if (Ext.isArray(obj[r])) {
        for (var i = 0; i < obj[r].length; i++) {
          var parent = root.appendChild({
            text: i
          });
          this.formatTree(obj[r][i], parent);
          parent.expand();
        }
      }
    }
  },

  formatTree: function(data, root) {
    var root = root;
    if (Ext.isObject(data)) {
      Ext.Object.each(data, function(index, value) {
        var parent = root.appendChild({
          text: index
        });
        this.formatTree(value, parent);
      }, this);
    } else if (Ext.isArray(data)) {
      Ext.Array.each(data, function(value, index) {
        var parent = root.appendChild({
          text: index
        });
        this.formatTree(value, parent);
      }, this);
    } else {
      root.appendChild({
        text: data,
        leaf: true
      });
    }
  }
});