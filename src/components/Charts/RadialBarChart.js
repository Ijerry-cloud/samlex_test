import React from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

export default function RadialBarChart (props) {
  const { options, series } = props;

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      width="100%"
      height="100%"
    />
  );

}

