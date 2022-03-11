/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  sideMenuData as selectedSideMenuDataAtom,
  sideMenuLabel as sideMenuLabelAtom,
} from "../../states/atoms";
import { ConsentFormView } from "../../layouts";
import { FormService } from "./../../services/form.service";
import { APP, LANG } from "./../../constants";
import Notify from "./../../helpers/notify";

/**
 * ViewConsentApplications component renders
 * application detail page layout and its UI components
 * for assisting inspector rol
 */

interface ViewConsentApplicationsProps {
  data?: any;
}

export const ViewConsentApplications = ({
  data,
}: ViewConsentApplicationsProps) => {
  const [formData, setFormData] = useState({});
  const [applicationData, setApplicationData] = useState<any>({});
  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    { title: "HOME", url: "/dashboard", icon: "" },
    { title: "ALL APPLICATIONS", url: "/all-applications", icon: "" },
  ]);
  const [userDetails, setUserDetails] = useState<any>(
    localStorage.getItem("user")
  );

  const [selectedMenuData, setSelectedDataMenu] = useRecoilState(
    selectedSideMenuDataAtom
  );
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useRecoilState(sideMenuLabelAtom);

  let history = useHistory();

  useEffect(() => {
    let user: any = userDetails && JSON.parse(userDetails);
    setUserDetails(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.id) {
      if (history.location && history.location.pathname) {
        let tempFormId = history.location.pathname.split("/")[2];
        let tempAppId = history.location.pathname.split("/")[3];

        getApplicationDetails(tempFormId, tempAppId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const getApplicationDetails = (formId: any, applicationId: any) => {
    FormService.find(formId).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          setFormData(response.responseData);
          FormService.findApplication(applicationId).then((res) => {
            if (res.statusInfo.statusCode === APP.CODE.SUCCESS) {
              setApplicationData(res.responseData);
              setBreadcrumbData([
                ...breadcrumbData,
                {
                  title:
                    (response.responseData && response.responseData.title) ||
                    "",
                  url: "",
                  icon: "",
                },
              ]);
            } else {
              Notify.error(res.statusInfo.errorMessage);
            }
          });
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
  };

  return (
    <Fragment>
      <Header history={history} breadCrumb={breadcrumbData} />
      <div className="container-fluid">
        <div className="container dashboard-inner-container">
          {applicationData.inspection &&
            applicationData.inspection.status ===
              LANG.FORM_STATUS.SENT_FOR_INSPECTION && (
              <ConsentFormView
                formData={formData}
                applicationData={applicationData}
                showConsentBtns={true}
              />
            )}
          {applicationData.inspection &&
            applicationData.inspection.status ===
              LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED &&
            !applicationData.inspection.assistingInspector.includes(
              userDetails.id
            ) && (
              <ConsentFormView
                formData={formData}
                applicationData={applicationData}
                showConsentBtns={false}
              />
            )}

          {applicationData.inspection &&
            (applicationData.inspection.status ===
              LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED ||
              applicationData.inspection.status ===
                LANG.FORM_STATUS.INSPECTION_COMPLETED) &&
            applicationData.inspection.assistingInspector.includes(
              userDetails.id
            ) && (
              <>
                <ConsentFormView
                  formData={formData}
                  applicationData={applicationData}
                  showConsentBtns={applicationData.inspection.assignedTo.find(
                    (u: any, j: number) => {
                      if (u.id === userDetails.id) {
                        if (!u.status) {
                          //  console.log(true)
                          return true;
                        } else {
                          //  console.log(false)
                          return false;
                        }
                      }
                      return null;
                    }
                  )}
                />
              </>
            )}

          {applicationData.inspection &&
            applicationData.inspection.status ===
              LANG.FORM_STATUS.INSPECTION_COMPLETED &&
            applicationData.inspection.leadInspector.includes(
              userDetails.id
            ) && (
              <ConsentFormView
                formData={formData}
                applicationData={applicationData}
                showConsentBtns={true}
              />
            )}
        </div>
      </div>
    </Fragment>
  );
};
