import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { STATS_BAR_HEIGHT } from '../constans.js';
import { humanizeEventDurationDate, getDiff } from '../utils/date.js';

import Smart from '../view/smart.js';

const renderMoneyChart = (moneyCtx, events) => {

  const result = events.reduce((a,c) => (a[c.type] = (a[c.type] || 0) + c.base_price, a), {});

  const types = Object.keys(result).map((e) => e.toUpperCase());
  const sumPrice = Object.values(result);

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: sumPrice,
        backgroundColor: '#D29BD8',
        hoverBackgroundColor: '#E3BFE7',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: function(value, context) { // _
            return `€ ${context.chart.data.datasets[0].data[context.dataIndex]}`;
          },
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  return moneyChart;
};

const renderTypeChart = (typeCtx, events) => {

  const result = events.reduce((a,c) => (a[c.type] = (a[c.type] || 0) + 1, a), {});

  const types = Object.keys(result).map((e) => e.toUpperCase());
  const sumPrice = Object.values(result);

  const typeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: sumPrice,
        backgroundColor: '#9FD89B',
        hoverBackgroundColor: '#B9E2B6',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: function(value, context) {
            return context.chart.data.datasets[0][context.dataIndex];
          },
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};

const renderTimeChart = (timeCtx, events) => {
  const result = events.reduce((a,c) => (a[c.type] = (a[c.type] || 0) + getDiff(c.date_from, c.date_to), a), {});

  dayjs.extend(duration);

  const types = Object.keys(result).map((e) => e.toUpperCase());
  const times = Object.values(result);

  const typeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: times,
        backgroundColor: '#D8C49B',
        hoverBackgroundColor: '#E9DCC0',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: function(_, context) {
            return humanizeEventDurationDate(dayjs.duration(context.chart.data.datasets[0].data[context.dataIndex]).$d);
          },
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Statistics extends Smart {
  constructor(events) {
    super();
    this._events = events;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._renderMoneyChart !== null || this._renderTypeChart !== null || this.__renderTimeChart !== null) {
      this._renderMoneyChart = null;
      this._renderTypeChart = null;
      this._renderTimeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    moneyCtx.height = STATS_BAR_HEIGHT * 5;
    typeCtx.height = STATS_BAR_HEIGHT * 5;
    timeCtx.height = STATS_BAR_HEIGHT * 5;

    this._renderMoneyChart = renderMoneyChart(moneyCtx, this._events);
    this._renderTypeChart = renderTypeChart(typeCtx, this._events);
    this._renderTimeChart = renderTimeChart(timeCtx, this._events);
  }
}

