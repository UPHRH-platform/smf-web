import React, { Component } from "react";
import * as moment from "moment";
import _ from "lodash";
import "file-saver";
// import domtoimage from "dom-to-image";
import { ChartService } from "../../services";

/**
 * Widget Navbar Component
 * Holds all the widgets and drill throught filter labels
 */

class WidgetNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDateFilter: false,
      showCustomDateFilter: false,
      dashboardConfigData: [],
      selectedDate: moment().format("DD MMM YY"),
      selectedFilter: "Today",
      rangeSelected: "",
      startDate: "",
      endDate: "",
      trigger: "",
      selectedTab: "",
      tabsInitDataId: [],
      chartsGData: {},
      widgetData: [],
      showOne: false,
    };
  }

  componentDidMount() {
    let thisMonthRange =
      moment().startOf("month").format("DD MMM") +
      " - " +
      moment().endOf("month").format("DD MMM");
    this.setState({
      selectedFilter: "This month",
      selectedDate: thisMonthRange,
    });

    ChartService.getDashboardConfig().then(
      (response) => {
        this.setState((prevState) => ({
          ...prevState,
          dashboardConfigData: response.responseData,
        }));
        if (!this.state.chartsGData.length) {
          setTimeout(() => this.getWidgets(), 150);
        }
      },
      (error) => {}
    );
  }

  /**
   * Function to get the chart data as per the dashboard selection
   */
  getChartData = (code) => {
    let startRange = moment().startOf("month");
    let endRange = moment().endOf("month");
    startRange = Number(startRange);
    endRange = Number(endRange);
    let thisMonth = { startDate: startRange, endDate: endRange };

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
        requestDate: thisMonth,
      },
    };

    ChartService.getChartData(payload).then(
      (response) => {
        this.setState(
          (prevState) => ({
            ...prevState,
            chartsGData: {
              ...prevState.chartsGData,
              [code]: response.responseData,
            },
          }),
          () => {
            let chartDetails = JSON.stringify(this.state.chartsGData);
            chartDetails = JSON.parse(chartDetails);
            chartDetails = _.chain(chartDetails).map();
            chartDetails = JSON.stringify(chartDetails);
            chartDetails = JSON.parse(chartDetails);
            let chartData = [];
            chartDetails.map((details) => chartData.push(details.data[0]));
            this.setState({
              widgetData: [...chartData],
            });
          }
        );
      },
      (error) => {}
    );
  };

  /**
   * Function to get the widgets data as per the dashboard selection
   */
  getWidgets = () => {
    let data = this.state.dashboardConfigData;
    let dashboardWidget = _.chain(data)
      .first()
      .get("widgetCharts")
      .groupBy("name")
      .value();
    let widgetArray = _.chain(dashboardWidget).map();
    widgetArray = JSON.stringify(widgetArray);
    widgetArray = JSON.parse(widgetArray);
    let id = [];
    widgetArray.map((code) => id.push(code[0].id));
    id.map((code) => this.getChartData(code));
  };

  filterImage = (node) => {
    return (
      node.id !== "downloadDashIcon" &&
      node.id !== "dropdownMenuButton" &&
      node.id !== "zoomIn" &&
      node.id !== "zoomOut" &&
      node.id !== "zoomInBtn" &&
      node.id !== "zoomOutBtn"
    );
  };

  /**
   * Function to update the chart visualization
   */
  updateVisuals = () => {
    this.setState({
      trigger: true,
    });
    this.props.pathName.history.push({
      pathName: "/dashboards",
      state: { trigger: this.state.trigger },
    });
    setTimeout(() => {
      this.props.pathName.history.push({
        pathName: "/dashboards",
        state: { trigger: this.state.trigger },
      });
    }, 500);
  };

  render() {
    return (
      <div className="mt-4">
        <div
          className={`row col-12 ${
            this.state.widgetData && this.state.widgetData.length > 0
              ? "mt-4"
              : "mt-0"
          }`}
          id="widgets"
        >
          {this.state.widgetData.map((data, index) => (
            <div
              className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 pb-3 pb-xs-3 pb-sm-3 pb-md-3 pb-lg-0 pb-xl-0 widget_card_one px-4"
              key={data.headerName}
            >
              {(data.headerName || data.headerValue) && (
                <div className={`me-2 pt-3 widget-box-${index + 1}`}>
                  <h2 className="mt-3">
                    {!data.isDecimal ? (
                      <p>{Math.round(data.headerValue)}</p>
                    ) : (
                      <p>{data.headerValue}</p>
                    )}
                  </h2>
                  <label className="pb-3">{data.headerName}</label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default WidgetNavBar;
