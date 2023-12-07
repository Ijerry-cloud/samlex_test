import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: lineChartData,
      chartOptions: lineChartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export function LineChart1(props) {
  //const { options, series } = props;

  return (

    <div id="areachart">
      <ReactApexChart options={lineChartOptions} series={[
        {
          name: "FASS Limit",
          data: [50, 40, 500, 220, 500],
        },
      ]} type="area" height={350} />
    </div>

  );

}

export default LineChart;
