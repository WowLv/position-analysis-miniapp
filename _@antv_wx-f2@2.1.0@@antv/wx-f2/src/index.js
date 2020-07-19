
const F2 = require('@antv/f2/lib/core');
const Animation = require('@antv/f2/lib/animation/detail');
F2.Chart.plugins.register(Animation);
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
F2.Chart.plugins.register(Tooltip);
const Legend = require('@antv/f2/lib/plugin/legend');
F2.Chart.plugins.register(Legend);
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
F2.Chart.plugins.register(ScrollBar);
require('@antv/f2/lib/geom/line'); // 只加载折线图
require('@antv/f2/lib/geom/interval'); // 只加载柱状图
require('@antv/f2/lib/geom/polygon'); // 只加载色块图
require('@antv/f2/lib/coord/polar'); // 极坐标
require('@antv/f2/lib/component/axis/circle'); // 弧长坐标轴（用于极坐标）
require('@antv/f2/lib/interaction/interval-select'); // 只引入 interval-select 柱状图选中交互
require('@antv/f2/lib/interaction/pan'); // 只引入 pan 图表平移交互

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onInit: {
      type: 'Function',
      value: () => {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.f2-canvas')
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const { node, width, height } = res[0];
        const context = node.getContext('2d');
        const pixelRatio = wx.getSystemInfoSync().pixelRatio;
        // 高清设置
        node.width = width * pixelRatio;
        node.height = height * pixelRatio;
        const config = { context, width, height, pixelRatio };
        const chart = this.data.onInit(F2, config);
        if (chart) {
          this.chart = chart;
          this.canvasEl = chart.get('el');
        }
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    },
    touchMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    }
  }
});
