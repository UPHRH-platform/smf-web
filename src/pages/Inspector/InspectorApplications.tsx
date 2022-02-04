import { Children, Fragment } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardTwo } from "../../components/cards";
import Header from "../../components/common/Header";
import { useHistory } from 'react-router-dom';
import { TabOne } from "../../components/tabs";
import { ScheduledTodayTab } from "../../layouts";

/**
 * InspectorApplications component renders
 * all applications page layout and its UI components
 */

const InspectorPendingApplications = [
    {
        id: "PA001",
        title: "Paramedical degree",
        name: "Name of college",
        time: "Scheduled on: dd/mm/yyyy",
        showStatus: true,
        status: "New",
        showBtn: true,
        type: "button",
        btnText: "View application",
        isLink: true,
        link: "/all-applications/PA001"
    },
    {
        id: "PA002",
        title: "ANM",
        name: "Name of college",
        time: "Scheduled on: dd/mm/yyyy",
        showStatus: true,
        status: "Under inspection",
        showBtn: true,
        type: "button",
        btnText: "View application",
        isLink: true,
        link: "/all-applications/PA002"
    },
];

const tabData = [{
    id: "today",
    label: "Scheduled today",
    ariaLabelled: "today-tab",
    children: <ScheduledTodayTab/>
},
{
    id: "upcoming",
    label: "Upcoming",
    ariaLabelled: "upcoming-tab",
},
{
    id: "past",
    label: "Past",
    ariaLabelled: "past-tab",
},
]

interface InspectorApplicationsProps {
    data?: any
}

export const InspectorApplications = ({ data }: InspectorApplicationsProps) => {

    let history = useHistory();
    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    {/* Section one */}
                    <section className="pt-3">
                        <HeadingOne heading="All applications" />
                        <div className="mt-4">
                            <TabOne tabId="myTab" tabContentId="myTabContent" tabList={tabData} />
                        </div>
                    </section>

                    {/* <section className="pt-3">
                        <HeadingOne heading="All applications" />
                        <HeadingTwo heading="These are the active application (s) submitted by you." />
                        <div className="row pt-2">
                            {InspectorPendingApplications.map((i, j) => {
                                return (
                                    <div
                                        className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                                        key={i.id}
                                    >
                                        <CardTwo
                                            title={i.title}
                                            name={i.name}
                                            time={i.time}
                                            showStatus={i.showStatus}
                                            status={i.status}
                                            statusLabel={i.status}
                                            showBtn={i.showBtn}
                                            type={i.type}
                                            btnText={i.btnText}
                                            isLink={i.isLink}
                                            link={i.link}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section> */}
                </div>
            </div>
        </Fragment>
    );
}