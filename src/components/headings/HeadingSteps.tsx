import styles from "./HeadingSteps.module.css";

/**
 * HeadingFive component renders
 * larger variant of headings with prefix icon
 */

interface HeadingStepsProps {
    stepsData: any;
}

export const HeadingSteps = ({ stepsData}: HeadingStepsProps) => {
return(
    <ul className={`${styles.stepper}  d-flex flex-row justify-content-center align-items-center w-100`}>
    {stepsData && stepsData.map((i:any) => {
            return(
                <li className={`${styles.stepper__item}  d-flex flex-column justify-content-center align-items-center me-3`}>
                <div className={`${styles.heading_prefix_circle} ${i.active?styles.active_step:''}`}>{i.count}</div>
                <div className={`${styles.heading_five}`}>{i.label}</div>
            </li>
            )
    })}
    </ul>
)
};
