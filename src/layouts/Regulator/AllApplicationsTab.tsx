import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  selectedTabData as selectedTabDataAtom,
  selectedTab as selectedTabAtom,
} from "../../states/atoms";
import { CardTwo } from "../../components/cards";

/**
 * AllApplicationsTab component renders
 * tab contents based on selections for
 * the regulator
 */

interface AllApplicationsTabProps {}

export const AllApplicationsTab = ({}: AllApplicationsTabProps) => {
  const [data, setData] = useState<any[]>([]);

  const selectedTabData = useRecoilState(selectedTabDataAtom);
  const selectTab = useRecoilState(selectedTabAtom);

  useEffect(() => {
    if (selectedTabData && selectedTabData[0]) {
      setData(selectedTabData[0]);
    }
  }, [selectTab]);

  return (
    <div className="row pt-2">
      {data &&
        data.map((i, j) => {
          if (selectTab[0].toUpperCase() === i.status) {
            return (
              <div
                className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4"
                key={j}
              >
                <CardTwo
                  title={i.title}
                  name={i.updatedBy}
                  time={`Received on: ${
                    i.updatedDate ? i.updatedDate : i.createdDate
                  }`}
                  showStatus={true}
                  status={i.status}
                  statusLabel={
                    i.status &&
                    i.status.charAt(0).toUpperCase() + i.status.slice(1)
                  }
                  showBtn={true}
                  type="button"
                  btnText="View application"
                  isLink={true}
                  link={`/regulator/${i.formId}/${i.applicationId}`}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};
