Ext.application({
  name: 'MV',

  appFolder: 'app',

  controllers: [
    'Memviz'
  ],

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      defaults: {
        split: true
      },
      items: [
        {
          xtype: 'panel',
          layout: 'border',
          region: 'center',
          defaults: {
            collapsible: true,
            split: true
          },
          items: [
            {
              xtype: 'memvizlist',
              collapsible: false,
              region:'center'
            },
            {
              title: 'Footer',
              region: 'south',
              height: 500,
              minSize: 75,
              maxSize: 250
            }
          ]
        },
        {
          title: 'Navigation',
          region:'west',
          width: 175,
          minSize: 100,
          maxSize: 250,
          collapsible: true
        }
      ]
    });
  }
});