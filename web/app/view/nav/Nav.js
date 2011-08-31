Ext.define('MV.view.nav.Nav', {
  extend: 'Ext.Panel',
  alias : 'widget.nav',

  layout: 'vbox',

  title: 'Navigation',

  width: 300,

  initComponent: function() {
    this.items = [
      {
        xtype: 'form',
        layout: 'vbox',
        defaultType: 'textfield',
        height: 120,
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