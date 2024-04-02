Component({
  properties: {
    // yuyin | shanchu | jiesuo | shouji | sousuo | yuyin1 | weixin | qiangzhiqingchu | fasong | yonghu | jingyin | fenxiang | qingchushujuku | tianjia- | tuichu- | apple | guanyu_o | shoucang | biaoshimoxing | bianji | brightj2 | shezhi | sousuo1 | daohang | good | shengyin | ef-redian-gongju | tianjia | jiqiren | yuyan | zhiding | message | biyan | yuyan1 | jubao | chatgpt | chat-gpt | mofabang
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * qq.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    svgSize: 18 / 750 * qq.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
});
