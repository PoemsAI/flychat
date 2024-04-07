Component({
  properties: {
    // yuyin | shanchu | jiesuo | shouji | sousuo | yuyin1 | weixin | qiangzhiqingchu | fasong | yonghu | jingyin | fenxiang | qingchushujuku | tianjia- | tuichu- | apple | guanyu_o | shoucang | biaoshimoxing | bianji | brightj2 | shezhi | sousuo1 | daohang | good | shengyin | ef-redian-gongju | tianjia | jiqiren | yuyan | zhiding | message | biyan | yuyan1 | jubao | chatgpt | chat-gpt | mofabang
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      value: '',
      observer: function(color) {
        this.setData({
          colors: this.fixColor(color),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * swan.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18 / 750 * swan.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
