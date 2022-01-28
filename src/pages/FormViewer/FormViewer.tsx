import { Component, Fragment } from "react";
import Header from "../../components/common/Header";

interface formViewerState {
    showSidebar: boolean
}

class FormViewer extends Component<{}, formViewerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showSidebar: true
        }
        this.toggleSideBar = this.toggleSideBar.bind(this)
    }

    toggleSideBar() {
        console.log('toggleSideBar')
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container-fluid main-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="container pt-5 pl-2 pr-2">
                                <div className="d-flex align-items-center justify-content-between fullWidth mb-4">
                                    <h2 className="title mb-0">NAME OF THE FORM</h2>
                                    <div className="">
                                        <button className="btn btn-outline smf-btn-default">Save</button>
                                        <button className="btn btn-primary smf-btn-primary mr-0">
                                            Next
                                            <i className="fa fa-arrow-right ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <nav id="sidebar" className={'active' + (this.state.showSidebar ? '' : 'a')}>
                                        <ul className="list-unstyled components">
                                            <li className="active">
                                                <a href="#">About</a>
                                                {/* <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                                                    <ul className="collapse list-unstyled" id="homeSubmenu">
                                                    <li>
                                                        <a href="#">Home 1</a>
                                                    </li>
                                                </ul> */}
                                            </li>
                                            <li>
                                                <a href="#">About</a>
                                            </li>
                                            <li>
                                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                                            </li>
                                            <li>
                                                <a href="#">Portfolio</a>
                                            </li>
                                            <li>
                                                <a href="#">Contact</a>
                                            </li>
                                        </ul>
                                    </nav>

                                    <div id="content" className="form-content ml-4 mb-4 p-4 fullWidth white-bg">
                                        <button type="button" id="sidebarCollapse" className={'btn btn-info d-sm-block d-md-none ' + (this.state.showSidebar ? 'd-none-imp' : 'd-block-imp')} onClick={this.toggleSideBar}>
                                            <i className="fa fa-bars"></i>
                                            {/* <span>Toggle Sidebar</span> */}
                                        </button>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlInput1">Email address</label>
                                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect1">Example select</label>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                                                <select multiple className="form-control" id="exampleFormControlSelect2">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlFile1">Example file input</label>
                                                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                                <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled/>
                                                <label className="form-check-label" htmlFor="inlineCheckbox3">3 (disabled)</label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default FormViewer;