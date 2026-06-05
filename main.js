(function () {
  const chartTheme = {
    backgroundColor: 'transparent',
    textStyle: { color: '#e6edf3' },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(11,18,32,.94)',
      borderColor: '#1f2a44',
      textStyle: { color: '#e6edf3' }
    },
    grid: { left: 52, right: 32, top: 58, bottom: 46 },
    xAxis: {
      axisLine: { lineStyle: { color: '#33415f' } },
      axisLabel: { color: '#9fb0c8' },
      splitLine: { show: false }
    },
    yAxis: {
      axisLine: { lineStyle: { color: '#33415f' } },
      axisLabel: { color: '#9fb0c8' },
      splitLine: { lineStyle: { color: 'rgba(159,176,200,.14)' } }
    }
  };

  const charts = [];
  const rendered = new Set();

  function merge(base, extra) {
    return Object.assign({}, base, extra);
  }

  function initRiskChart() {
    const dom = document.getElementById('riskChart');
    if (!dom || rendered.has(dom.id)) return;
    const chart = echarts.init(dom);
    chart.setOption({
      ...chartTheme,
      title: {
        text: '风险指数在30分钟内持续攀升',
        left: 'center',
        top: 18,
        textStyle: { color: '#e6edf3', fontSize: 16 }
      },
      xAxis: merge(chartTheme.xAxis, {
        type: 'category',
        data: ['9:15', '9:22', '9:30', '9:37', '9:43', '9:45']
      }),
      yAxis: merge(chartTheme.yAxis, {
        type: 'value',
        max: 100,
        name: '风险指数',
        nameTextStyle: { color: '#9fb0c8' }
      }),
      series: [
        {
          name: '风险指数',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          data: [18, 26, 42, 58, 78, 95],
          lineStyle: { width: 4, color: '#ff4d4f' },
          itemStyle: { color: '#ff4d4f' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255,77,79,.32)' },
              { offset: 1, color: 'rgba(255,77,79,0)' }
            ])
          },
          markLine: {
            symbol: 'none',
            label: { color: '#ffb020', formatter: '安全阈值' },
            lineStyle: { color: '#ffb020', type: 'dashed' },
            data: [{ yAxis: 70 }]
          },
          animationDuration: 1800,
          animationEasing: 'cubicOut'
        }
      ]
    });
    charts.push(chart);
    rendered.add(dom.id);
  }

  function initParamChart() {
    const dom = document.getElementById('paramChart');
    if (!dom || rendered.has(dom.id)) return;
    const chart = echarts.init(dom);
    chart.setOption({
      ...chartTheme,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(11,18,32,.94)',
        borderColor: '#1f2a44',
        textStyle: { color: '#e6edf3' }
      },
      legend: {
        top: 16,
        textStyle: { color: '#9fb0c8' }
      },
      grid: { left: 70, right: 34, top: 70, bottom: 42 },
      xAxis: merge(chartTheme.xAxis, {
        type: 'category',
        data: ['风速', '能见度风险', '决策压力', '修正窗口']
      }),
      yAxis: merge(chartTheme.yAxis, {
        type: 'value',
        max: 100
      }),
      series: [
        {
          name: '安全值',
          type: 'bar',
          data: [45, 35, 40, 72],
          itemStyle: { color: '#5aa9ff', borderRadius: [6, 6, 0, 0] }
        },
        {
          name: '事件值',
          type: 'bar',
          data: [82, 88, 80, 18],
          itemStyle: { color: '#ff4d4f', borderRadius: [6, 6, 0, 0] }
        }
      ],
      animationDuration: 1400,
      animationEasing: 'quadraticOut'
    });
    charts.push(chart);
    rendered.add(dom.id);
  }

  function initFlightMapChart() {
    const dom = document.getElementById('flightMapChart');
    if (!dom || rendered.has(dom.id)) return;
    const chart = echarts.init(dom);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(11,18,32,.94)',
        borderColor: '#1f2a44',
        textStyle: { color: '#e6edf3' }
      },
      xAxis: {
        min: 0,
        max: 100,
        show: false
      },
      yAxis: {
        min: 0,
        max: 100,
        show: false
      },
      series: [
        {
          name: '风险区域',
          type: 'effectScatter',
          coordinateSystem: 'cartesian2d',
          symbolSize: 90,
          data: [
            { name: '浓雾区', value: [64, 58, 88] },
            { name: '火场烟羽', value: [48, 45, 72] }
          ],
          rippleEffect: { scale: 2.6, brushType: 'stroke' },
          itemStyle: { color: 'rgba(255,77,79,.42)' },
          z: 1
        },
        {
          name: '飞行路径',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          polyline: true,
          lineStyle: { color: '#5aa9ff', width: 4, curveness: .2 },
          effect: {
            show: true,
            symbol: 'arrow',
            symbolSize: 10,
            color: '#e6edf3',
            period: 5
          },
          data: [
            {
              coords: [[10, 76], [28, 70], [45, 62], [58, 52], [70, 38], [78, 27]]
            }
          ],
          z: 3
        },
        {
          name: '关键点',
          type: 'scatter',
          coordinateSystem: 'cartesian2d',
          symbolSize: function (value) {
            return value[2];
          },
          label: {
            show: true,
            formatter: '{b}',
            color: '#e6edf3',
            position: 'top'
          },
          itemStyle: { color: '#ffb020' },
          data: [
            { name: '起飞方向', value: [10, 76, 14] },
            { name: '决策延迟区', value: [58, 52, 18] },
            { name: '坠毁点', value: [78, 27, 22], itemStyle: { color: '#ff4d4f' } }
          ],
          z: 4
        },
        {
          name: '风向',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          lineStyle: { color: '#ffb020', width: 2, type: 'dashed' },
          effect: {
            show: true,
            symbol: 'arrow',
            symbolSize: 8,
            color: '#ffb020',
            period: 4
          },
          data: [
            { coords: [[24, 30], [54, 48]] },
            { coords: [[38, 20], [68, 38]] },
            { coords: [[52, 12], [82, 30]] }
          ],
          z: 2
        }
      ]
    });
    charts.push(chart);
    rendered.add(dom.id);
  }

  function initCauseChart() {
    const dom = document.getElementById('causeChart');
    if (!dom || rendered.has(dom.id)) return;
    const chart = echarts.init(dom);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(11,18,32,.94)',
        borderColor: '#1f2a44',
        textStyle: { color: '#e6edf3' }
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          roam: false,
          symbolSize: 72,
          label: {
            show: true,
            color: '#e6edf3',
            fontSize: 14
          },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [0, 10],
          lineStyle: { color: '#5aa9ff', width: 2, curveness: .12 },
          data: [
            { name: '低能见度', x: 80, y: 120, itemStyle: { color: '#5aa9ff' } },
            { name: '风速超限', x: 80, y: 260, itemStyle: { color: '#ffb020' } },
            { name: '风险累积', x: 290, y: 190, itemStyle: { color: '#8b5cf6' } },
            { name: '决策延迟', x: 500, y: 190, itemStyle: { color: '#ffb020' } },
            { name: '纠错失败', x: 700, y: 190, itemStyle: { color: '#ff4d4f' } },
            { name: '事故发生', x: 890, y: 190, itemStyle: { color: '#ff4d4f' } }
          ],
          links: [
            { source: '低能见度', target: '风险累积' },
            { source: '风速超限', target: '风险累积' },
            { source: '风险累积', target: '决策延迟' },
            { source: '决策延迟', target: '纠错失败' },
            { source: '纠错失败', target: '事故发生' }
          ],
          animationDuration: 1300,
          animationEasing: 'cubicOut'
        }
      ]
    });
    charts.push(chart);
    rendered.add(dom.id);
  }

  const renderers = {
    riskChart: initRiskChart,
    paramChart: initParamChart,
    flightMapChart: initFlightMapChart,
    causeChart: initCauseChart
  };

  function initVisibleCharts(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && renderers[entry.target.id]) {
        renderers[entry.target.id]();
      }
    });
  }

  function boot() {
    if (typeof echarts === 'undefined') {
      document.querySelectorAll('.chart').forEach((dom) => {
        dom.textContent = '图表库加载失败，请检查网络连接。';
      });
      return;
    }

    const observer = new IntersectionObserver(initVisibleCharts, {
      root: null,
      threshold: .25
    });

    document.querySelectorAll('.chart').forEach((dom) => observer.observe(dom));

    window.addEventListener('resize', () => {
      charts.forEach((chart) => chart.resize());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
