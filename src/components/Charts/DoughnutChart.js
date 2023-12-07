import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { lineChartData, donutOptions } from "variables/charts";


export default function DoughnutChart(props) {
  const { options, series } = props;

  return (

    <div id="chart">
      <ReactApexChart options={donutOptions} series={[32, 33, 43, 33, 32]} type="donut" />
    </div>
  );

}
