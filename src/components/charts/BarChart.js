import React from "react";
import { Bar } from "react-chartjs-2";
import NFormatterFun from "./NFormatterFun";
import _ from "lodash";
import barPalette from "./palette";

/**
 * BarChart component
 */

const options = {
  scales: {
    y: {
      grid: {
        display: true,
      },
      ticks: {
        font: {
          family: "Lato-Regular",
          size: 12,
          lineHeight: 1.333,
        },
      },
    },
    x: {
      grid: {
        display: true,
      },
      ticks: {
        font: {
          family: "Lato-Regular",
          size: 12,
          lineHeight: 1.333,
        },
      },
    },
  },
  responsive: true,
  options: {
    responsive: true,
    maintainAspectRatio: true,
  },
  plugins: {
    legend: {
      position: "bottom",
      display: true,
      labels: {
        font: {
          family: "Lato-Regular",
          size: 14,
          lineHeight: 1.429,
        },
      },
    },
    datalabels: {
      anchor: "end",
      align: "end",
    },
  },
};

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: "",
      chartsGData: {},
      isData: false,
    };
  }

  manupulateData(chartData) {
    var barTempData = {
      labels: [],
      datasets: [],
    };
    let colors = barPalette("cb-BasePalette2", chartData.length).map(function (
      hex
    ) {
      return "#" + hex;
    });
    chartData.forEach((d, i) => {
      let barTempObj = {
        label: "",
        borderColor: colors[i],
        backgroundColor: colors[i],
        fill: false,
      };
      let tempdataArr = [];
      let tempdatalabel = [],
        tempVal = "";
      barTempObj.label = d.headerName;
      d.plots.forEach((d1, i) => {
        tempVal = NFormatterFun(d1.value, d1.symbol, "Unit");
        tempVal =
          typeof tempVal == "string"
            ? parseFloat(tempVal.replace(/,/g, ""))
            : tempVal;
        tempdataArr.push(d1.value);
        if (d1.name.length > 20) {
          tempdatalabel.push(d1.name.match(/.{1,20}\S+\s*/g));
        } else {
          tempdatalabel.push(d1.name);
        }
      });
      barTempObj.data = tempdataArr;
      barTempData.labels = tempdatalabel;
      barTempData.datasets.push(barTempObj);
    });

    return barTempData;
  }

  contextMenu = (e) => {
    e.preventDefault();

    this.setState({
      isData: false,
    });
  };

  render() {
    let { chartData } = this.props;
    let { drillDownId } = this.props;
    let data;

    /*
     * Drilldown chart data
     */
    let drillDownData = _.chain(this.state.chartsGData)
      .get(drillDownId)
      .get("data")
      .value();

    /*
     * Condition to load drill down datasets
     * if user enabled the drill down feature
     */
    if (this.state.isData) {
      if (drillDownData !== undefined) {
        data = this.manupulateData(drillDownData);
      } else {
        data = this.manupulateData(chartData);
      }
    } else {
      data = this.manupulateData(chartData);
    }

    if (data) {
      return (
        <div onContextMenu={this.contextMenu}>
          <Bar
            height={this.props.dimensions.height}
            style={{ fill: "none" }}
            data={data}
            options={options}
            plugins={[
              {
                beforeInit: (chart, options) => {
                  chart.legend.afterFit = () => {
                    if (chart.legend.margins) {
                      chart.legend.options.labels.padding = 20;
                    }
                  };
                },
              },
            ]}
          ></Bar>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default BarChart;
