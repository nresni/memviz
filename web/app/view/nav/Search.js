Ext.define('MV.view.nav.Search', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.navsearch',

  margins: '5 0 5 5',

  title: 'Recherche',

  initComponent: function() {
    this.items = [
      {
        xtype: 'form',
        layout: 'hbox',
        defaultType: 'textfield',
        height: 80,
        bodyPadding: 15,
        border: false,
        url: '/search',
        method: 'Get',
        defaults: {
          cls: "search-field"
        },
        items: [
          {
            value: '127.0.0.1',
            fieldLabel: 'Host',
            name: 'host',
            labelWidth: 30
          },
          {
            value: '11211',
            fieldLabel: 'Port',
            name: 'port',
            labelWidth: 30
          },
          {
            fieldLabel: 'Term/RegExp',
            name: 'query',
            labelWidth: 80
          },
          {
            xtype: "button",
            text: 'Search',
            marginLeft: 50
          }
        ]
      }
    ];

    this.callParent(arguments);
  }
});