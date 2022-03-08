/* eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable no-self-assign*/
import { useDebugValue, useEffect, useState } from "react";
import { CardFive, CardThree } from "../../components/cards";
import {
  InspectCheckOne,
  Radio,
  SelectField,
  TextAreaField,
  TextField,
} from "../../components/form-elements";
import {
  HeadingOne,
  HeadingFour,
  HeadingFive,
} from "../../components/headings";
import { InspectionScheduleModal, ModalTwo } from "../../components/modal";
import { StatusBarLarge } from "../../components/status-bar";
import { BtnSix } from "../../components/buttons";
import { CheckBoxField } from "../../components/form-elements";
import { BooleanField } from "../../components/form-elements";
import { FileUploadView } from "../../components/form-elements";
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import {
  sideMenuLabel as sideMenuLabelAtom,
  modalTwoTextArea as modalTwoTextAreaAtom,
  modalTwoInspectionValue as modalTwoInspectionValueAtom,
  dataObjectInspectionForm as dataObjectInspectionFormAtom,
} from "../../states/atoms";
import { useHistory } from "react-router-dom";
import { APP, LANG } from "../../constants";
import styles from "../../components/status-bar/StatusBarLarge.module.css";
import stylesTwo from "../../components/modal/InspectionScheduleModal.module.css";
import { ReviewService } from "../../services";
import Notify from "../../helpers/notify";
import Helper from "../../helpers/auth";
import { HeadingThree } from "../../components/headings/HeadingThree";

/**
 * ConsentFormViewProps component renders
 * form page layout and its UI components inside
 * view application page for assiting inspector role
 */

interface ConsentFormViewProps {
  applicationData?: any;
  formData?: any;
  showConsentBtns: boolean;
}

export const ConsentFormView = ({
  applicationData,
  formData,
  showConsentBtns,
}: ConsentFormViewProps) => {
  const [selectedMenuData, setSelectedDataMenu] = useState<any[]>([]);
  const [statusLog, setStatusLog] = useState<any[]>([]);
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useRecoilState(sideMenuLabelAtom);

  const reviewerNote = useRecoilState(modalTwoTextAreaAtom);

  let history = useHistory();

  const [processedData, setProcessedData] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>(
    localStorage.getItem("user")
  );
  const [consentApplication, setConsentApplication] = useState();
  const [consentMessage, setConsentMessage] = useState<any>({});

  const updateMenuSelection = (e: any, value: string) => {
    e.preventDefault();

    setSelectedMenuLabel(value);
  };

  useEffect(() => {
    if (applicationData.dataObject) {
      let objectValues: any = [];
      let objectValueApp: any = [];

      let objectKeys = Object.keys(applicationData.dataObject).sort();

      Object.keys(applicationData.dataObject)
        .sort()
        .forEach(function (v, i) {
          objectValues.push(applicationData.dataObject[v]);
        });

      let inspectorDataObj: any = [];
      if (applicationData.inspectorDataObject) {
        inspectorDataObj = Object.keys(
          applicationData.inspectorDataObject.dataObject
        ).sort();

        Object.keys(applicationData.dataObject)
          .sort()
          .forEach(function (v, i) {
            objectValueApp.push(
              applicationData.inspectorDataObject.dataObject[v]
            );
          });
      }

      let arrOne: any = [];
      let arrTwo: any = {};
      let arrThree: any = [];

      formData.fields.map((i: any, j: number) => {
        return arrOne.push(i);
      });

      let res = arrOne.reduce(
        ((i) => (r: any, s: any) => {
          if (s.name === "heading") {
            r.push([]);
            i++;
          }
          r.length > 0 && r[r.length - 1].push(s);
          return r;
        })(0),
        []
      );

      res.map((i: any, j: number) => {
        let fields: any = [];
        i.map((k: any, l: number) => {
          if (k.fieldType === "heading") {
            arrTwo = {
              sideMenu: k.values[0].heading,
            };
          } else {
            fields.push({
              id: j.toString() + l.toString(),
              label: k.name,
              value: "",
              defaultValues: k.values,
              fieldType: k.fieldType,
              isCorrect: "",
              inspectionValue: "",
              comments: "",
            });
          }
          return null;
        });
        arrTwo = { ...arrTwo, fields };

        arrThree.push(arrTwo);

        return null;
      });

      let tempArray: any = [];
      let tempFormArray: any = [];
      let tempArrayTwo: any = [];

      objectKeys.map((i, j) => {
        return tempArray.push({
          sideMenu: i,
          fields: Object.values(objectValues)[j],
        });
      });

      objectKeys.map((i, j) => {
        return tempArrayTwo.push({
          sideMenu: i,
          fields: Object.values(objectValueApp)[j],
        });
      });

      if (arrThree.length !== 0) {
        tempArray.map((i: any, n: number) => {
          arrThree.map((m: any, l: number) => {
            if (m.sideMenu === i.sideMenu) {
              m.fields.map((k: any, y: number) => {
                if (!applicationData.inspectorDataObject) {
                  return tempFormArray.push({
                    id: parseInt(k.id),
                    parent: parseInt(k.id.split("")[0]),
                    sideMenu: m.sideMenu,
                    label: k.label,
                    value: i.fields[k.label],
                    defaultValues: k.values,
                    fieldType: k.fieldType,
                    isCorrect: "",
                    inspectionValue: "",
                    comments: "",
                  });
                } else {
                  return tempFormArray.push({
                    id: parseInt(k.id),
                    parent: parseInt(k.id.split("")[0]),
                    sideMenu: m.sideMenu,
                    label: k.label,
                    value: i.fields[k.label],
                    defaultValues: k.values,
                    fieldType: k.fieldType,
                    isCorrect:
                      tempArrayTwo[n].fields[k.label]["value"] === "correct"
                        ? true
                        : false,
                    inspectionValue:
                      tempArrayTwo[n].fields[k.label]["inspectionValue"],
                    comments: tempArrayTwo[n].fields[k.label]["comments"],
                  });
                }
              });
            }
            return null;
          });
          return null;
        });
      } else {
        // console.log(arrOne);
        tempArray.map((i: any, n: number) => {
          arrOne.map((m: any, l: number) => {
            return tempFormArray.push({
              id: l,
              parent: l,
              sideMenu: i.sideMenu,
              label: m.name,
              value: i.fields[m.name],
              defaultValues: m.values,
              fieldType: m.fieldType,
              isCorrect: "",
              inspectionValue: "",
              comments: "",
            });
          });
          return null;
        });
      }

      if (arrThree.length !== 0) {
        arrThree.map((y: any, f: number) => {
          y.fields = [];
          tempFormArray.map((g: any, d: number) => {
            if (g.sideMenu === y.sideMenu) {
              y.fields.push(g);
            }
            return null;
          });
          return null;
        });
      } else {
        tempArray.map((y: any, f: number) => {
          y.fields = [];
          tempFormArray.map((g: any, d: number) => {
            if (g.sideMenu === y.sideMenu) {
              y.fields.push(g);
            }
            return null;
          });
          return null;
        });
      }

      if (arrThree.length > 0) {
        setSelectedMenuLabel(arrThree[0].sideMenu);
        setProcessedData(arrThree);
      } else {
        setSelectedMenuLabel(tempArray[0].sideMenu);
        setProcessedData(tempArray);
      }

      getApplicationStatusLog(applicationData.applicationId);
      getConsentStatus();
    }

    let user: any = userDetails.length > 0 && JSON.parse(userDetails);
    setUserDetails(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationData]);

  useEffect(() => {
    if (
      processedData &&
      selectedMenuLabel &&
      selectedMenuLabel.length !== 0 &&
      processedData.length !== 0
    ) {
      setSelectedDataMenu([]);
      processedData.map((i, j) => {
        if (i.sideMenu === selectedMenuLabel) {
          setSelectedDataMenu(i.fields);
        }
        return null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenuLabel, processedData]);

  useEffect(() => {
    if (reviewerNote[0] !== "") {
      let payload = {};

      if (reviewerNote[0] === "Empty!") {
        payload = {
          applicationId: applicationData.applicationId,
        };
      } else {
        payload = {
          applicationId: applicationData.applicationId,
          notes: reviewerNote[0],
        };
      }

      ReviewService.returnApplication(payload).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            Notify.success("Application returned to institute");
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
      history.push(APP.ROUTES.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewerNote]);

  const getConsentStatus = () => {
    let user = userDetails.length > 0 && JSON.parse(userDetails);
    if (
      user.id &&
      applicationData.inspection.assistingInspector.includes(user.id)
    ) {
      applicationData.inspection.assignedTo.map((i: any, j: number) => {
        if (
          i.id === user.id &&
          i.status === LANG.FORM_STATUS.INSPECTION_COMPLETED
        ) {
          setConsentApplication(i.consentApplication);
          setConsentMessage({ comments: i.comments, date: i.consentDate });
        }
        return null;
      });
    }

    if (user.id && applicationData.inspection.leadInspector.includes(user.id)) {
      applicationData.inspection.assignedTo.map((i: any, j: number) => {
        if (
          i.id === user.id &&
          i.status === LANG.FORM_STATUS.INSPECTION_COMPLETED
        ) {
          setConsentApplication(i.leadInspector);
          setConsentMessage({ comments: i.comments, date: i.consentDate });
        }
        return null;
      });
    }
  };

  const getApplicationStatusLog = (id: any) => {
    ReviewService.getStatusLog(id).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          setStatusLog(response.responseData);
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

  const approveOrReject = (e: any, id: string) => {
    e.preventDefault();
    let textAreaElement = document.getElementById(id);
    const comments = textAreaElement?.querySelector("textarea")?.value;

    if (id === "consentModal") {
      let req = {
        applicationId: applicationData.applicationId,
        agree: true,
        comments: comments,
      };
      ReviewService.consentApplication(req).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            history.push(APP.ROUTES.DASHBOARD);
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
    } else {
      let req = {
        applicationId: applicationData.applicationId,
        agree: false,
        comments: comments,
      };
      ReviewService.consentApplication(req).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            history.push(APP.ROUTES.DASHBOARD);
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

  return (
    <div className="">
      {applicationData && (
        <>
          <div className="row pt-3">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
              <div className="float-start">
                <HeadingOne heading={applicationData.title} />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div className="row  mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 g-0 g-md-3">
                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 pt-3"></div>
                <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mt-3">
                  <div className="d-flex justify-content-end align-items-center">
                    {showConsentBtns &&
                      applicationData.inspection &&
                      applicationData.inspection.status ===
                        LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED && (
                        <>
                          <div className="mr-3">
                            <BtnSix
                              label="I disagree"
                              showIcon={true}
                              iconValue={`close`}
                              isLink={false}
                              link=""
                              btnType="button"
                              isModal={true}
                              modalId="disagreeModal"
                              disabled={
                                applicationData.status ===
                                LANG.FORM_STATUS.RETURNED
                                  ? true
                                  : false
                              }
                            />
                          </div>
                          <div className="mr-3">
                            <BtnSix
                              label="I consent"
                              showIcon={true}
                              iconValue={`check`}
                              isLink={false}
                              link=""
                              btnType="button"
                              isModal={true}
                              modalId="consentModal"
                              disabled={
                                applicationData.status ===
                                LANG.FORM_STATUS.RETURNED
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        </>
                      )}

                    {consentApplication !== undefined &&
                      applicationData.inspection &&
                      (applicationData.inspection.status ===
                        LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                        applicationData.inspection.status ===
                          LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED) &&
                      consentApplication === false && (
                        <div className="">
                          <BtnSix
                            label="I disagree"
                            showIcon={true}
                            iconValue={`close`}
                            isLink={false}
                            link=""
                            btnType="button"
                            isModal={true}
                            modalId="disagreeModal"
                            disabled={
                              applicationData.inspection.status ===
                                LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                              applicationData.inspection.status ===
                                LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED
                                ? true
                                : false
                            }
                          />
                        </div>
                      )}

                    {consentApplication !== undefined &&
                      applicationData.inspection &&
                      (applicationData.inspection.status ===
                        LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                        applicationData.inspection.status ===
                          LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED) &&
                      consentApplication === true && (
                        <div className="">
                          <BtnSix
                            label="I consent"
                            showIcon={true}
                            iconValue={`check`}
                            isLink={false}
                            link=""
                            btnType="button"
                            isModal={true}
                            modalId="consentModal"
                            disabled={
                              applicationData.inspection.status ===
                                LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                              applicationData.inspection.status ===
                                LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED
                                ? true
                                : false
                            }
                          />
                        </div>
                      )}

                    {/* <div className="">
                        <BtnFour
                          label="View status log"
                          btnType="button"
                          isLink={false}
                          link=""
                          isModal={true}
                          floatBottom={false}
                          modalId="statusLog"
                        />
                      </div> */}
                  </div>
                </div>
                <ModalTwo
                  id="returnModal"
                  enableHandler={false}
                  enableSkip={false}
                  ariaLabel="returnModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                />
                <ModalTwo
                  id="disagreeModal"
                  enableHandler={true}
                  enableSkip={false}
                  ariaLabel="disagreeModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                  submitHandler={(e: any) => {
                    approveOrReject(e, "disagreeModal");
                  }}
                />
                <ModalTwo
                  id="consentModal"
                  enableHandler={true}
                  enableSkip={false}
                  ariaLabel="consentModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                  submitHandler={(e: any) => {
                    approveOrReject(e, "consentModal");
                  }}
                />
                <InspectionScheduleModal
                  id="sendToInspection"
                  showTextAreaLabel={false}
                  heading="Schedule the inspection"
                  ariaLabel="sendToInspectionLabel"
                  applicationId={applicationData.applicationId}
                />

                {Helper.getUserRole() === APP.ROLE.REGULATOR && (
                  <InspectionScheduleModal
                    id="sendToInspectionEdit"
                    showTextAreaLabel={false}
                    heading="Schedule the inspection"
                    ariaLabel="sendToInspectionEditLabel"
                    applicationId={applicationData.applicationId}
                    inspectionData={
                      applicationData.inspection
                        ? applicationData.inspection
                        : ""
                    }
                  />
                )}
                {/* <ModalOne
                    id="statusLog"
                    ariaLabel="statusLogLabel"
                    heading="Status log"
                    list={statusLog}
                  /> */}
              </div>
            </div>
          </div>

          <div className="">
            <div className="row">
              {/* Side navigation */}
              <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 pt-3">
                {processedData &&
                  processedData.map((i: any, j: number) => {
                    return (
                      <SideNavigation
                        text={i.sideMenu}
                        key={j}
                        isSelected={
                          selectedMenuLabel && selectedMenuLabel === i.sideMenu
                            ? true
                            : false
                        }
                        clickHandler={(e) => {
                          updateMenuSelection(e, i.sideMenu);
                        }}
                      />
                    );
                  })}
              </div>

              {/* Form view */}
              <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mt-3 mb-4">
                {consentMessage && (
                  <>
                    {consentMessage.date && (
                      <div className="pb-2">
                        <HeadingThree
                          title={`You gave your concent on ${consentMessage.date}`}
                        />
                      </div>
                    )}

                    {consentMessage.comments && (
                      <div className="mb-3">
                        <CardFive content={consentMessage.comments} />
                      </div>
                    )}
                  </>
                )}
                {applicationData.status && (
                  <StatusBarLarge
                    isChange={true}
                    status={applicationData.status}
                    label={applicationData.status}
                    timeStamp={applicationData.timestamp}
                    applicationId={applicationData.applicationId}
                    inspectionData={
                      applicationData.inspection
                        ? applicationData.inspection
                        : ""
                    }
                    comments={
                      applicationData.comments ? applicationData.comments : ""
                    }
                    approvedNote={
                      applicationData.status !== LANG.FORM_STATUS.RETURNED &&
                      (applicationData.status === LANG.FORM_STATUS.APPROVED ||
                        applicationData.status === LANG.FORM_STATUS.REJECTED)
                        ? applicationData.notes
                        : ""
                    }
                    showInspectionDetails={false}
                  />
                )}

                {(applicationData.status ===
                  LANG.FORM_STATUS.SENT_FOR_INSPECTION ||
                  applicationData.inspection.status ===
                    LANG.FORM_STATUS.INSPECTION_COMPLETED) &&
                  applicationData.inspectorSummaryDataObject && (
                    <div className="mt-3">
                      <CardThree
                        children={
                          <div className="p-4">
                            <div className="">
                              <TextAreaField
                                isReadOnly={true}
                                label="Inspection summary"
                                showLabel={true}
                                defaultValue={
                                  applicationData.inspectorSummaryDataObject[
                                    "Inspection Summary"
                                  ]["Enter the summary of this inspection"]
                                }
                              />
                            </div>
                            <div className="pt-2">
                              <label
                                className={`${styles.status_bar_custom_heading}`}
                              >
                                Lead inspector
                              </label>
                              <div className="pt-3">
                                {applicationData &&
                                  applicationData.inspection &&
                                  applicationData.inspection.assignedTo.map(
                                    (k: any, l: number) => {
                                      if (k.leadInspector) {
                                        return (
                                          <div
                                            className={`${stylesTwo.inspector_name_list} mb-2`}
                                            key={l}
                                          >
                                            <div className="row ps-3 pe-3">
                                              <div className="d-flex flex-row">
                                                <div
                                                  className={`${stylesTwo.inspector_name_square}`}
                                                >
                                                  {k.firstName[0] +
                                                    k.lastName[0]}
                                                </div>
                                                <p className="ps-2">
                                                  {k.firstName}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }
                                  )}
                              </div>
                            </div>
                            <div className="pt-2">
                              <label
                                className={`${styles.status_bar_custom_heading}`}
                              >
                                Assisting inspector
                              </label>
                              <div className="pt-3">
                                {applicationData &&
                                  applicationData.inspection &&
                                  applicationData.inspection.assignedTo.map(
                                    (k: any, l: number) => {
                                      if (!k.leadInspector) {
                                        return (
                                          <div
                                            className={`${stylesTwo.inspector_name_list} mb-2`}
                                            key={l}
                                          >
                                            <div className="row ps-3 pe-3">
                                              <div className="d-flex flex-row">
                                                <div
                                                  className={`${stylesTwo.inspector_name_square}`}
                                                >
                                                  {k.firstName[0] +
                                                    k.lastName[0]}
                                                </div>
                                                <p className="ps-2">
                                                  {k.firstName}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }
                                  )}
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </div>
                  )}

                {(applicationData.status === LANG.FORM_STATUS.APPROVED ||
                  applicationData.status === LANG.FORM_STATUS.REJECTED) && (
                  <div className="mt-3">
                    <div className="mt-3 mb-3">
                      <CardThree
                        children={
                          <div className="p-4">
                            <div className="">
                              <TextAreaField
                                isReadOnly={true}
                                label="Comments from reviewer"
                                showLabel={true}
                                defaultValue={
                                  applicationData.comments
                                    ? applicationData.comments[0].value
                                    : ""
                                }
                              />
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                )}

                {selectedMenuData.length > 0 &&
                  selectedMenuData.map((k: any, l: number) => {
                    switch (k.fieldType) {
                      case "text":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 col-4">
                                    <TextField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      type="text"
                                      isReadOnly={true}
                                      value={k.value || ""}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "date":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 col-4">
                                    <TextField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      type="date"
                                      isReadOnly={true}
                                      value={k.value || ""}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "dropdown":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 col-4">
                                    <SelectField
                                      showLabel={k.label ? true : false}
                                      selectName="reviewSelect"
                                      selectId="reviewSelect"
                                      isReadOnly={true}
                                      label={k.label || ""}
                                      option={k.defaultValues}
                                      value={k.value || ""}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "radio":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 mb-3">
                                    <HeadingFour heading={k.label || ""} />
                                    <div className="col-12 p-0 m-0">
                                      <div className="row pt-1">
                                        {k.defaultValues &&
                                          k.defaultValues.map(
                                            (d: any, f: number) => {
                                              return (
                                                <div
                                                  className="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2"
                                                  key={f}
                                                >
                                                  <Radio
                                                    label={d.key || ""}
                                                    isSelected={
                                                      k.value === d.value
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "textarea":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 mb-3 pb-1 col-4">
                                    <TextAreaField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      isReadOnly={true}
                                      defaultValue={k.value || ""}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "numeric":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 col-4">
                                    <TextField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      type="number"
                                      isReadOnly={true}
                                      value={k.value || ""}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "multiselect":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 mb-4 col-4">
                                    <SelectField
                                      showLabel={k.label ? true : false}
                                      selectName="reviewSelect"
                                      selectId="reviewSelect"
                                      isReadOnly={true}
                                      label={k.label || ""}
                                      option={k.defaultValues}
                                      value={k.value.split(",") || ""}
                                      isMultiple={true}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "checkbox":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 mb-3">
                                    <HeadingFour heading={k.label || ""} />
                                    <CheckBoxField
                                      label={k.label || ""}
                                      showLabel={false}
                                      value={k.value.split(",") || ""}
                                      defaultValues={k.defaultValues}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "file":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 mb-4 col-7">
                                    <FileUploadView
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      value={k.value.split(",") || ""}
                                    />
                                  </div>

                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      case "boolean":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 mb-4">
                                    <BooleanField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      isReadOnly={true}
                                    />
                                  </div>
                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      inspectionValue={k.inspectionValue}
                                      disableEdit={true}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : k.isCorrect === true ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={false}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      }
                                      showComments={
                                        k.comments !== "" ? true : false
                                      }
                                      comments={k.comments}
                                    />
                                  </div>
                                </>
                              }
                            />
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
