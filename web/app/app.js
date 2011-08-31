Ext.application({
  name: 'MV',
  appFolder: 'app',

  controllers: [
    'Main'
  ],

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      defaults: {
        autoScroll: true
      },
      items: [
        {
          region: 'center',
          xtype: 'dashboard'
        }
      ]
    });
  }
});