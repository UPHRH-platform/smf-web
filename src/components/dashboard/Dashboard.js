import { Component, Fragment } from "react";
import Header from "../common/Header";

/**
 * Dashboard component
 */

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }



  render() {
    return (
      <Fragment>
        <Header history={this.props.history}/>
        <div className="container-fluid main-container">
          <div className="container dashboard-inner-container">
            <div
              className="row"
            >
              <div className="col-md-8 col-sm-12 col-12 pt-5">
                <h2>My applications</h2>
                <p className="h2-subheading">There is no active applications. Select one from the below list to apply.</p>
              </div>
              <div className="col-md-4 col-sm-12 col-12">

              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid bottom-container">
          <div className="container dashboard-inner-container">
            <div
              className="row"
            >
              <div className="col-md-10 col-sm-12 col-12 pt-5">
                <h2>Available applications</h2>
                <p className="h2-subheading">These are the available appplication forms for you apply. Click on any of them to start filling</p>
              </div>
              <div className="col-md-2 col-sm-12 col-12 pt-5">
                <button className="btn btn-default smf-btn-default float-right">SEE ALL</button>
              </div>
            </div>
            <div
              className="row mt-3"
            >
              <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item">
                  <h3 className="">Application name</h3>
                  <p className="h3-subheading">In oculis quidem rerum necessitatibus saepe eveniet, ut et via.</p>
                  <button className="btn btn-default smf-btn-default highlighted mt-3">Apply</button>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item">
                  <h3 className="">Application name</h3>
                  <p className="h3-subheading">In oculis quidem rerum necessitatibus saepe eveniet, ut et via.</p>
                  <button className="btn btn-default smf-btn-default highlighted mt-3">Apply</button>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item">
                  <h3 className="">Application name</h3>
                  <p className="h3-subheading">In oculis quidem rerum necessitatibus saepe eveniet, ut et via.</p>
                  <button className="btn btn-default smf-btn-default highlighted mt-3">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
