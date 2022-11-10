import { BtnTwo } from "../../components/buttons";
import { HeadingOne } from "../../components/headings";
import { LANG } from "../../constants";
import styles from "./InspectionCompleteLayout.module.css";

/**
 * InspectionCompleteLayout component renders
 * UI of inspection completion page
 */

interface InspectionCompleteLayoutProps {
    data?: any;
}

export const InspectionCompleteLayout = ({
    data,
}: InspectionCompleteLayoutProps) => {
    return (
        <div className={`${styles.inspection_complete} mt-5`}>
            <div className="mb-4">
                <div className={`${styles.inspection_complete_cricle}`}>
                    <span className={`${styles.inspection_complete_icon} material-icons`}>
                        thumb_up
                    </span>
                </div>
            </div>
            <div className="">
                <HeadingOne heading={`${LANG.FORM_STATUS_TEXT.inspectionCompleted}`} />
            </div>
            <div className="mt-4">
                <BtnTwo label="View pending applications" showIcon={false} isLink={true} isModal={false} btnType="button" link="/all-applications" />
            </div>
        </div>
    );
};
