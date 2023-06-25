export const barChartData = [
  {
    name: "Sales",
    data: [330100, 250000, 110200, 100300, 231490, 135000, 270240, 130250, 425200],
  },
];

export const barChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      backgroundColor: "red",
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        backgroundColor: "red",
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    show: false,
    labels: {
      show: false,
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "#fff",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
  },
  fill: {
    colors: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "12px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
};

export const TransferPieChartData = [44, 55, 13, 43];

export const TransferPieChartOptions = {
  chart: {
    type: 'pie',
  },
  labels: ['Daily Limit', 'Single Limit', 'Duplicate Transfer', 'Above Balance'],
  legend: {
    labels: {
      useSeriesColors: true,
  }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};

export const TransferRadialChartData = [76, 67, 61, 90];

export const TransferRadialChartOptions = {
  chart: {
    height: 390,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        }
      }
    }
  },
  colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
  labels: ['JAN 5', 'JAN 24', 'JAN 3', 'JAN 17'],
  legend: {
    show: true,
    floating: true,
    fontSize: '15px',
    position: 'left',
    offsetX: 110,
    offsetY: 2,
    labels: {
      useSeriesColors: true,
    },
    markers: {
      size: 0
    },
    formatter: function(seriesName, opts) {
      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
    },
    itemMargin: {
      vertical: 1
    }
  },
  responsive: [{
    breakpoint: 1080,
    options: {
      legend: {
          show: false
      }
    }
  }]
};


export const AirtimeBarChartData = [{
  name: 'Succesful Transactions',
  data: [44, 55, 41, 67, 22, 43]
}, {
  name: 'Failed Transactions',
  data: [13, 23, 20, 8, 13, 27]
}];

export const AirtimeBarChartOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900,
            color: '#ffffff'
          }
        }
      }
    },
  },
  xaxis: {
    categories: ['12:00am-3:59am', '4:00am-7:59am', '8:00am-11:59am', '12:00pm-3:59pm',
      '4:00pm-7:59pm', '8:00pm-11:59pm'
    ],
    labels: {
      style: {
        colors: '#fff',
      }
    }
  },
  colors: ['#fff', '#fff'],
  legend: {
    position: 'right',
    offsetY: 40,
    labels: {
      useSeriesColors: true,
  },
  markers: {
    fillColors: ['#05f956', '#f90505'],
  }
  },
  responsive: [{
    breakpoint: 780,
    options: {
      legend: {
          show: false
      },
      xaxis: {
        labels: {
          show: false
        }
      }
    }
  }],
  fill: {
    colors: ['#4fd159', '#ff0000'],
    opacity: 1
  }
};

export const AirtimeRadialChartData = [76, 67, 61, 90];

export const AirtimeRadialChartOptions = {
  chart: {
    height: 390,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        }
      }
    }
  },
  colors: ['#ff0000', '#4fd159', '#ffc00f', '#09439b'],
  labels: ['AirtelVTU', 'GloVTU', 'MtnVTU', 'EtisalatVTU'],
  legend: {
    show: true,
    floating: true,
    fontSize: '15px',
    position: 'left',
    offsetX: 110,
    offsetY: 2,
    labels: {
      useSeriesColors: true,
    },
    markers: {
      size: 0
    },
    formatter: function(seriesName, opts) {
      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
    },
    itemMargin: {
      vertical: 1
    }
  },
  responsive: [{
    breakpoint: 1080,
    options: {
      legend: {
          show: false
      }
    }
  }]
};

export const lineChartData = [
  {
    name: "Transaction Limit",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Overdrawn Transaction Limit",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#5A8100", "#ffb400"],
  },
  colors: ["#5A8100", "#ffb400"],
};
