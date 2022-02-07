import { CardTwo } from "../../components/cards";

/**
 * UpcomingTab component renders
 * UI components for upcoming-tab in
 * all applications page
 */

const upcomingTab = [
    {
        id: "PA003",
        title: "Form 1A",
        name: "Name of college",
        time: "Scheduled on: dd/mm/yyyy",
        showStatus: false,
        status: "New",
        showBtn: true,
        type: "button",
        btnText: "View application",
        isLink: true,
        link: "/all-applications/PA003"
    },
    {
        id: "PA004",
        title: "Form 1B",
        name: "Name of college",
        time: "Scheduled on: dd/mm/yyyy",
        showStatus: false,
        status: "Under inspection",
        showBtn: true,
        type: "button",
        btnText: "View application",
        isLink: true,
        link: "/all-applications/PA004"
    },
]

interface UpcomingTabProps {
    data?: any
}

export const UpcomingTab = ({ data }: UpcomingTabProps) => {
    return (
        <div className="row pt-2">
            {upcomingTab.map((i, j) => {
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
