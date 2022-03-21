import { Fragment, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useHistory } from "react-router-dom";
import { FormService } from "./../../services/form.service";
import { APP } from "./../../constants";
import Notify from "./../../helpers/notify";
import { ReviewApplicationLayout } from "../../layouts";

/**
 * ReviewApplication component renders
 * review application page layout and its UI components
 */

interface ReviewApplicationProps {
  data?: any;
}

export const ReviewApplication = ({ data }: ReviewApplicationProps) => {
  const [formData, setFormData] = useState({});
  const [applicationData, setApplicationData] = useState({});
  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    { title: 'HOME', url: '/dashboard', icon: '' },
    { title: 'ALL APPLICATIONS', url: '/reviewer/all-applications', icon: '' }
  ])

  let history = useHistory();
  useEffect(() => {
   
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
                { title: (response.responseData && response.responseData.title) || '', url: '', icon: '' }
              ])
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
      <Header history={history} breadCrumb={breadcrumbData}/>
      <div className="container-fluid">
        <div className="container dashboard-inner-container mt-4">
          <ReviewApplicationLayout
            formData={formData}
            applicationData={applicationData}
          />
        </div>
      </div>
    </Fragment>
  );
};
