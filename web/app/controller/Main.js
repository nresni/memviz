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

  /**
   * 
   * @param bt
   */
  formSubmit: function(bt) {
    bt.up('form').getForm().submit({
      scope: this,
      success: function(form, action) {
        this.getCacheStore().loadData(action.result.data);
      }
    });
  },

  /**
   *
   * @param grid
   * @param record
   */
  itemDetail: function(grid, record) {
    var entry = record,
      tree = this.getCacheDetail();
    tree.setRootNode({
      text: record.get('key'),
      expanded: true
    });

    var root = tree.getRootNode(),
    json = Ext.JSON.decode(record.get('value'));

    for (r in json) {
      if (Ext.isArray(json[r])) {
        for (var i = 0; i < json[r].length; i++) {
          var parent = root.appendChild({
            text: i
          });
          this.formatTree(json[r][i], parent);
          parent.expand();
        }
      }
    }
  },

  /**
   *
   * @param data
   * @param root
   */
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