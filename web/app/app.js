Ext.application({
  name: 'MV',
  appFolder: 'app',

  controllers: [
    'Main'
  ],

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: {
        xtype: 'dashboard'
      }
    });
  }
});