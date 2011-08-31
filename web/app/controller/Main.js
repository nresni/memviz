Ext.define('MV.controller.Main', {
  extend: 'Ext.app.Controller',

  stores: ['Cache'],

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
    },
    {
      ref: 'cacheList',
      selector: 'cachelist'
    }
  ],

  init: function() {
    this.control({
      'nav button[text=Search]': {
        click: this.formSubmit
      },
      'nav textfield': {
        specialkey: function(field, e) {
          if (e.getKey() == e.ENTER) {
            this.formSubmit(field);
          }
        }
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
    var cl = this.getCacheList().getEl();
    cl.mask('Chargement...');

    bt.up('form').getForm().submit({
      scope: this,
      success: function(form, action) {
        this.getCacheStore().removeAll();
        this.getCacheStore().loadData(action.result.data);
        cl.unmask();
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

    tree.getEl().mask('Chargement...');

    tree.setRootNode({
      text: record.get('key'),
      expanded: true
    });

    var root = tree.getRootNode(),
    json = Ext.JSON.decode(record.get('value'));

    if (Ext.isDefined(record.get('type')) && record.get('type') == "STRING") {
      root.appendChild({
          text: Ext.JSON.decode(record.get('value')),
          leaf: true
      });
    } else {
      for (r in json) {
        if (Ext.isArray(json[r])) {
          var length = json[r].length;
          if (length) {
            for (var i = 0; i < json[r].length; i++) {
              var parent = root.appendChild({
                text: i
              });
              this.formatTree(json[r][i], parent);
            }
          } else {
            root.appendChild({
              text: r
            });
          }
        } else {
          var hasChildren = Ext.isDefined(json[r]);
          var parent = root.appendChild({
            text: r,
            leaf: ! hasChildren
          });

          if (hasChildren) {
            this.formatTree(json[r], parent);
          }
        }
      }
    }

    tree.expandAll();
    tree.getEl().unmask();
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