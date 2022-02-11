import { Fragment, useEffect } from "react";
import { HeadingOne } from "../../components/headings";
import Header from "../../components/common/Header";
import { useHistory } from 'react-router-dom';
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import { sideMenuData as selectedSideMenuDataAtom, sideMenuLabel as sideMenuLabelAtom } from "../../states/atoms";
import { BtnOne, BtnTwo } from "../../components/buttons";
import { ModalOne } from "../../components/modal";
import { FormView } from "../../layouts";

/**
 * ViewApplications component renders
 * application detail page layout and its UI components
 */

const ApplicationDetails = [{
    id: "PA001",
    name: "Paramedical degree",
    menuList: [{
        id: "MN001",
        label: "General details",
        fields: [
            {
                id: "FI001",
                label: "Registration code",
                value: "UPSMF123456",
                showComments: false
            },
            {
                id: "FI002",
                label: "Course type",
                value: "Bachelors Degree",
                showComments: false
            },
            {
                id: "FI003",
                label: "Course",
                value: "Paramedical",
                showComments: false
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
                showComments: false
            },
            {
                id: "FI005",
                label: "Proposed Institute Name",
                value: "Veer Bahadur Singh Purvanchal University",
                showComments: false
            },
            {
                id: "FI006",
                label: "Address",
                value: "Shahganj Road, Siddikpur, Uttar Pradesh 222003",
                showComments: false
            },
        ],
    },
    {
        id: "MN003",
        label: "Training centre details"
    },
    {
        id: "MN004",
        label: "Training centre room details"
    },
    {
        id: "MN005",
        label: "Hostel room details"
    },
    {
        id: "MN006",
        label: "Hospital details"
    },
    {
        id: "MN007",
        label: "No. of beds (as per INC norms)"
    },
    {
        id: "MN008",
        label: "Other specialities/ facility details"
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
        label: "Application fee & inspection fee details"
    },
    {
        id: "MN012",
        label: "Inspection general details"
    }
    ]
}]

const modalList = [{
    id: 0,
    title: "Returned",
    description: "You application is on-hold because of so and so so issue was found in the so and so document. Please reupload them documents before dd/mon/yyyy.",
    timeline: "30 Jan 2022"
},
{
    id: 1,
    title: "Under review",
    description: "",
    timeline: "29 Jan 2022"
},
{
    id: 2,
    title: "Received on",
    description: "",
    timeline: "25 Jan 2022"
}
]


interface ViewApplicationsProps {
    data?: any
}

export const ViewApplications = ({ data }: ViewApplicationsProps) => {

    const [selectedMenuData, setSelectedDataMenu] = useRecoilState(selectedSideMenuDataAtom);
    const [selectedMenuLabel, setSelectedMenuLabel] = useRecoilState(sideMenuLabelAtom);

    let history = useHistory();

    const updateMenuSelection = (e: any, id: any) => {
        e.preventDefault();

        ApplicationDetails[0].menuList.map((k, l) => {
            if (k.id === id) {
                setSelectedDataMenu(k);
            } 
            return null;
        })
    }

    useEffect(() => {
        if (ApplicationDetails[0].menuList) {
            setSelectedMenuLabel(ApplicationDetails[0].menuList[0].label)
            setSelectedDataMenu(ApplicationDetails[0].menuList[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     console.log(selectedMenu)
    // }, [selectedMenu])

    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    {/* Section one */}
                    <div className="row">
                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7">
                            <div className="float-start">
                                <HeadingOne heading={ApplicationDetails[0].name} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                            {/* <div className="d-flex flex-row float-end mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0">
                                <div className="me-4">
                                    <BtnOne label="View status log" btnType="button" isLink={false} link="" isModal={true} floatBottom={false} modalId="staticBackdrop" />
                                </div>
                                <div className="">
                                    <BtnTwo label="Change status" btnType="button" isLink={false} link="" isModal={false} floatBottom={false} />
                                </div>
                                <ModalOne id="staticBackdrop" ariaLabel="staticBackdropLabel" heading="Status log" list={modalList}/>
                            </div> */}
                        </div>
                    </div>

                    {/* Section two */}
                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 pt-4">
                            {/* Side navigation */}
                            {ApplicationDetails[0].menuList.map((i, j) => {
                                return (
                                    <SideNavigation text={i.label} key={i.id} isSelected={selectedMenuLabel && selectedMenuLabel === i.label ? true : false} clickHandler={(e) => {
                                        updateMenuSelection(e, i.id)
                                    }} />
                                );
                            })}

                            {/* Form view */}
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mt-2">
                            <FormView />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}