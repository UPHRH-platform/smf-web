import { useEffect, useState } from "react";
import styles from "./ModalOne.module.css";
import stylesTwo from "./InspectionScheduleModal.module.css";
import btnStyle from "../buttons/BtnOne.module.css";
import btnStyleTwo from "../buttons/BtnTwo.module.css";
import { SelectField, TextField } from "../form-elements";
import { BtnOne } from "../buttons";
import { HeadingFive } from "../headings";
import moment from "moment";
import { APP, LANG } from "../../constants";
import { ReviewService } from "../../services";
import Notify from "../../helpers/notify";
import { useHistory } from "react-router-dom";

/**
 * InspectionScheduleModal component renders
 * modal with inspection fields
 */

interface InspectionScheduleModalProps {
  heading?: string;
  id: string;
  ariaLabel: string;
  textAreaLabel?: string;
  showTextAreaLabel: boolean;
  textAreaPlaceholder?: string;
  applicationId?: any;
  inspectionData?: any;
}

export const InspectionScheduleModal = ({
  heading,
  id,
  ariaLabel,
  textAreaLabel,
  showTextAreaLabel,
  textAreaPlaceholder,
  applicationId,
  inspectionData,
}: InspectionScheduleModalProps) => {
  const [date, setDate] = useState("");
  const [inspectorsList, setInspectorsList] = useState<any[]>([]);
  const [curatedInspectorsListOne, setCuratedInspectorsListOne] = useState<
    any[]
  >([]);
  const [curatedInspectorsListTwo, setCuratedInspectorsListTwo] = useState<
    any[]
  >([]);
  const [leadInspectors, setLeadInspectors] = useState<any[]>([]);
  const [curatedLeadInspectors, setCuratedLeadInspectors] = useState<any[]>([]);
  const [curatedAssitingInspectors, setCuratedAssitingInspectors] = useState<
    any[]
  >([]);
  const [currentLeadIns, setCurrentLeadIns] = useState("");
  // const [currentLeadInsName, setCurrentLeadInsName] = useState(
  //   "Select from the list"
  // );
  const [assitingInspectors, setAssitingInspectors] = useState<any[]>([]);
  const [currentAssitingIns, setCurrentAssitingIns] = useState("");
  // const [currentAssitingInsName, setCurrentAssitingInsName] = useState(
  //   "Select from the list"
  // );
  const [disableSubmit, setDisableSubmit] = useState(true);

  let history = useHistory();

  useEffect(() => {
    ReviewService.getAllInspectors().then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          let tempArray: any = [];

          response.responseData.map((i: any, j: number) => {
            return tempArray.push({
              value: i.id,
              key: i.firstName + " " + i.lastName,
              logo: i.firstName[0] + i.lastName[0],
            });
          });

          setInspectorsList(tempArray);
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
  }, []);

  useEffect(() => {
    if (inspectionData) {
      let curatedObject: any = {};
      let curatedArray: any = [];

      inspectionData.assignedTo.map((i: any, j: number) => {
        if (i.leadInspector) {
          return (curatedObject = {
            key: i.firstName + " " + i.lastName,
            value: i.id,
            logo: i.firstName[0] + i.lastName[0],
          });
        } else {
          return curatedArray.push({
            key: i.firstName + " " + i.lastName,
            value: i.id,
            logo: i.firstName[0] + i.lastName[0],
          });
        }
      });

      let tempArrayOne = [...curatedLeadInspectors];
      tempArrayOne = [curatedObject];
      let tempArrayTwo = [...curatedAssitingInspectors];
      tempArrayTwo = curatedArray;
      let tempArrayThree = [...assitingInspectors];

      tempArrayTwo.map((k, l) => {
        return tempArrayThree.push(k.value.toString());
      });

      setTimeout(() => {
        setCuratedLeadInspectors(tempArrayOne);
        setCuratedAssitingInspectors(tempArrayTwo);
        setDate(inspectionData.scheduledDate);
        setAssitingInspectors(tempArrayThree);
      }, 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectionData]);

  const addLeadInspectors = (e: any) => {
    e.preventDefault();
    if (currentLeadIns !== "") {
      let tempArray = leadInspectors;
      tempArray.push(currentLeadIns);

      let removeDup = tempArray.filter((item, index, self) => {
        return self.indexOf(item) === index;
      });

      let curatedArray: any = {};
      removeDup.map((k: any, l: number) => {
        inspectorsList.map((m, n) => {
          if (m.value === parseInt(k)) {
            return (curatedArray = {
              key: m.key,
              value: parseInt(k),
              logo: m.logo,
            });
          }
          return null;
        });
        return null;
      });

      setLeadInspectors(removeDup);

      let tempInsArray = [...inspectorsList];

      tempInsArray.map((k, l) => {
        if (k.value === parseInt(currentLeadIns)) {
          let index = tempInsArray.indexOf(k);
          if (index > -1) {
            tempInsArray.splice(index, 1);
          }
          return null;
        }
        return null;
      });

      setCuratedInspectorsListTwo(tempInsArray);

      setCuratedLeadInspectors([curatedArray]);
    }
  };

  const removeLeadInspector = (e: any, index: number) => {
    e.preventDefault();

    let tempArray = [...curatedLeadInspectors];

    if (index > -1) {
      tempArray.splice(index, 1);
    }

    let tempArrayTwo = [...leadInspectors];
    if (index > -1) {
      tempArrayTwo.splice(index, 1);
    }

    setLeadInspectors(tempArrayTwo);

    let tempInsArray = [...inspectorsList];

    tempInsArray.map((k, l) => {
      if (k.value === parseInt(currentLeadIns)) {
        let index = tempInsArray.indexOf(k);
        if (index > -1) {
          tempInsArray.splice(index, 1);
        }
        return null;
      }
      return null;
    });

    setCuratedInspectorsListTwo(tempInsArray);

    setCuratedLeadInspectors(tempArray);
  };

  const addAssitingInspectors = (e: any) => {
    e.preventDefault();
    if (currentAssitingIns !== "") {
      let tempArray = assitingInspectors;
      tempArray.push(currentAssitingIns);

      let removeDup = tempArray.filter((item, index, self) => {
        return self.indexOf(item) === index;
      });

      let curatedArray: any = [];
      removeDup.map((k: any, l: number) => {
        inspectorsList.map((m, n) => {
          if (m.value === parseInt(k)) {
            return curatedArray.push({
              key: m.key,
              value: parseInt(k),
              logo: m.logo,
            });
          }
          return null;
        });
        return null;
      });

      setAssitingInspectors(removeDup);

      let tempInsArray = [...inspectorsList];

      curatedArray.map((m: any, n: number) => {
        tempInsArray.map((k, l) => {
          let index = tempInsArray.indexOf(k);
          if (k.value === m.value) {
            if (index > -1) {
              tempInsArray.splice(index, 1);
            }
            return null;
          }
          return null;
        });
        return null;
      });

      setCuratedInspectorsListOne(tempInsArray);

      setCuratedAssitingInspectors(curatedArray);
    }
  };

  const removeAssitingInspectors = (e: any, index: any) => {
    e.preventDefault();

    let tempArray = [...curatedAssitingInspectors];

    if (index > -1) {
      tempArray.splice(index, 1);
    }

    let tempArrayTwo = [...assitingInspectors];
    if (index > -1) {
      tempArrayTwo.splice(index, 1);
    }

    setAssitingInspectors(tempArrayTwo);

    let tempInsArray = [...inspectorsList];

    tempArray.map((m: any, n: number) => {
      tempInsArray.map((k, l) => {
        let index = tempInsArray.indexOf(k);
        if (k.value === m.value) {
          if (index > -1) {
            tempInsArray.splice(index, 1);
          }
          return null;
        }
        return null;
      });
      return null;
    });

    setCuratedInspectorsListOne(tempInsArray);

    setCuratedAssitingInspectors(tempArray);
  };

  const submitInspectionSchedule = (e: any) => {
    e.preventDefault();

    let leadInspector: any = [];
    let assistingInspector: any = [];

    curatedAssitingInspectors.map((i, j) => {
      return assistingInspector.push(i.value);
    });

    curatedLeadInspectors.map((i, j) => {
      return leadInspector.push(i.value);
    });

    let payload = {
      leadInspector: leadInspector,
      assistingInspector: assistingInspector,
      applicationId: applicationId,
      scheduledDate: date,
    };

    ReviewService.assignToInspection(payload).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          Notify.success(`${LANG.FORM_STATUS_TEXT.sentForInspection}.`);
          history.push(APP.ROUTES.DASHBOARD);
          setCuratedAssitingInspectors([]);
          setCuratedLeadInspectors([]);
          setDate("");
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

  // const getName = (value: any, type: string) => {
  //   if (type === "assistingInspector") {
  //     inspectorsList.map((k, l) => {
  //       if (k.value === parseInt(value)) {
  //         setCurrentAssitingInsName(k.key);
  //       }
  //     });
  //   }

  //   if (type === "leadInspector") {
  //     inspectorsList.map((k, l) => {
  //       if (k.value === parseInt(value)) {
  //         setCurrentLeadInsName(k.key);
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    if (curatedAssitingInspectors.length === 0) {
      setDisableSubmit(true);
    } else if (curatedLeadInspectors.length === 0) {
      setDisableSubmit(true);
    } else if (applicationId === "") {
      setDisableSubmit(true);
    } else if (date === "" || date === "Invalid date") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [curatedAssitingInspectors, curatedLeadInspectors, date, applicationId]);

  return (
    <div
      className={`modal fade`}
      tabIndex={-1}
      id={id}
      data-backdrop="static"
      data-keyboard="false"
      aria-labelledby={ariaLabel}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className={`${styles.custom_model_content} modal-content`}>
          <div className={`${styles.custom_modal_footer} modal-header`}>
            <h5
              className={`${styles.custom_modal_title} modal-title`}
              id="staticBackdropLabel"
            >
              {heading}
            </h5>
          </div>

          {/* Body */}
          <div
            className={`${styles.custom_modal_body} modal-body m-0 pb-0 pt-0`}
          >
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className={`${stylesTwo.text_area_one} p-3`}>
                  <div className="mb-3">
                    <HeadingFive heading="Add lead assessor" count={1} />
                  </div>
                  <div className="row">
                    <div className="col-9">
                     
                      <SelectField
                        showLabel={false}
                        option={
                          curatedInspectorsListOne.length > 0
                            ? curatedInspectorsListOne
                            : inspectorsList
                        }
                        selectId="leadInspector"
                        selectName="leadInspector"
                        placeholder="Select from the list"
                        value={
                          currentLeadIns.length ? currentLeadIns : "Select from the list"
                        }
                        changeHandler={(e) => {
                          setCurrentLeadIns(e.target.value);
                          // getName(e.target.value, "leadInspector");
                        }}
                      />
                    </div>
                    <div className="col-2">
                      {currentLeadIns !== "" ? (
                        <BtnOne
                          label="Add"
                          btnType="button"
                          isLink={false}
                          link=""
                          clickHandler={(e) => addLeadInspectors(e)}
                        />
                      ) : (
                        <button
                          type="button"
                          className={`${btnStyle.btn_one_disabled}`}
                          disabled={true}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="pt-2">
                    {curatedLeadInspectors &&
                      curatedLeadInspectors.map((k, l) => {
                        return (
                          <div
                            className={`${stylesTwo.inspector_name_list} mb-2`}
                            key={l}
                          >
                            <div className="row ps-3 pe-3">
                              <div className="col-10">
                                <div className="d-flex flex-row">
                                  <div
                                    className={`${stylesTwo.inspector_name_square}`}
                                  >
                                    {k.logo}
                                  </div>
                                  <p className="ps-2">{k.key}</p>
                                </div>
                              </div>
                              <div className="col-2">
                                <span
                                  className={`${stylesTwo.name_list_close} material-icons`}
                                  onClick={(e) => removeLeadInspector(e, l)}
                                >
                                  close
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className={`${stylesTwo.text_area_one} p-3 mt-3`}>
                  <div className="mb-3">
                    <HeadingFive heading="Add assisting assessor" count={2} />
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-9 col-lg-9">
                      
                      <SelectField
                        showLabel={false}
                        option={
                          curatedInspectorsListTwo.length > 0
                            ? curatedInspectorsListTwo
                            : inspectorsList
                        }
                        selectId="assistingInspectors"
                        selectName="assistingInspectors"
                        placeholder="Select from the list"
                        value={
                         currentAssitingIns.length ? currentAssitingIns : "Select from the list"
                        }
                        changeHandler={(e) => {
                          setCurrentAssitingIns(e.target.value);
                          // getName(e.target.value, "assistingInspector");
                        }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-2 col-lg-2">
                      {currentAssitingIns !== "" ? (
                        <BtnOne
                          label="Add"
                          btnType="button"
                          isLink={false}
                          link=""
                          clickHandler={(e) => addAssitingInspectors(e)}
                        />
                      ) : (
                        <button
                          type="button"
                          className={`${btnStyle.btn_one_disabled}`}
                          disabled={true}
                        >
                          Add
                        </button>
                      )}
                    </div>
                    <div className="pt-2">
                      {curatedAssitingInspectors &&
                        curatedAssitingInspectors.map((k, l) => {
                          return (
                            <div
                              className={`${stylesTwo.inspector_name_list} mb-2`}
                              key={l}
                            >
                              <div className="row ps-3 pe-3">
                                <div className="col-10">
                                  <div className="d-flex flex-row">
                                    <div
                                      className={`${stylesTwo.inspector_name_square}`}
                                    >
                                      {k.logo}
                                    </div>
                                    <p className="ps-2">{k.key}</p>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <span
                                    className={`${stylesTwo.name_list_close} material-icons`}
                                    onClick={(e) =>
                                      removeAssitingInspectors(e, l)
                                    }
                                  >
                                    close
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 mt-3 mt-sm-3 mt-md-3 mt-lg-0">
                <div className={`${stylesTwo.text_area_one} p-3`}>
                  <div className="mb-3">
                    <HeadingFive heading="Select date" count={3} />
                  </div>
                  <div className="w-100">
                    <TextField
                      label=""
                      showLabel={false}
                      type="date"
                      value={moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")}
                      changeHandler={(e) => {
                        setDate(moment(e.target.value).format("DD-MM-YYYY"));
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    {date && date !== "Invalid date" && (
                      <label
                        className={`${stylesTwo.label_style_one} ps-1`}
                      >{`Date selected: ${date}`}</label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`${styles.custom_modal_footer} modal-footer p-0 m-0 pt-3 pb-3`}
          >
            <div className="col-6 m-0">
              <button
                type="button"
                className={`${btnStyle.btn_one} me-2`}
                data-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Cancel
              </button>
            </div>
            <div className="col-6 m-0">
              <div className="float-end">
                {!disableSubmit ? (
                  <button
                    type="button"
                    className={`${btnStyleTwo.btn_two}`}
                    data-dismiss="modal"
                    onClick={(e) => submitInspectionSchedule(e)}
                  >
                    Schedule
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`${btnStyleTwo.btn_two_disabled}`}
                    disabled={true}
                  >
                    Schedule
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
