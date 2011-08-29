Ext.define('MV.view.nav.Nav', {
  extend: 'Ext.form.Panel',
  alias : 'widget.nav',
  layout: 'vbox',
  title: 'Navigation',
  region:'west',
  width: 300,
  collapsible: true,

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
            fieldLabel: 'Term',
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