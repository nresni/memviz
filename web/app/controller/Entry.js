Ext.define('MV.controller.Entry', {
  extend: 'Ext.app.Controller',

  stores: ['Entry'],

  models: ['Entry'],

  views: [
    'entry.Detail',
    'entry.Tree'
  ],

  refs: [
    {
      ref: 'entryGrid',
      selector: 'entrygrid'
    },
    {
      ref: 'entryDetail',
      selector: 'entrydetail'
    },
    {
      ref: 'entryTree',
      selector: 'entrytree'
    }
  ],

  /**
   *
   */
  init: function() {
    this.control({
      'entrygrid': {
        itemclick: this.executeDetail
      }
    });
  },

  /**
   *
   * @param grid
   * @param record
   */
  executeDetail: function(grid, record) {
    var tree = this.getEntryTree();

    tree.getEl().mask('Chargement...');

    var entry = this.itemDetail(record, tree);

    if (entry) {
      tree.expandAll()
      tree.getEl().unmask();
    }
  },

  /**
   *
   * @param grid
   * @param record
   */
  itemDetail: function(record, tree) {
    var entry = record;

    tree.setRootNode({
      text: record.get('key'),
      expanded: true
    });

    var root = tree.getRootNode(),
      json = record.get('value');

    if (Ext.isDefined(record.get('type')) && record.get('type') == "STRING") {
      root.appendChild({
        text: string,
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

    return tree;
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