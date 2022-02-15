import { Fragment, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { HeadingOne } from "../../components/headings";
import { useHistory } from "react-router-dom";
import Helper from "./../../helpers/auth";
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

  const [reviewData, setReviewData] = useState({})


  let history = useHistory();

  useEffect(() => {
    if (history.location && history.location.pathname) {
      let tempFormId = history.location.pathname.split("/")[2];
      let tempAppId = history.location.pathname.split("/")[3];



      getApplicationDetails(tempFormId, tempAppId);
    }
  }, []);

  const getApplicationDetails = (formId: any, applicationId: any) => {
    FormService.find(formId).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          setReviewData(response.responseData)
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
      <Header history={history} />
      <div className="container-fluid">
        <div className="container dashboard-inner-container mt-4">
          <ReviewApplicationLayout data={reviewData} />
        </div>
      </div>
    </Fragment>
  );
};
