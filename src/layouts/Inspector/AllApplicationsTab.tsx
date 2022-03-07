/* eslint-disable @typescript-eslint/no-unused-vars */
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

  return (
    <div className="row pt-2">
      {selectedTabData[0].length > 0 &&
        selectedTabData[0].map((i: any, j: any) => {
          return (
            <div
              className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4"
              key={j}
            >
              {i.inspection &&
                i.inspection.status ===
                  LANG.FORM_STATUS.SENT_FOR_INSPECTION && (
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
                )}
              {i.inspection &&
                i.inspection.status ===
                  LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED && (
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
                )}
            </div>
          );
        })}
    </div>
  );
};
