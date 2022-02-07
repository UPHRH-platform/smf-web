import { Fragment, useEffect, useState } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardOne, CardTwo } from "../../components/cards";
import Notify from "../../helpers/notify";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";

/**
 * Reviewer component renders
 * Reviewer page layout and its UI components
 */

 interface IApplication {
    applicationId: string
    comments: string
    createdBy: string
    createdDate: string
    dataObject: any
    downvoteCount: number
    downvotes: number
    formData: any
    formId: number
    id: string
    recordId: null
    replies: null
    reviewedBy: string
    reviewedDate: string
    status: string
    timestamp: 1643895573549
    title: string
    updatedBy: null
    updatedDate: string
    upvoteCount: null
    upvotes: null
    version: number
}

interface IApplicationCount {
    key: string 
    value: number
}

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
    const [pendingApplications, setPendingApplications] = useState<IApplication[]>([])
    const [applicationsMetrics, setApplicationsMetrics] = useState<IApplicationCount[]>([])
    useEffect(() => {
        const myApplicationsReq = {
            "searchObjects" : [
                // {
                //     "key" : "status", 
                //     "values" : "Pending"
                // }
            ]
          }
          FormService.getAllApplications(myApplicationsReq).then(
            (response2) => {
              if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
                setPendingApplications(response2.responseData.length > 6
                    ? response2.responseData.splice(0, 6)
                    : response2.responseData);
                // console.log(response2.responseData);
              } else {
                Notify.error(response2.statusInfo.errorMessage);
              }
            },
            (error) => {
              error.statusInfo
                ? Notify.error(error.statusInfo.errorMessage)
                : Notify.error(error.message);
            }
          );
          FormService.getApplicationsStatusCount().then(
            (response2: any) => {
              if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
                setApplicationsMetrics(response2.responseData.keyValues)
                // console.log(response2.responseData);
              } else {
                Notify.error(response2.statusInfo.errorMessage);
              }
            },
            (error: any) => {
              error.statusInfo
                ? Notify.error(error.statusInfo.errorMessage)
                : Notify.error(error.message);
            }
          );
    }, []);
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    {/* Section one */}
                    <section className="pt-3">
                        <HeadingOne heading="Your activity" />
                        <div className="row pt-2">
                            {applicationsMetrics.map((i, j) => {
                                return (
                                    <div
                                        className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                                        key={j}
                                    >
                                        <CardOne count={i.value} title={i.key} />
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
                            {pendingApplications.map((i, j) => {
                                return (
                                    <div
                                        className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-3"
                                        key={i.applicationId}
                                    >
                                        <CardTwo
                                            title={i.title}
                                            name={i.title}
                                            time={`Created on: ${i.createdDate}`}
                                            showStatus={true}
                                            status={i.status}
                                            statusLabel={i.status}
                                            showBtn={true}
                                            type="button"
                                            btnText="View application"
                                            isLink={true}
                                            link={
                                                "/applications/" +
                                                i.formId 
                                                + "/" +
                                                i.applicationId
                                              }
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