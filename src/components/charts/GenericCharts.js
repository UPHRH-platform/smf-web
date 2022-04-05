import React from "react";
import ChartType from "./ChartType";
import "file-saver";
import domtoimage from "dom-to-image";
import Modal from "react-modal";
import ExportChart from "../../helpers/exportChart";
import _ from "lodash";
import "../../styles/chart.css";

/**
 * GenericChart component to display the
 * generated charttypes in the page layout
 */

Modal.setAppElement("#root");

class GenericCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalData: {
        name: "",
        data: [],
        chartDataName: "",
        dimensions: "",
      },
      modalIsOpen: false,
      imageBlob: "",
      imageBase64: "",
      s3URL: "",
      telegramURL: "",
      chartCode: "",
      chartDType: "",
    };
    this.getModalData = this.getModalData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  filterImage = (node) => {
    return (
      node.id !== "dropdownMenuButton" &&
      node.id !== "zoomIn" &&
      node.id !== "zoomOut" &&
      node.id !== "zoomInBtn" &&
      node.id !== "zoomOutBtn" &&
      node.id !== "fullScreenBtn"
    );
  };

  filterImageTwo = (node) => {
    return (
      node.id !== "exit" &&
      node.id !== "downloadAsData" &&
      node.id !== "downloadAsImage" &&
      node.id !== "dropdownMenuButtonShare" &&
      node.id !== "fullScreenBtn"
    );
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  afterOpenModal = () => {};

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  getModalData = (name, description, data, cdName, dimensions) => {
    // console.log(name, data, cdName);
    this.setState(
      {
        modalData: {
          ...this.state.modalData,
          name: name,
          description: description,
          data: data,
          chartDataName: cdName,
          dimensions: dimensions,
        },
        showModal: true,
        chartCode: _.chain(data).first().get("id").value(),
        chartDType: _.chain(data).first().get("chartType").toUpper().value(),
      },
      () => {
        this.openModal();
      }
    );
  };

  renderCharts(d, chartData, index) {
    switch (d.vizType.toUpperCase()) {
      case "CHART":
        return (
          <div
            key={index}
            className={`col-sm-12 col-md-${d.dimensions.width} col-lg-${d.dimensions.width} mt-2 mb-3`}
          >
            <div
              className="chart-wrapper h-100 chart_card_one chart-wrapper-padding-2"
              id={d.name}
            >
              <div className="mb-3">
                <div className="">
                  <div className="row">
                    <div className="col-10 col-md-8 col-lg-10">
                      <h5 className="pt-1 chart_title_one mb-0">{d.name}</h5>
                    </div>
                    <div className="col-2 col-md-4 col-lg-2">
                      <div className="d-flex">
                        <div
                          id="fullScreenBtn"
                          className="material-icons custom_cursor mt-2 black-60"
                          onClick={() => {
                            this.getModalData(
                              d.name,
                              d.description,
                              d.charts,
                              chartData.name,
                              d.dimensions
                            );
                          }}
                        >
                          fullscreen
                        </div>
                        <div className="dropdown">
                          <div
                            className="material-icons custom_cursor mt-2 ms-2 black-60"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            more_vert
                          </div>
                          <div
                            className="dropdown-menu dropdown-menu-custom p-0 m-0"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <p
                              className="dropdown-item custom_cursor dropdown_text mt-3"
                              onClick={() =>
                                setTimeout(() => {
                                  domtoimage
                                    .toBlob(document.getElementById(d.name), {
                                      filter: this.filterImage,
                                    })
                                    .then((blob) =>
                                      window.saveAs(blob, d.name)
                                    );
                                }, 250)
                              }
                            >
                              Download as PNG
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {d.description && (
                    <label className="chart_card_description_one">
                      {d.description}
                    </label>
                  )}
                </div>
              </div>

              {/* Modal */}
              <Modal
                id="modalView"
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel={this.state.modalData.name}
                className="custom-modal"
                bodyOpenClassName="afterOpen"
                overlayClassName="custom-modal-overlay"
              >
                <div>
                  <div className="clearfix">
                    <div className="float-start"></div>
                    <div className="float-end custom-modal-font-2">
                      <div className="d-flex">
                        <div
                          id="downloadAsImage"
                          className="custom_cursor "
                          onClick={() =>
                            domtoimage
                              .toBlob(document.getElementById("modalView"), {
                                filter: this.filterImageTwo,
                              })
                              .then((blob) => {
                                this.setState(
                                  {
                                    imageBlob: blob,
                                  },
                                  () => {
                                    let reader = new FileReader();
                                    reader.readAsDataURL(this.state.imageBlob);

                                    reader.onload = function () {
                                      this.image = reader.result;
                                    };
                                    window.saveAs(
                                      this.state.imageBlob,
                                      this.state.modalData.name
                                    );
                                  }
                                );
                              })
                          }
                        >
                          <span className="float-end  me-3">
                            Download as image
                          </span>
                          <span className="material-icons float-end me-2">
                            cloud_download
                          </span>
                        </div>

                        <div className="custom_cursor " id="downloadAsData">
                          <span
                            className="float-end me-3"
                            onClick={() =>
                              this.state.chartDType === "TABLE"
                                ? ExportChart.tableToCsv(
                                    this.state.modalData.name
                                  )
                                : ExportChart.toCsv(
                                    this.state.modalData.name,
                                    this.state.chartCode
                                  )
                            }
                          >
                            Download data
                          </span>
                        </div>
                        <div
                          className="custom_cursor "
                          onClick={this.closeModal}
                          id="exit"
                        >
                          <span className="float-end">Exit</span>
                          <span className="material-icons float-right me-1">
                            fullscreen_exit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="chart-header-style-1">
                    {this.state.modalData.name}
                  </h2>
                  {this.state.modalData.description && (
                    <label className="chart-desc-style-1 pb-3">
                      {this.state.modalData.description}
                    </label>
                  )}
                </div>

                <div className="col-xs-12 col-sm-12 col-md-9 col-lg-8 col-xl-12 centerAlign">
                  <ChartType
                    key={index}
                    chartData={this.state.modalData.data}
                    label={this.state.modalData.name}
                    section={this.state.modalData.chartDataName}
                    pathName={this.props}
                    dimensions={this.state.modalData.dimensions}
                  />
                </div>
              </Modal>

              {/* Visualisation */}
              <ChartType
                key={index}
                chartData={d.charts}
                label={d.name}
                section={chartData.name}
                pathName={this.props}
                dimensions={d.dimensions}
              />
            </div>
          </div>
        );
      case "METRICCOLLECTION":
        return (
          <div
            key={index}
            className={`col-sm-12 col-md-${d.dimensions.width} col-lg-${d.dimensions.width} mt-2 mb-3`}
          >
            <div
              className="chart-wrapper h-100 cardChart chartWrapperPadding"
              id={d.name}
            >
              <div className="row">
                <h5 className="pb-5 pt-2 pl-3">{d.name}</h5>
                <img
                  className="custom_cursor mt-3 downloadBtn downloadIcon ml-3"
                  src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=="
                  title="Download as PNG"
                  alt="download chart"
                  width="13"
                  height="13"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                ></img>
                <div
                  className="dropdown-menu dropdown-menu-custom"
                  aria-labelledby="dropdownMenuButton"
                  style={{ marginLeft: "-11.85em" }}
                >
                  <p
                    className="dropdown-item custom_cursor  metricTextColor"
                    onClick={() =>
                      setTimeout(() => {
                        domtoimage
                          .toBlob(document.getElementById(d.name), {
                            filter: this.filterImage,
                          })
                          .then((blob) => window.saveAs(blob, d.name));
                      }, 250)
                    }
                  >
                    Download as PNG
                  </p>
                </div>
              </div>
              <ChartType
                key={index}
                chartData={d.charts}
                label={d.name}
                section={chartData.name}
              />
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  }
  render() {
    let { chartData, row } = this.props;

    return (
      <div key={row} className="row">
        {chartData.vizArray.map((d, i) => this.renderCharts(d, chartData, i))}
      </div>
    );
  }
}

export default GenericCharts;
