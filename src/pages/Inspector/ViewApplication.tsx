import { Fragment, useEffect, useState } from "react";
import { HeadingOne } from "../../components/headings";
import Header from "../../components/common/Header";
import { useHistory } from "react-router-dom";
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import {
  sideMenuData as selectedSideMenuDataAtom,
  sideMenuLabel as sideMenuLabelAtom,
} from "../../states/atoms";
import { BtnOne, BtnTwo } from "../../components/buttons";
import { ModalOne } from "../../components/modal";
import { FormView } from "../../layouts";
import { FormService } from "./../../services/form.service";
import { APP } from "./../../constants";
import Notify from "./../../helpers/notify";
/**
 * ViewApplications component renders
 * application detail page layout and its UI components
 */

const ApplicationDetails = [
  {
    id: "PA001",
    name: "Paramedical degree",
    menuList: [
      {
        id: "MN001",
        label: "General details",
        fields: [
          {
            id: "FI001",
            label: "Registration code",
            value: "UPSMF123456",
            showComments: true,
          },
          {
            id: "FI002",
            label: "Course type",
            value: "Bachelors Degree",
            showComments: false,
          },
          {
            id: "FI003",
            label: "Course",
            value: "Paramedical",
            showComments: false,
          },
        ],
      },
      {
        id: "MN002",
        label: "Institution details",
        fields: [
          {
            id: "FI004",
            label: "Name of Society/Trust/Company",
            value: "Veer Bahadur Singh Purvanchal University",
            showComments: false,
          },
          {
            id: "FI005",
            label: "Proposed Institute Name",
            value: "Veer Bahadur Singh Purvanchal University",
            showComments: true,
          },
          {
            id: "FI006",
            label: "Address",
            value: "Shahganj Road, Siddikpur, Uttar Pradesh 222003",
            showComments: false,
          },
        ],
      },
      {
        id: "MN003",
        label: "Training centre details",
      },
      {
        id: "MN004",
        label: "Training centre room details",
      },
      {
        id: "MN005",
        label: "Hostel room details",
      },
      {
        id: "MN006",
        label: "Hospital details",
      },
      {
        id: "MN007",
        label: "No. of beds (as per INC norms)",
      },
      {
        id: "MN008",
        label: "Other specialities/ facility details",
      },
      {
        id: "MN009",
        label: "Financial resources",
      },
      {
        id: "MN010",
        label: "Affiliated hospital details",
      },
      {
        id: "MN011",
        label: "Application fee & inspection fee details",
      },
      {
        id: "MN012",
        label: "Inspection general details",
      },
    ],
  },
];

const modalList = [
  {
    id: 0,
    title: "Returned",
    description:
      "You application is on-hold because of so and so so issue was found in the so and so document. Please reupload them documents before dd/mon/yyyy.",
    timeline: "30 Jan 2022",
  },
  {
    id: 1,
    title: "Under review",
    description: "",
    timeline: "29 Jan 2022",
  },
  {
    id: 2,
    title: "Received on",
    description: "",
    timeline: "25 Jan 2022",
  },
];

interface ViewApplicationsProps {
  data?: any;
}

export const ViewApplications = ({ data }: ViewApplicationsProps) => {
  const [formData, setFormData] = useState({});
  const [applicationData, setApplicationData] = useState({});
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

  const updateMenuSelection = (e: any, id: any) => {
    e.preventDefault();

    ApplicationDetails[0].menuList.map((k, l) => {
      if (k.id === id) {
        setSelectedMenuLabel(k.label);
        setSelectedDataMenu(k);
      }
      return null;
    });
  };

  useEffect(() => {
    if (ApplicationDetails[0].menuList) {
      setSelectedMenuLabel(ApplicationDetails[0].menuList[0].label);
      setSelectedDataMenu(ApplicationDetails[0].menuList[0]);
    }

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
        <div className="container dashboard-inner-container mt-4">
          <FormView formData={formData} applicationData={applicationData} />
        </div>
      </div>
    </Fragment>
  );
};
