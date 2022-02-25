import { Fragment, useState, useEffect } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardTwo } from "../../components/cards";
import Header from "../../components/common/Header";
import { useHistory } from "react-router-dom";
import { TabOne } from "../../components/tabs";
import {
  AllApplicationsInspectorTab,
  PastTab,
  ScheduledTodayTab,
  UpcomingTab,
} from "../../layouts";
import {
  selectedTabData as selectedTabDataAtom,
  selectedTab as selectedTabAtom,
} from "../../states/atoms";
import Helper from "./../../helpers/auth";
import { FormService } from "./../../services/form.service";
import { APP, LANG } from "./../../constants";
import Notify from "./../../helpers/notify";
import { useRecoilState } from "recoil";
import moment from "moment";

/**
 * InspectorApplications component renders
 * all applications page layout and its UI components
 */

interface InspectorApplicationsProps {
  data?: any;
}

export const InspectorApplications = ({ data }: InspectorApplicationsProps) => {
  const [scheduledToday, setScheduledToday] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [past, setPast] = useState<any[]>([]);

  const [currentData, setCurrentData] = useRecoilState(selectedTabDataAtom);
  const [tabData, setTabData] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabAtom);

  let history = useHistory();

  useEffect(() => {
    let tempTabData = [
      {
        id: "scheduledToday",
        label: "Scheduled today",
        ariaLabelled: "scheduled-today-tab",
        children: <AllApplicationsInspectorTab />,
      },
      {
        id: "upcoming",
        label: "Upcoming",
        ariaLabelled: "upcoming-tab",
        children: <AllApplicationsInspectorTab />,
      },
      {
        id: "past",
        label: "Past",
        ariaLabelled: "past-tab",
        children: <AllApplicationsInspectorTab />,
      },
    ];

    setTabData(tempTabData);

    getSelectedTabData();

    if (selectedTab.length) {
      setSelectedTab("Scheduled today");
    }
  }, []);

  useEffect(() => {
    if (selectedTab !== "") {
      setCurrentData([])
      filterData(selectedTab);
    } else {
      setCurrentData([])
      filterData("Scheduled today");
    }
  }, [selectedTab, scheduledToday]);

  const getSelectedTabData = () => {
    let todayDate = moment().format("DD-MM-YYYY");
    if (Helper.getUserRole() === APP.ROLE.INSPECTOR) {
      let data = {
        searchObjects: [],
      };
      FormService.getAllApplications(data).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            // setCurrentData(response.responseData);
            response.responseData.map((i: any, j: number) => {
              if (i.status !== LANG.FORM_STATUS.INSPECTION_COMPLETED) {
                if (
                  moment(todayDate, "DD-MM-YYYY").isBefore(
                    moment(i.inspection.scheduledDate, "DD-MM-YYYY")
                  )
                ) {
                  setUpcoming((upcoming) => [...upcoming, i]);
                } else if (
                  moment(todayDate, "DD-MM-YYYY").isSame(
                    moment(i.inspection.scheduledDate, "DD-MM-YYYY")
                  )
                ) {
                  setScheduledToday((today) => [...today, i]);
                } else {
                  setPast((past) => [...past, i]);
                }
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
    }
  };

  const filterData = (status: any) => {
    switch (status) {
      case "Scheduled today":
        return setCurrentData(scheduledToday);
      case "Upcoming":
        return setCurrentData(upcoming);
      case "Past":
        return setCurrentData(past);
      default:
        return setCurrentData(scheduledToday);
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
                  setSelectedTab(e.target.innerHTML);
                }
              }}
            >
              <TabOne
                tabId="inspectorTab"
                tabContentId="inspectorTabContent"
                tabList={tabData}
              />
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
