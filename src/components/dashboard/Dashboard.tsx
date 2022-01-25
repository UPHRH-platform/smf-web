import React, { Component } from "react";


/**
 * Dashboard component
 */

class Dashboard extends Component {
 
  constructor(props: any) {
    super(props);

    this.state = {
      dashboardConfigData: [],
      selectedTab: "",
      trigger: false,
      colorTrigger: true
    };
  }

  componentDidMount() {
   
  }

  

  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
       <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
