Ext.define('MV.controller.Main', {
  extend: 'Ext.app.Controller',

  stores: ['Entry'],

  models: ['Entry'],

  views: [
    'entry.Detail',
    'entry.Grid'
  ],

  refs: [
    {
      ref: 'navSearch',
      selector: 'navsearch'
    },
    {
      ref: 'entryGrid',
      selector: 'entrygrid'
    }
  ],

  /**
   *
   */
  init: function() {
    this.control({
      'navsearch button[text=Search]': {
        click: this.formSubmit
      },
      'navsearch textfield': {
        specialkey: function(field, e) {
          if (e.getKey() == e.ENTER) {
            this.formSubmit(field);
          }
        }
      }
    });
  },

  /**
   *
   * @param bt
   */
  formSubmit: function(bt) {
    var cl = this.getEntryGrid().getEl();

    cl.mask('Chargement...');

    bt.up('form').getForm().submit({
      scope: this,
      success: function(form, action) {
        this.getEntryStore().removeAll();
        this.getEntryStore().loadData(action.result.data);
        cl.unmask();
      }
    });
  }
});