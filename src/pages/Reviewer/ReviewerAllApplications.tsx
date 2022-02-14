import { Fragment } from "react";
import Header from "../../components/common/Header";
import { HeadingOne } from "../../components/headings";
import { useHistory } from 'react-router-dom';
import { TabOne } from "../../components/tabs";
import { AllApplicationsTab } from "../../layouts";


/**
 * ReviewerAllApplications component renders
 * all applications page layout and its UI components
 */

const ReviewerAllApplicationsData = [
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
    id: "new",
    label: "New",
    ariaLabelled: "new-tab",
    children: <AllApplicationsTab toFetch="new" />
},
{
    id: "underReview",
    label: "Under review",
    ariaLabelled: "under-review-tab",
    children: <AllApplicationsTab toFetch="under-review" />
},
{
    id: "returned",
    label: "Returned",
    ariaLabelled: "returned-tab",
    children: <AllApplicationsTab toFetch="returned" />
},
{
    id: "sentForInspection",
    label: "Sent for inspection",
    ariaLabelled: "sent-for-inpection-tab",
    children: <AllApplicationsTab toFetch="sent" />
},
{
    id: "inspectionCompleted",
    label: "Inspection completed",
    ariaLabelled: "inspection-completed-tab",
    children: <AllApplicationsTab toFetch="inspection-completed" />
},
{
    id: "approved",
    label: "Approved",
    ariaLabelled: "approved-tab",
    children: <AllApplicationsTab toFetch="approved" />
},
]

interface ReviewerAllApplicationsProps {
    data?: any
}

export const ReviewerAllApplications = ({ data }: ReviewerAllApplicationsProps) => {

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
                            <TabOne tabId="reviewerTab" tabContentId="reviewerTabContent" tabList={tabData} />
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
}