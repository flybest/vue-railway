const chartDefaultOption = {
  color: [
    '#516b91',
    '#59c4e6',
    '#edafda',
    '#93b7e3',
    '#a5e7f0',
    '#cbb0e3'
  ],
  title: {
    text: '',
    subtext: ''
    // left: 'center'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: { show: true, title: '保存' }
    },
    left: 'right'
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{a}<br>{b0}: {c0}m/s'
  },
  grid: {
    left: '40',
    right: '40',
    bottom: '30'
  },
  xAxis: {
  },
  yAxis: {
  }
}

export default chartDefaultOption
