Ext.application({
  name: 'MV',

  paths: {
    'Ext.ux': '../vendor/ext/ux/'
  },

  controllers: [
    'Main',
    'Entry'
  ],

  autoCreateViewport: true
});