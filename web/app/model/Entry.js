Ext.define('MV.model.Entry', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'key', type: 'string'},
      {name: 'type', type: 'string'},
      {
        name: 'value',
        convert: function(value, record) {
          return Ext.JSON.encode(value);
        }
      }
    ]
});