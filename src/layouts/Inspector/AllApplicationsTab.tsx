/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  selectedTabData as selectedTabDataAtom,
  selectedTab as selectedTabAtom,
} from "../../states/atoms";
import { CardTwo } from "../../components/cards";
import { LANG } from "../../constants";

/**
 * AllApplicationsInspectorTab component renders
 * tab contents based on selections for
 * the inspector
 */

interface AllApplicationsInspectorTabProps {
  customData?: any;
}

export const AllApplicationsInspectorTab = ({
  customData,
}: AllApplicationsInspectorTabProps) => {
  const selectedTabData: any = useRecoilState(selectedTabDataAtom);
  const selectTab = useRecoilState(selectedTabAtom);

  const [userDetails, setUserDetails] = useState<any>(
    localStorage.getItem("user")
  );

  useEffect(() => {
    let user: any = userDetails.length && JSON.parse(userDetails);
    setUserDetails(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row pt-2">
      {selectedTabData[0].length > 0 &&
        selectedTabData[0].map((i: any, j: any) => {
          if (
            i.inspection &&
            i.inspection.status === LANG.FORM_STATUS.SENT_FOR_INSPECTION
          ) {
            return (
              <div
                className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4"
                key={j}
              >
                <CardTwo
                  title={i.title}
                  name={i.updatedBy ? i.updatedBy : i.createdBy}
                  time={`Scheduled on: ${
                    i.inspection ? i.inspection.scheduledDate : ""
                  }`}
                  showStatus={false}
                  status=""
                  statusLabel=""
                  showBtn={true}
                  type="button"
                  btnText="View application"
                  isLink={true}
                  link={`/inspector/${i.formId}/${i.applicationId}`}
                />
              </div>
            );
          }

          if (
            i.inspection &&
            i.inspection.status === LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED
          ) {
            return (
              <div
                className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4"
                key={j}
              >
                <CardTwo
                  title={i.title}
                  name={i.updatedBy ? i.updatedBy : i.createdBy}
                  time={`Scheduled on: ${
                    i.inspection ? i.inspection.scheduledDate : ""
                  }`}
                  showStatus={false}
                  status=""
                  statusLabel=""
                  showBtn={true}
                  type="button"
                  btnText="View application"
                  isLink={true}
                  link={`/assisting-inspector/${i.formId}/${i.applicationId}`}
                />
              </div>
            );
          }

          if (
            i.inspection &&
            i.inspection.status === LANG.FORM_STATUS.INSPECTION_COMPLETED &&
            i.inspection.assistingInspector.includes(userDetails && userDetails.id)
          ) {
            return (
              <div
                className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4"
                key={j}
              >
                <CardTwo
                  title={i.title}
                  name={i.updatedBy ? i.updatedBy : i.createdBy}
                  time={`Scheduled on: ${
                    i.inspection ? i.inspection.scheduledDate : ""
                  }`}
                  showStatus={false}
                  status=""
                  statusLabel=""
                  showBtn={true}
                  type="button"
                  btnText="View application"
                  isLink={true}
                  link={`/assisting-inspector/${i.formId}/${i.applicationId}`}
                />
              </div>
            );
          }

          if (
            i.inspection &&
            i.inspection.status === LANG.FORM_STATUS.INSPECTION_COMPLETED &&
            i.inspection.leadInspector.includes(userDetails && userDetails.id)
          ) {
            return (
              <div
                className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4"
                key={j}
              >
                <CardTwo
                  title={i.title}
                  name={i.updatedBy ? i.updatedBy : i.createdBy}
                  time={`Scheduled on: ${
                    i.inspection ? i.inspection.scheduledDate : ""
                  }`}
                  showStatus={false}
                  status=""
                  statusLabel=""
                  showBtn={true}
                  type="button"
                  btnText="View application"
                  isLink={true}
                  link={`/assisting-inspector/${i.formId}/${i.applicationId}`}
                />
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};
