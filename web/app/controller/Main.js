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
    this.getDataTree(record.get('value'), tree.getRootNode());
  },

  getDataTree: function(data, root) {
    var obj = Ext.JSON.decode(data);
    var results = [];
    Ext.Object.each(obj, function(key, o) {
      if (key == "success") {
        return false;
      }
      Ext.Object.each(o, function(index, value) {
        results.push(this.toArr(value));
      }, this);
    }, this);
    for (var i = 0; i < results.length; i++) {
      var parent = root.appendChild({
        text: i
      });
      this.formatTree(results[i], parent);
      parent.expand();
    }
  },

  toArr: function(value) {
    var result = [];
    for (key in value) {
      if (Ext.isObject(value[key])) {
        result[key] = this.toArr(value[key]);
      } else if (Ext.isObject(value[key][0])) {
        for (i in value[key]) {
          if (Ext.isDefined(result[key])) {
            result[key].push(this.toArr(value[key][i]));
          } else {
            result[key] = this.toArr(value[key][i]);
          }
        }
      } else {
        result[key] = value[key];
      }
    }
    return result;
  },

  formatTree: function(arr, root) {
    var root = root;
    if (Ext.isArray(arr)) {
      for (k in arr) {
        var parent = root.appendChild({
          text: k
        });
        this.formatTree(arr[k], parent);
      }
    } else {
      root.appendChild({
        text: k,
        leaf: true
      });
    }
  }
});