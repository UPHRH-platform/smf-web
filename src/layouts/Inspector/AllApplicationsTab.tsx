import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  selectedTabData as selectedTabDataAtom,
  selectedTab as selectedTabAtom,
} from "../../states/atoms";
import { CardTwo } from "../../components/cards";

/**
 * AllApplicationsInspectorTab component renders
 * tab contents based on selections for
 * the inspector
 */

interface AllApplicationsInspectorTabProps {}

export const AllApplicationsInspectorTab =
  ({}: AllApplicationsInspectorTabProps) => {
    const [data, setData] = useState<any[]>([]);

    const selectedTabData = useRecoilState(selectedTabDataAtom);
    const selectTab = useRecoilState(selectedTabAtom);

    useEffect(() => {
      if (selectedTabData) {
        setData(selectedTabData[0]);
      }
    }, [selectTab]);

    return (
      <div className="row pt-2">
        {data &&
          data.map((i, j) => {
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
          })}
      </div>
    );
  };
