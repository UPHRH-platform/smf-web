import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import _ from "lodash";
import { ChartService } from "../../services";
import ExportChart from "../../helpers/exportChart";

/**
 * Component to genearte the required charts
 * as per the response from the API
 */

class ChartType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartsGData: {},
    };
  }

  componentDidMount() {
    console.log("ChartType...")
    this.callAPI();
  }

  callAPI() {
    let code = _.chain(this.props).get("chartData").first().get("id").value();

    ChartService.getChartData(code).then(
      (response) => {
        this.setState((prevState) => ({
          ...prevState,
          chartsGData: {
            ...prevState.chartsGData,
            [code]: response.responseData,
          },
        }));
      },
      (error) => {}
    );
  }

  render() {
    let chartKey = _.chain(this.props)
      .get("chartData")
      .first()
      .get("id")
      .value();

    let chartType = _.chain(this.props)
      .get("chartData")
      .first()
      .get("chartType")
      .toUpper()
      .value();

    let data = _.chain(this.state)
      .get("chartsGData")
      .get(chartKey)
      .get("data")
      .value();

    let filter = _.chain(this.props)
      .get("chartData")
      .first()
      .get("filter")
      .value();

    let deepFilter = _.chain(this.state)
      .get("chartsGData")
      .get(chartKey)
      .get("filter")
      .value();

    let drillDownId = _.chain(this.state)
      .get("chartsGData")
      .get(chartKey)
      .get("drillDownChartId")
      .value();

    if (filter) {
      localStorage.setItem("filterKey", filter);
    } else if (deepFilter) {
      localStorage.setItem("filterKey", deepFilter);
    }

    if (data) {
      ExportChart.setAttribute(chartKey, data);

      switch (chartType) {
        case "PIE":
          return (
            <PieChart
              chartData={data}
              label={this.props.label}
              unit={this.state.unit}
              GFilterData={this.props.GFilterData}
              dimensions={this.props.dimensions}
              section={this.props.section}
              pathName={this.props.pathName.pathProps}
            />
          );

        case "LINE":
          return (
            <LineChart
              chartData={data}
              label={this.props.label}
              unit={this.state.unit}
              GFilterData={this.props.GFilterData}
              dimensions={this.props.dimensions}
              section={this.props.section}
              pathName={this.props.pathName.pathProps}
            />
          );
        case "BAR":
          return (
            <BarChart
              chartData={data}
              label={this.props.label}
              unit={this.state.unit}
              GFilterData={this.props.GFilterData}
              dimensions={this.props.dimensions}
              section={this.props.section}
              pathName={this.props.pathName.pathProps}
              drillDownId={drillDownId}
              filter={filter}
            />
          );
        default:
          return false;
      }
    }
    return <div> Loading... </div>;
  }
}

export default ChartType;
