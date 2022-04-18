import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import MixedData from "./MixedData";
import MetricVisual from "./MetricVisual";
import _ from "lodash";
import { ChartService } from "../../services";
import ExportChart from "../../helpers/exportChart";
import moment from "moment";
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
    this.callAPI();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.history.location.state &&
      prevProps.history.location.state.trigger
    ) {
      this.callAPI();
    }
  }

  callAPI() {
    let code = _.chain(this.props).get("chartData").first().get("id").value();

    let selectedRange, startRange, endRange;

    if (localStorage.getItem("startDate") && localStorage.getItem("endDate")) {
      startRange = moment(localStorage.getItem("startDate")).valueOf();
      endRange = moment(localStorage.getItem("endDate")).valueOf();
    } else {
      startRange = moment().startOf("year");
      endRange = moment().endOf("year");
      startRange = Number(startRange);
      endRange = Number(endRange);
    }

    selectedRange = { startDate: startRange, endDate: endRange };

    let payload = {
      RequestInfo: {
        authToken: "null",
      },
      headers: {
        tenantId: "null",
      },
      aggregationRequestDto: {
        dashboardId: "home",
        visualizationType: "METRIC",
        visualizationCode: code,
        queryType: "",
        filters: {},
        moduleLevel: "",
        aggregationFactors: null,
        requestDate: selectedRange,
      },
    };

    ChartService.getChartData(payload).then(
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
        case "LINE_BAR":
          return (
            <MixedData
              chartData={data}
              label={this.props.label}
              unit={this.state.unit}
              GFilterData={this.props.GFilterData}
              dimensions={this.props.dimensions}
              section={this.props.section}
            />
          );
        case "METRICCOLLECTION":
          return (
            <MetricVisual
              chartData={data}
              label={this.props.label}
              unit={this.state.unit}
              GFilterData={this.props.GFilterData}
              dimensions={this.props.dimensions}
              section={this.props.section}
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
