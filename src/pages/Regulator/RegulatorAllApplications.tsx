import { Fragment, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { HeadingOne } from "../../components/headings";
import { useHistory } from "react-router-dom";
import { TabOne } from "../../components/tabs";
import { AllApplicationsTab } from "../../layouts";
import { useRecoilState } from "recoil";
import {
    selectedTabData as selectedTabDataAtom,
    selectedTab as selectedTabAtom,
} from "../../states/atoms";
import Helper from "./../../helpers/auth";
import { FormService } from "./../../services/form.service";
import { APP, LANG } from "./../../constants";
import Notify from "./../../helpers/notify";

/**
 * RegulatorAllApplications component renders
 * all applications page layout and its UI components
 */

interface RegulatorAllApplicationsProps {
    data?: any;
}

export const RegulatorAllApplications = ({
    data,
}: RegulatorAllApplicationsProps) => {
    const [currentData, setCurrentData] = useRecoilState(selectedTabDataAtom);
    const [tabData, setTabData] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useRecoilState(selectedTabAtom);
    const userRole = Helper.getUserRole();

    let history = useHistory();

    useEffect(() => {
        let tempTabData = [
            {
                id: "new",
                label: "New",
                ariaLabelled: "new-tab",
                children: <AllApplicationsTab />,
            },
            // {
            //     id: "underReview",
            //     label: "Under review",
            //     ariaLabelled: "under-review-tab",
            //     children: <AllApplicationsTab />,
            // },
            {
                id: "returned",
                label: "Returned",
                ariaLabelled: "returned-tab",
                children: <AllApplicationsTab />,
            },
            {
                id: "sentForInspection",
                label: `${LANG.FORM_STATUS_TEXT.sentForInspection}`,
                ariaLabelled: "sent-for-inpection-tab",
                children: <AllApplicationsTab />,
            },
            {
                id: "inspectionCompleted",
                label: `${LANG.FORM_STATUS_TEXT.inspectionCompleted}`,
                ariaLabelled: "inspection-completed-tab",
                children: <AllApplicationsTab />,
            },
            {
                id: "approved",
                label: "Approved",
                ariaLabelled: "approved-tab",
                children: <AllApplicationsTab />,
            },
            {
                id: "rejected",
                label: "Rejected",
                ariaLabelled: "rejected-tab",
                children: <AllApplicationsTab />,
            },
        ];

        setTabData(tempTabData);

        getSelectedTabData();

        if(selectedTab.length) {
            setSelectedTab("New")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentData.length && selectedTab === "") {
            setSelectedTab("New");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentData]);

    const getSelectedTabData = () => {
        if (userRole === APP.ROLE.REGULATOR || userRole === APP.ROLE.SUPER_ADMIN) {
            let data = {
                searchObjects: [],
            };
            FormService.getAllApplications(data).then(
                (response) => {
                    if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
                        setCurrentData(response.responseData);
                    } else {
                        Notify.error(response.statusInfo.errorMessage);
                    }
                },
                (error) => {
                    error.statusInfo
                        ? Notify.error(error.statusInfo.errorMessage)
                        : Notify.error(error.message);
                }
            );
        }
    };

    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    {/* Section one */}
                    <section className="pt-3">
                        <HeadingOne heading="All applications" />
                        <div
                            className="mt-3"
                            onClick={(e: any) => {
                                if (e.target && e.target.id !== "" && e.target.innerHTML) {
                                    let tempStatus = "";
                                    switch (e.target.innerHTML) {
                                        case "New":
                                            tempStatus = e.target.innerHTML;
                                            break;

                                        // case "Under review":
                                        //     tempStatus = "underreview";
                                        //     break;

                                        case "Returned":
                                            tempStatus = "returned";
                                            break;

                                        case `${LANG.FORM_STATUS_TEXT.sentForInspection}`:
                                            tempStatus = "sentforins";
                                            break;

                                        case `${LANG.FORM_STATUS_TEXT.inspectionCompleted}`:
                                            tempStatus = "inscompleted";
                                            break;

                                        case "Approved":
                                            tempStatus = "approved";
                                            break;

                                        case "Rejected":
                                            tempStatus = "rejected";
                                            break;

                                        default:
                                            tempStatus = "";
                                            break;
                                    }

                                    setSelectedTab(tempStatus);
                                }
                            }}
                        >
                            <TabOne
                                tabId="reviewerTab"
                                tabContentId="reviewerTabContent"
                                tabList={tabData}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
};
