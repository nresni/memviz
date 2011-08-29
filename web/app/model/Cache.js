Ext.define('MV.model.Cache', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'key', type: 'string'},
      {
        name: 'value',
        convert: function(value, record) {
          return Ext.JSON.encode(value);
        }
      }
    ]
});