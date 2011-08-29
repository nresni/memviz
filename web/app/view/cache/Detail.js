Ext.define('MV.view.cache.Detail', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.cachedetail',
  layout: 'fit',
  title : 'Entry detail',
  autoScroll: true,

  initComponent: function() {

    Ext.apply(this, {
      tpl: new Ext.XTemplate(
        '<div class="cache-data">',
        '<h2>Key: {key}</h2>',
        '</div>',
        '<h3">Détail</h3>',
        '<div>{value:this.getDetail}</div>', {
          getDetail: function(value, all) {
            var obj = Ext.JSON.decode(value);

            var results = [];
            Ext.Object.each(obj, function(key, o) {
              if (key == "success") {
                return false;
              }

              Ext.Object.each(o, function(index, value) {
                //results.push(value);
                results.push(this.toArr(value));
              }, this);
            }, this);

            var str = "";
            Ext.Array.each(results, function(result) {
              str += this.formatDetail(result);
            }, this);

            return str;
          },
          toArr: function(value, i) {
            var result = [];

            for (key in value) {
              if (Ext.isObject(value[key])) {
                result[key] = this.toArr(value[key]);
              } else if (Ext.isObject(value[key][0])) {
                result[key];
                for (i in value[key]) {
                  if (Ext.isDefined(result[key])) {
                    result[key].push(this.toArr(value[key][i]));
                  } else {
                    result[key] = this.toArr(value[key][i]);
                  }
                }
              } else {
                result[key] = value[key];
              }
            }

            return result;
          },
          formatDetail: function(arr) {
            var str = "";
            if (Ext.isArray(arr)) {
              for (k in arr) {
                if (Ext.isArray(arr[k])) {
                  str += k + ":" + "<br />&nbsp;&nbsp;" + this.formatDetail(arr[k])
                } else {
                  str += k + " : " + arr[k] + "<br />";
                }
              }
            } else {
              console.log(arr);
            }

            return str;
          }
        }
      )
    });

    this.callParent(arguments);
  }
});