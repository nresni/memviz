Ext.define('MV.view.nav.Search', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.navsearch',

  margins: '5 0 5 5',
  width: 300,

  title: 'Recherche',

  initComponent: function() {
    this.items = [
      {
        xtype: 'form',
        layout: 'vbox',
        defaultType: 'textfield',
        height: 150,
        bodyPadding: 10,
        border: false,
        url: '/search',
        method: 'Get',
        items: [
          {
            value: '127.0.0.1',
            fieldLabel: 'Host',
            name: 'host'
          },
          {
            value: '11211',
            fieldLabel: 'Port',
            name: 'port'
          },
          {
            fieldLabel: 'Term/RegExp',
            name: 'query'
          }
        ],
        buttons: [
          {
            text: 'Search'
          }
        ]
      }
    ];

    this.callParent(arguments);
  }
});