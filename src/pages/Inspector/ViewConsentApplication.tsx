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

  const [selectedMenuData, setSelectedDataMenu] = useRecoilState(
    selectedSideMenuDataAtom
  );
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useRecoilState(sideMenuLabelAtom);

  let history = useHistory();

  // const updateMenuSelection = (e: any, id: any) => {
  //   e.preventDefault();

  //   ApplicationDetails[0].menuList.map((k, l) => {
  //     if (k.id === id) {
  //       setSelectedMenuLabel(k.label);
  //       setSelectedDataMenu(k);
  //     }
  //     return null;
  //   });
  // };

  useEffect(() => {
    // if (ApplicationDetails[0].menuList) {
    //   setSelectedMenuLabel(ApplicationDetails[0].menuList[0].label);
    //   setSelectedDataMenu(ApplicationDetails[0].menuList[0]);
    // }

    if (history.location && history.location.pathname) {
      let tempFormId = history.location.pathname.split("/")[2];
      let tempAppId = history.location.pathname.split("/")[3];

      getApplicationDetails(tempFormId, tempAppId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // useEffect(() => {
  //     console.log(selectedMenu)
  // }, [selectedMenu])

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
              LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED && (
              <ConsentFormView
                formData={formData}
                applicationData={applicationData}
                showConsentBtns={false}
              />
            )}
        </div>
      </div>
    </Fragment>
  );
};
