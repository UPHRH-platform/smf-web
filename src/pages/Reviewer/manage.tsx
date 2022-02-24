import { Fragment, useEffect } from "react";
import { HeadingOne } from "../../components/headings";
import Header from "../../components/common/Header";
import { useHistory, useLocation } from "react-router";
import { TabOne } from "../../components/tabs";
import { Users } from "../../layouts/reviewer/Users";
import ListForms from "../../components/form/ListForms";


interface IManageProps {
    data?: any
}

const tabData = [{
    id: "user",
    label: "Users",
    ariaLabelled: "user-tab",
    children: <Users/>
},
{
    id: "apllication",
    label: "Application form",
    ariaLabelled: "apllication-tab",
    children: <ListForms/>
},
]

export const Manage = ({ data }: IManageProps) => {
    let history = useHistory();
    const search = useLocation().search;
    const activeTabNumber = new URLSearchParams(search).get('tab');
    console.log('activeTabNumber', activeTabNumber)
    useEffect(() => {
    }, []);
    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    <section className="mt-5">
                        <div className="row">
                            <div className="col-12 ">
                                <HeadingOne heading="Manage" />
                            </div>
                            
                        </div>
                        <div className="row mt-3">
                            <TabOne tabId="myTab" tabContentId="myTabContent" tabList={tabData} activeTab={parseInt(activeTabNumber || '0')}/>
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
}