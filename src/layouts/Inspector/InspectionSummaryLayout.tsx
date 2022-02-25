import { useEffect, useState } from "react";
import { BtnTwo } from "../../components/buttons";
import { CardFour } from "../../components/cards";
import { TextAreaField, TextField } from "../../components/form-elements";
import { HeadingFour, HeadingOne } from "../../components/headings";
import styles from "./InspectionSummaryLayout.module.css";
import stylesTwo from "../../components/modal/InspectionScheduleModal.module.css";
import stylesThree from "../../components/status-bar/StatusBarLarge.module.css";
import btnStylesTwo from "../../components/buttons/BtnTwo.module.css";
import { useRecoilValue } from "recoil";
import { dataObjectInspectionForm as dataObjectInspectionFormAtom } from "../../states/atoms";
import { ReviewService } from "../../services";
import Notify from "../../helpers/notify";
import { APP } from "../../constants/index";
import { useHistory } from "react-router-dom";

/**
 * InspectionSummaryLayout component renders
 * fields of inspector summary page
 */

interface InspectionSummaryLayoutProps {
  data?: any;
}

export const InspectionSummaryLayout = ({
  data,
}: InspectionSummaryLayoutProps) => {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [textAreaData, setTextAreaData] = useState("");
  const [textData, setTextData] = useState("");
  const [dateData, setDateData] = useState("");
  const [numericData, setNumericData] = useState("");
  const [acceptConditions, setAcceptConditions] = useState(false);

  const dataObjectFormValue = useRecoilValue(dataObjectInspectionFormAtom);
  let history = useHistory();

  useEffect(() => {
    if (
      textAreaData.length > 0 &&
      document.querySelector("#summaryInspectionCheck:checked") !== null
    ) {
      setAcceptConditions(true);
    } else {
      setAcceptConditions(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textAreaData]);

  const submitInspection = (e: any) => {
    e.preventDefault();

    let inspectorSummaryDataObject: any = {
      "Inspection Summary": {},
    };

    {
      data &&
        data.location.state &&
        data.location.state[0].inspectionFields.map((i: any, j: number) => {
          let targetValue = document.querySelector(i.fieldType)?.value;

          if (targetValue && targetValue !== null && targetValue !== "") {
            inspectorSummaryDataObject["Inspection Summary"] = {
              [i.name]: targetValue,
            };
          }
        });
    }

    let payload = {
      applicationId: data.location.state[1].applicationId,
      dataObject: data.location.state[2],
      inspectorSummaryDataObject,
    };

    ReviewService.submitInspectionDetails(payload).then((response) => {
      if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
        history.push("/inspection-complete");
      } else {
        Notify.error(response.statusInfo.errorMessage);
      }
    });
  };

  return (
    <div className="">
      <HeadingOne heading="Inspection summary" />
      <div
        className={`${styles.summary_card} m-5 m-sm-2 m-md-5 m-lg-5 m-xl-5 p-4`}
      >
        {/* Dynamic input fields */}
        {data &&
          data.location.state &&
          data.location.state[0].inspectionFields.map((i: any, j: number) => {
            switch (i.fieldType) {
              case "textarea":
                return (
                  <div className="" key={j}>
                    <TextAreaField
                      showLabel={i.name ? true : false}
                      label={i.name}
                      placeholder="Type here"
                      value={textAreaData}
                      changeHandler={(e) => setTextAreaData(e.target.value)}
                    />
                  </div>
                );
              case "text":
                return (
                  <div className="" key={j}>
                    <TextField
                      showLabel={i.name ? true : false}
                      label={i.name}
                      isReadOnly={false}
                      type="text"
                      value={textData}
                      changeHandler={(e) => setTextData(e.target.value)}
                    />
                  </div>
                );
              case "date":
                return (
                  <div className="" key={j}>
                    <TextField
                      showLabel={i.name ? true : false}
                      label={i.name}
                      isReadOnly={false}
                      type="date"
                      value={dateData}
                      changeHandler={(e) => setDateData(e.target.value)}
                    />
                  </div>
                );
              case "numeric":
                return (
                  <div className="" key={j}>
                    <TextField
                      showLabel={i.name ? true : false}
                      label={i.name}
                      isReadOnly={false}
                      type="number"
                      value={numericData}
                      changeHandler={(e) => setNumericData(e.target.value)}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}

        {/* Inspectors list */}
        <div className="pt-2">
          <label className={`${stylesThree.status_bar_custom_heading}`}>
            Lead inspector
          </label>
          <div className="pt-3">
            {data &&
              data.location.state &&
              data.location.state[1].inspection.assignedTo.map(
                (k: any, l: number) => {
                  if (k.leadInspector) {
                    return (
                      <div
                        className={`${stylesTwo.inspector_name_list} mb-2`}
                        key={l}
                      >
                        <div className="row pb-0 ps-3 pe-3">
                          <div className="d-flex flex-row">
                            <div
                              className={`${stylesTwo.inspector_name_square}`}
                            >
                              {k.firstName[0] + k.lastName[0]}
                            </div>
                            <p className="ps-2 pt-2">{k.firstName}</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              )}
          </div>
        </div>
        <div className="pt-2">
          <label className={`${stylesThree.status_bar_custom_heading}`}>
            Assisting inspector's
          </label>
          <div className="pt-3">
            {data &&
              data.location.state &&
              data.location.state[1].inspection.assignedTo.map(
                (k: any, l: number) => {
                  if (!k.leadInspector) {
                    return (
                      <div
                        className={`${stylesTwo.inspector_name_list} mb-2`}
                        key={l}
                      >
                        <div className="row pb-0 ps-3 pe-3">
                          <div className="d-flex flex-row">
                            <div
                              className={`${stylesTwo.inspector_name_square}`}
                            >
                              {k.firstName[0] + k.lastName[0]}
                            </div>
                            <p className="ps-2 pt-2">{k.firstName}</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              )}
          </div>
        </div>

        {/* Separator */}
        <div className="mt-3">
          <hr />
        </div>

        {/* Check box */}
        <div className="mt-3">
          <div className="col-12 p-0 m-0">
            <div className="d-flex flex-row">
              <div className="me-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="summaryInspectionCheck"
                  onChange={(e) => {
                    if (
                      document.querySelector(
                        "#summaryInspectionCheck:checked"
                      ) !== null
                    ) {
                      if (textAreaData !== "") {
                        setAcceptConditions(true);
                      } else {
                        setAcceptConditions(false);
                      }
                    } else {
                      setAcceptConditions(false);
                    }
                  }}
                ></input>
              </div>
              <div className="">
                <p className="">
                  {data.location &&
                    data.location.state[0].inspectionFields.map(
                      (m: any, n: number) => {
                        if (m.fieldType === "checkbox") {
                          return m.name;
                        }
                      }
                    )}
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
                  {acceptConditions ? (
                    <BtnTwo
                      label="Submit"
                      showIcon={false}
                      btnType="button"
                      isModal={false}
                      isLink={true}
                      clickHandler={(e) => submitInspection(e)}
                      link="/inspection-complete"
                    />
                  ) : (
                    <button
                      type="button"
                      className={`${btnStylesTwo.btn_two_disabled} mb-4`}
                      disabled={true}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
