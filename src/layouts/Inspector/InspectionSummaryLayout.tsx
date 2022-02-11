import { BtnOne, BtnTwo } from "../../components/buttons";
import { CardFour } from "../../components/cards";
import { SelectField, TextAreaField } from "../../components/form-elements";
import { HeadingOne } from "../../components/headings";
import styles from "./InspectionSummaryLayout.module.css";
/**
 * InspectionSummaryLayout component renders
 * fields of inspector summary page
 */
const selectOptions = [
    {
        id: "SE001",
        label: "Somorjit Phuritshabam",
        value: "Somorjit Phuritshabam",
    },
    {
        id: "SE002",
        label: "Shoaib Muhammed",
        value: "Shoaib Muhammed",
    },
];

interface InspectionSummaryLayoutProps {
    data?: any;
}

export const InspectionSummaryLayout = ({
    data,
}: InspectionSummaryLayoutProps) => {
    return (
        <div className="">
            <HeadingOne heading="Inspection summary" />
            <div
                className={`${styles.summary_card} m-5 m-sm-2 m-md-5 m-lg-5 m-xl-5 p-4`}
            >
                <TextAreaField
                    showLabel={true}
                    label="Enter summary of this inspection"
                    placeholder="Type here"
                />
                <div className="mt-3">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4 p-0 m-0">
                                <SelectField
                                    option={selectOptions}
                                    selectId="inpsectorSelect"
                                    selectName="InspectorSelect"
                                    label="Add people accompanied you"
                                    showLabel={true}
                                    placeholder="Select from the list"
                                />
                            </div>
                            <div className="col-3 ms-2 mt-4 pt-1">
                                <BtnOne
                                    label="Add"
                                    showIcon={false}
                                    btnType="button"
                                    isModal={false}
                                    isLink={false}
                                    link=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="col-12 p-0 m-0">
                        <div className="row ">
                            <div className="col-6">
                                <CardFour
                                    title="Somorjit Phuritshabam"
                                    subTitle="Designation"
                                    showLogo={true}
                                />
                            </div>
                            <div className="col-6">
                                <CardFour
                                    title="Shoaib Muhammed"
                                    subTitle="Designation"
                                    showLogo={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <hr />
                </div>
                <div className="mt-3">
                    <div className="col-12 p-0 m-0">
                        <div className="row">
                            <div className="col-1">
                                {/* <input
                                    type="checkbox"
                                    id="conditions"
                                    name="Conditions"
                                    value="Accepted conditions"
                                ></input> */}
                            </div>
                            <div className="col-11">
                                <p>
                                    Sunt autem vel illum, qui dolorem aspernari ut calere ignem,
                                    nivem esse albam, dulce mel quorum nihil ut ita ruant itaque
                                    earum rerum necessitatibus saepe eveniet, ut labore et aperta
                                    iudicari ea commodi consequatur? quis autem vel eum iure
                                    reprehenderit, qui in liberos atque corrupti.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <hr />
                </div>
                <div className="mt-3">
                    <div className="col-12 m-0 p-0">
                        <div className="row m-0 p-0">
                            <div className="col-12 m-0 p-0">
                                <div className="float-right m-0 p-0">
                                    <BtnTwo
                                        label="Submit"
                                        showIcon={false}
                                        btnType="submit"
                                        isModal={false}
                                        isLink={false}
                                        link=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
