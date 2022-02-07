import { Fragment } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardOne, CardTwo } from "../../components/cards";

/**
 * Reviewer component renders
 * Reviewer page layout and its UI components
 */

const ReviewerMetrics = [
    {
        id: 0,
        count: 2,
        title: "Total pending",
    },
    {
        id: 1,
        count: 1,
        title: "Received today",
    },
    {
        id: 2,
        count: 1,
        title: "In progress",
    },
    {
        id: 3,
        count: 0,
        title: "Reviewed today",
    },
    {
        id: 4,
        count: 32,
        title: "Reviewed in total",
    },
];

const ReviewerPendingApplications = [
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
        isLink: false,
        link: ""
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
        isLink: false,
        link: ""
    },
];

interface ReviewerProps {
    data?: any
}

export const ReviewerHome = ({ data }: ReviewerProps) => {
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    {/* Section one */}
                    <section className="pt-3">
                        <HeadingOne heading="Your activity" />
                        <div className="row pt-2">
                            {ReviewerMetrics.map((i, j) => {
                                return (
                                    <div
                                        className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                                        key={i.id}
                                    >
                                        <CardOne count={i.count} title={i.title} />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Section two */}
                    <section className="mt-5">
                        <HeadingOne heading="Pending applications" />
                        <HeadingTwo heading="These are latest applications that is pending for your review/approval" />
                        <div className="row mt-3">
                            {ReviewerPendingApplications.map((i, j) => {
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
                    </section>
                </div>
            </div>
        </Fragment>
    );
}