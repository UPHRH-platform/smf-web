import { CardTwo } from "../../components/cards";

/**
 * PastTab component renders
 * UI components for past-tab in
 * all applications page
 */

const pastTab = [
    {
        id: "PA005",
        title: "Form 2A",
        name: "Name of college",
        time: "Scheduled on: dd/mm/yyyy",
        showStatus: false,
        status: "New",
        showBtn: true,
        type: "button",
        btnText: "View application",
        isLink: true,
        link: "/all-applications/PA005"
    },
    {
        id: "PA006",
        title: "Form 2B",
        name: "Name of college",
        time: "Scheduled on: dd/mm/yyyy",
        showStatus: false,
        status: "Under inspection",
        showBtn: true,
        type: "button",
        btnText: "View application",
        isLink: true,
        link: "/all-applications/PA006"
    },
]

interface PastTabProps {
    data?: any
}

export const PastTab = ({ data }: PastTabProps) => {
    return (
        <div className="row pt-2">
            {pastTab.map((i, j) => {
                return (
                    <div
                        className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                        key={i.id}
                    >
                        <CardTwo
                            title={i.title}
                            name={i.name}
                            time={i.time}
                            showStatus={i.showStatus}
                            status={i.status}
                            statusLabel={i.status}
                            showBtn={i.showBtn}
                            type={i.type}
                            btnText={i.btnText}
                            isLink={i.isLink}
                            link={i.link}
                        />
                    </div>
                );
            })}
        </div>
    )

};
