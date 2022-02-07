import { Children, Fragment } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardTwo } from "../../components/cards";
import Header from "../../components/common/Header";
import { useHistory } from 'react-router-dom';
import { TabOne } from "../../components/tabs";
import { PastTab, ScheduledTodayTab, UpcomingTab } from "../../layouts";

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
    children: <UpcomingTab />
},
{
    id: "past",
    label: "Past",
    ariaLabelled: "past-tab",
    children: <PastTab />
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
                        <div className="mt-3">
                            <TabOne tabId="myTab" tabContentId="myTabContent" tabList={tabData} />
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
}