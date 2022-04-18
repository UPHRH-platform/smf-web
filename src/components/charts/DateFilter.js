import React, { Component } from "react";
import * as moment from "moment";
import { ChartService } from "../../services";
// import _ from "lodash";
import DatePicker from "../date-picker/DatePicker";

/**
 * Custom Date Filter component
 */

class DateFilter extends Component {
  container = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      showDateFilter: false,
      showCustomDateFilter: false,
      showDropDown: false,
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
      dateListOne: [
        {
          date: [moment().startOf("isoWeek"), moment().endOf("isoWeek")],
          filter: "This week",
        },
        {
          date: [moment().startOf("month"), moment().endOf("month")],
          filter: "This month",
        },
        {
          date: [
            moment().quarter(moment().quarter()).startOf("quarter"),
            moment().quarter(moment().quarter()).endOf("quarter"),
          ],
          filter: "This quarter",
        },
        {
          date: [moment().startOf("year"), moment().endOf("year")],
          filter: "This year",
        },
      ],
      dateListTwo: [
        {
          date: [
            moment().subtract(1, "weeks").startOf("isoWeek"),
            moment().subtract(1, "weeks").endOf("isoWeek"),
          ],
          filter: "Last week",
        },
        {
          date: [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
          filter: "Last month",
        },
        {
          date: [
            moment()
              .quarter(moment().quarter())
              .subtract(1, "quarter")
              .startOf("quarter"),
            moment()
              .quarter(moment().quarter())
              .subtract(1, "quarter")
              .endOf("quarter"),
          ],
          filter: "Last quarter",
        },
        {
          date: [
            moment().subtract(1, "year").startOf("year"),
            moment().subtract(1, "year").endOf("year"),
          ],
          filter: "Last year",
        },
      ],
      dateListThree: [
        {
          date: [moment().subtract(6, "days"), moment()],
          filter: "Last 7 days",
        },
        {
          date: [moment().subtract(29, "days"), moment()],
          filter: "Last 30 days",
        },
        {
          date: [moment().subtract(3, "month"), moment()],
          filter: "Last 3 months",
        },
        {
          date: [moment().subtract(6, "month"), moment()],
          filter: "Last 6 months",
        },
      ],
      dateColumnOneHeader: [
        {
          date: [moment().startOf("day"), +moment().endOf("day")],
          filter: "Today",
        },
      ],
      dateColumnTwoHeader: [
        {
          date: [
            moment().subtract(1, "days").startOf("day"),
            moment().subtract(1, "days").endOf("day"),
          ],
          filter: "Yesterday",
        },
      ],
      showOne: false,
    };

    this.showFilter = this.showFilter.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    if (
      !localStorage.getItem("selectedFilter") &&
      !localStorage.getItem("selectedDate")
    ) {
      let thisMonthRange =
        moment().startOf("month").format("DD MMM") +
        " - " +
        moment().endOf("month").format("DD MMM");
      this.setState({
        selectedFilter: "This month",
        selectedDate: thisMonthRange,
      });
    } else {
      this.setState({
        selectedFilter: localStorage.getItem("selectedFilter"),
        selectedDate: localStorage.getItem("selectedDate"),
      });
    }

    if (localStorage.getItem("currentDashId")) {
      ChartService.getDashboardConfig().then(
        (response) => {
          this.setState((prevState) => ({
            ...prevState,
            dashboardConfigData: response.responseData,
          }));
        },
        (error) => {}
      );
    } else {
      setTimeout(
        () =>
          ChartService.getDashboardConfig().then(
            (response) => {
              this.setState((prevState) => ({
                ...prevState,
                dashboardConfigData: response.responseData,
              }));
            },
            (error) => {}
          ),
        1000
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {
      if (nextProps.history.location.state !== undefined) {
        if (nextProps.history.location.state !== null) {
          if (nextProps.history.location.state.trigger === true) {
            this.setState({
              showDropDown: false,
            });
            if (
              localStorage.getItem("selectedFilter") &&
              localStorage.getItem("selectedDate")
            ) {
              this.setState({
                selectedFilter: localStorage.getItem("selectedFilter"),
                selectedDate: localStorage.getItem("selectedDate"),
              });
            }
          }
        } else {
          this.setState({
            showDropDown: false,
          });
          if (
            localStorage.getItem("selectedFilter") &&
            localStorage.getItem("selectedDate")
          ) {
            this.setState({
              selectedFilter: localStorage.getItem("selectedFilter"),
              selectedDate: localStorage.getItem("selectedDate"),
            });
          }
        }
      }
    }
  }

  /**
   * Function to update the chart visualization
   */
  updateVisuals = () => {
    this.setState({
      trigger: true,
    });
    this.props.history.push({
      pathname: "/analytics",
      state: { trigger: this.state.trigger },
    });

    setTimeout(() => {
      this.setState(
        {
          trigger: false,
        },
        () => {
          this.props.history.push({
            pathname: "/analytics",
            state: { trigger: this.state.trigger },
          });
        }
      );
    }, 150);
  };

  /**
   * Toggle function to show/hide the custom date filters
   */
  showFilter = () => {
    this.setState({
      showDateFilter: true,
      showDropDown: true,
    });
  };

  /**
   * Function to close date dropdown
   * when the user clicks outside it
   */
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        showDateFilter: false,
        showDropDown: false,
      });
    }
  };

  /**
   * Function to get date selected from the custom date filter
   */
  async getDate(dateFilter) {
    await this.setState(
      {
        selectedFilter: dateFilter.filter,
        selectedDate:
          moment(dateFilter.date[0]._d).format("DD MMM") +
          " - " +
          moment(dateFilter.date[1]._d).format("DD MMM"),
        showDateFilter: false,
        showCustomDateFilter: false,
        startDate: dateFilter.date[0],
        endDate: dateFilter.date[1],
      },
      () => {
        localStorage.setItem("selectedFilter", this.state.selectedFilter);
        localStorage.setItem("selectedDate", this.state.selectedDate);
      }
    );
    await localStorage.setItem("startDate", moment(dateFilter.date[0]));
    await localStorage.setItem("endDate", moment(dateFilter.date[1]));
    this.updateVisuals();
  }

  /**
   * Function to show/hide the date range picker
   */
  getCustomDate = () => {
    this.setState({
      showCustomDateFilter: true,
    });
  };

  /**
   * Function to get the date range
   * from the date range picker
   */
  onDateChange = (e, l) => {
    if (e !== null && l !== null) {
      let finalRange =
        moment(e).format("DD MMM") + " - " + moment(l).format("DD MMM");
      this.setState(
        {
          selectedFilter: finalRange,
          selectedDate: finalRange,
        },
        () => {
          localStorage.setItem("selectedFilter", this.state.selectedFilter);
          localStorage.setItem("selectedDate", this.state.selectedDate);
        }
      );
      localStorage.setItem("startDate", moment(e));
      localStorage.setItem("endDate", moment(l));
      if (
        localStorage.getItem("startDate") !== "Invalid date" &&
        localStorage.getItem("endDate") !== "Invalid date"
      ) {
        this.setState({ showCustomDateFilter: false, showDateFilter: false });
        this.updateVisuals();
        setTimeout(() => this.updateVisuals(), 1000);
      }
    }
  };

  render() {
    return (
      <div className="mt-3">
        {!this.state.showDateFilter && (
          <div className="btn-group custom-filter-btn">
            <button type="button" className="btn">
              <label
                className="custom-filter-label"
                style={{ lineHeight: "0" }}
              >
                Period
              </label>
              <div className="vertical-separator"></div>
            </button>

            <button
              type="button"
              className="btn dropdown-toggle dropdown-toggle-split"
              onClick={this.showFilter}
            >
              <span className="sr-only">Toggle Dropdown</span>
              <span className="custom-filter-selected-value pe-4">
                {this.state.selectedFilter}
              </span>
            </button>
          </div>
        )}
        {this.state.showDateFilter && (
          <div className="btn-group custom-filter-btn">
            <button type="button" className="btn">
              <label
                className="custom-filter-label"
                style={{ lineHeight: "0" }}
              >
                Period
              </label>
              <div className="vertical-separator"></div>
            </button>

            <button
              type="button"
              className="btn dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={this.showFilter}
            >
              <span className="sr-only">Toggle Dropdown</span>
              <span className="custom-filter-selected-value pe-4">
                {this.state.selectedFilter}
              </span>
            </button>

            <div className="dropdown-menu"></div>
          </div>
        )}
        {this.state.showDateFilter && this.state.showDropDown && (
          <div className="container" ref={this.container}>
            {!this.state.showCustomDateFilter && (
              <div className="date-dropdown">
                <h6 className="ms-4 font-weight-bold pt-4">
                  <b>Presets</b>
                </h6>

                <div className="row p-0">
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5 mb-3">
                    <div className="d-md-flex ms-4 mb-1 customMargin mt-2">
                      <div className="me-2">
                        <div className="">
                          {this.state.dateColumnOneHeader.map((dateFilter) => (
                            <p
                              id="dateList"
                              key={dateFilter.filter}
                              className={
                                this.state.selectedFilter === dateFilter.filter
                                  ? "active-filter p-1"
                                  : "p-1"
                              }
                              onClick={() => this.getDate(dateFilter)}
                            >
                              {dateFilter.filter}
                            </p>
                          ))}
                        </div>
                        <div className="customMargin">
                          {this.state.dateColumnTwoHeader.map((dateFilter) => (
                            <p
                              id="dateList"
                              key={dateFilter.filter}
                              className={
                                this.state.selectedFilter === dateFilter.filter
                                  ? "active-filter p-1"
                                  : "p-1"
                              }
                              onClick={() => this.getDate(dateFilter)}
                            >
                              {dateFilter.filter}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="me-2">
                        {this.state.dateListOne.map((dateFilter) => (
                          <p
                            id="dateList"
                            key={dateFilter.filter}
                            className={
                              this.state.selectedFilter === dateFilter.filter
                                ? "active-filter p-1"
                                : "p-1"
                            }
                            onClick={() => this.getDate(dateFilter)}
                          >
                            {dateFilter.filter}
                          </p>
                        ))}
                      </div>

                      <div className="customMargin me-2">
                        {this.state.dateListTwo.map((dateFilter) => (
                          <p
                            id="dateList"
                            key={dateFilter.filter}
                            className={
                              this.state.selectedFilter === dateFilter.filter
                                ? "active-filter p-1"
                                : "p-1"
                            }
                            onClick={() => this.getDate(dateFilter)}
                          >
                            {dateFilter.filter}
                          </p>
                        ))}
                      </div>

                      <div className="customMargin me-2">
                        {this.state.dateListThree.map((dateFilter) => (
                          <p
                            id="dateList"
                            key={dateFilter.filter}
                            className={
                              this.state.selectedFilter === dateFilter.filter
                                ? "active-filter p-1"
                                : "p-1"
                            }
                            onClick={() => this.getDate(dateFilter)}
                          >
                            {dateFilter.filter}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-sm-12 col-md-12 col-lg-8 col-xl-7 col-xxl-7"
                    style={{ marginTop: "-1.75rem" }}
                  >
                    <div className="me-5">
                      <DatePicker
                        pathName={this.props}
                        history={this.props.history}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DateFilter;
