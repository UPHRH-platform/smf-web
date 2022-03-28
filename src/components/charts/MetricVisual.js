import React from "react";

/**
 * Metric visual component
 */

class MetricVisual extends React.Component {
  getData(chartData) {
    return chartData;
  }

  render() {
    let { chartData } = this.props;
    let _data = this.getData(chartData);

    if (_data) {
      return (
        <div className="">
          {_data.map((value, index) => (
            <div className="customLineHeight" key={index}>
              <p className="metricTextColor">{value.headerName}</p>
              {!value.isDecimal ? (
                <p className="largeNum">{Math.round(value.headerValue)}</p>
              ) : (
                <p className="largeNum">{value.headerValue}</p>
              )}
              <p>&nbsp;</p>
            </div>
          ))}
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default MetricVisual;
