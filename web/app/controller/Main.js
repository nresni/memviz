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
    cacheDetail = this.getCacheDetail();

    if (entry) {
      cacheDetail.entry = record;
      cacheDetail.update(record.data)
    }
  }
});