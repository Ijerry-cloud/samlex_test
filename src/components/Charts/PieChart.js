import React from "react";
import Card from "components/Card/Card";
import ReactApexChart from "react-apexcharts";

export default function Piechart (props) {
    const { height, options, series } = props;
  
    return (
  
      <Card
      py="1rem"
      height={height}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="100%"
      />
    </Card>
    );
  
  }