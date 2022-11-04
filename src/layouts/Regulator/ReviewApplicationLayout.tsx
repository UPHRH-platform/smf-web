/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { HeadingFour, HeadingOne } from "../../components/headings";
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import {
  sideMenuLabel as sideMenuLabelAtom,
  modalTwoTextArea as modalTwoTextAreaAtom,
} from "../../states/atoms";
import { BtnFour, BtnFive, BtnSix } from "../../components/buttons";
import {
  ModalOne,
  ModalTwo,
  InspectionScheduleModal,
} from "../../components/modal";
import { StatusBarLarge } from "../../components/status-bar";
import { CardThree } from "../../components/cards";
import {
  BooleanField,
  CheckBoxField,
  FileUploadView,
  Radio,
  SelectField,
  TextAreaField,
  TextField,
  InspectCheckOne,
} from "../../components/form-elements";
import { ReviewService } from "../../services";
import { useHistory } from "react-router-dom";
import { APP, LANG } from "../../constants";
import Notify from "../../helpers/notify";
import Helper from "../../helpers/auth";
import styles from "../../components/status-bar/StatusBarLarge.module.css";
import stylesTwo from "../../components/modal/InspectionScheduleModal.module.css";

/**
 * ReviewApplicationLayout component renders
 * review contents based on the selected applications for
 * the regulator
 */

interface ReviewApplicationLayoutProps {
  formData?: any;
  applicationData?: any;
}

export const ReviewApplicationLayout = ({
  formData,
  applicationData,
}: ReviewApplicationLayoutProps) => {
  const [selectedMenuData, setSelectedDataMenu] = useState<any[]>([]);
  const [statusLog, setStatusLog] = useState<any[]>([]);
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useRecoilState(sideMenuLabelAtom);

  const reviewerNote = useRecoilState(modalTwoTextAreaAtom);
  const userRole = Helper.getUserRole();

  let history = useHistory();

  const [processedData, setProcessedData] = useState<any[]>([]);

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
              attachments: [],
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
                    defaultValues: k.defaultValues,
                    fieldType: k.fieldType,
                    isCorrect: "",
                    inspectionValue: "",
                    comments: "",
                    attachments: [],
                  });
                } else {
                  return tempFormArray.push({
                    id: parseInt(k.id),
                    parent: parseInt(k.id.split("")[0]),
                    sideMenu: m.sideMenu,
                    label: k.label,
                    value: i.fields[k.label],
                    defaultValues: k.defaultValues,
                    fieldType: k.fieldType,
                    isCorrect:
                      tempArrayTwo &&
                      tempArrayTwo[n].fields.length &&
                      tempArrayTwo[n].fields[k.label]["value"] === "correct"
                        ? true
                        : false,
                    inspectionValue:
                      tempArrayTwo &&
                      tempArrayTwo[n].fields.length &&
                      tempArrayTwo[n].fields[k.label]["inspectionValue"],
                    comments:
                      tempArrayTwo &&
                      tempArrayTwo[n].fields.length &&
                      tempArrayTwo[n].fields[k.label]["comments"],
                    attachments:
                      tempArrayTwo &&
                      tempArrayTwo[n].fields.length &&
                      tempArrayTwo[n].fields[k.label]["attachments"],
                  });
                }
              });
            }
            return null;
          });
          return null;
        });
      } else {
        tempArray.map((i: any, n: number) => {
          arrOne.map((m: any, l: number) => {
            return tempFormArray.push({
              id: l,
              parent: l,
              sideMenu: i.sideMenu,
              label: m.name,
              value: i.fields[m.name],
              defaultValues: m.defaultValues,
              fieldType: m.fieldType,
              isCorrect: "",
              inspectionValue: "",
              comments: "",
              attachments: [],
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
    }

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
  }, [selectedMenuLabel, processedData]);

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
    const req = {
      applicationId: applicationData.applicationId,
      notes: comments,
    };
    if (id === "approveModal") {
      ReviewService.approveApplication(req).then(
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
      ReviewService.rejectApplication(req).then(
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

  const returnApplication = (e: any) => {
    e.preventDefault();

    let textAreaElement = document.getElementById("returnModal");
    let comments = textAreaElement?.querySelector("textarea")?.value;

    if (comments !== "" && comments && comments?.length > 5) {
      let payload = {};

      payload = {
        applicationId: applicationData.applicationId,
        notes: comments,
      };

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
    } else {
      Notify.error("Kindly enter proper review comments!");
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
                <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mt-3 mb-4">
                  <div className="d-flex justify-content-end align-items-center">
                    {applicationData.status === LANG.FORM_STATUS.NEW && (
                      <>
                        <div className="mr-3">
                          <BtnFive
                            label="Return to institute"
                            showIcon={true}
                            iconValue={`arrow_back`}
                            isLink={false}
                            link=""
                            btnType="button"
                            isModal={true}
                            modalId="returnModal"
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
                            label="Send for inspection"
                            showIcon={true}
                            iconValue={`arrow_forward`}
                            isLink={false}
                            link=""
                            btnType="button"
                            floatBottom={false}
                            isModal={true}
                            modalId="sendToInspection"
                            disabled={
                              applicationData.status ===
                              LANG.FORM_STATUS.SENT_FOR_INSPECTION
                                ? true
                                : false
                            }
                          />
                        </div>
                      </>
                    )}
                    {applicationData.status ===
                      LANG.FORM_STATUS.INSPECTION_COMPLETED && (
                      <>
                        <div className="mr-3">
                          <BtnSix
                            label="Reject"
                            showIcon={true}
                            iconValue={`close`}
                            isLink={false}
                            link=""
                            btnType="button"
                            isModal={true}
                            modalId="rejectModal"
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
                            label="Approve"
                            showIcon={true}
                            iconValue={`check`}
                            isLink={false}
                            link=""
                            btnType="button"
                            isModal={true}
                            modalId="approveModal"
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
                    <div className="">
                      <BtnFour
                        label="View status log"
                        btnType="button"
                        isLink={false}
                        link=""
                        isModal={true}
                        floatBottom={false}
                        modalId="statusLog"
                      />
                    </div>
                  </div>
                </div>
                <ModalTwo
                  id="returnModal"
                  enableHandler={true}
                  enableSkip={false}
                  ariaLabel="returnModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                  submitHandler={(e: any) => {
                    returnApplication(e);
                  }}
                />
                <ModalTwo
                  id="rejectModal"
                  enableHandler={true}
                  enableSkip={false}
                  ariaLabel="rejectModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                  submitHandler={(e: any) => {
                    approveOrReject(e, "rejectModal");
                  }}
                />
                <ModalTwo
                  id="approveModal"
                  enableHandler={true}
                  enableSkip={false}
                  ariaLabel="approveModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                  submitHandler={(e: any) => {
                    approveOrReject(e, "approveModal");
                  }}
                />
                <InspectionScheduleModal
                  id="sendToInspection"
                  showTextAreaLabel={false}
                  heading="Schedule the inspection"
                  ariaLabel="sendToInspectionLabel"
                  applicationId={applicationData.applicationId}
                />

                {(userRole === APP.ROLE.REGULATOR || userRole === APP.ROLE.SUPER_ADMIN) && (
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
                <ModalOne
                  id="statusLog"
                  ariaLabel="statusLogLabel"
                  heading="Status log"
                  list={statusLog}
                />
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
                      applicationData.notes ? applicationData.notes : ""
                    }
                    approvedNote={
                      applicationData.status !== LANG.FORM_STATUS.RETURNED &&
                      (applicationData.status === LANG.FORM_STATUS.APPROVED ||
                        applicationData.status === LANG.FORM_STATUS.REJECTED)
                        ? applicationData.notes
                        : ""
                    }
                    showInspectionDetails={true}
                  />
                )}

                {applicationData.status ===
                  LANG.FORM_STATUS.INSPECTION_COMPLETED &&
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
                                Lead assessor
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
                                                  {k.firstName +
                                                    " " +
                                                    k.lastName}
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
                                Assisting assessor
                              </label>
                              <div className="pt-3">
                                {applicationData &&
                                  applicationData.inspection &&
                                  applicationData.inspection.assignedTo.map(
                                    (k: any, l: number) => {
                                      if (!k.leadInspector) {
                                        return (
                                          <>
                                            <div
                                              className={`${stylesTwo.inspector_name_list} mb-2`}
                                              key={l}
                                            >
                                              <div className="row ps-3 pe-3">
                                                <div className="d-flex flex-row col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                  <div
                                                    className={`${stylesTwo.inspector_name_square}`}
                                                  >
                                                    {k.firstName[0] +
                                                      k.lastName[0]}
                                                  </div>
                                                  <p className="ps-2">
                                                    {k.firstName +
                                                      " " +
                                                      k.lastName}
                                                  </p>
                                                </div>

                                                <div className="d-flex flex-row col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                                  <div className="col-12 m-0 p-0">
                                                    <p
                                                      className={`${stylesTwo.consent_message_status} float-end`}
                                                    >
                                                      {k.consentApplication
                                                        ? "I consent"
                                                        : "I disagree"}
                                                      <span
                                                        className={`${stylesTwo.consent_message_symbol} material-icons ps-2`}
                                                      >
                                                        {k.consentApplication
                                                          ? "done"
                                                          : "close"}
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                              {k.comments && (
                                                <>
                                                  <hr className="p-0 m-0"></hr>
                                                  <div className="px-4">
                                                    <p className="pb-2">
                                                      {k.comments}
                                                    </p>
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </>
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
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
                                </>
                              }
                            />
                          </div>
                        );
                      case "email":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <>
                                  <div className="ps-4 pe-4 pt-3 col-4">
                                    <TextField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      type="email"
                                      isReadOnly={true}
                                      value={k.value || ""}
                                    />
                                  </div>
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                      defaultValue={k.value || ""}
                                    />
                                  </div>
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                      value={k.value ? k.value.split(",") : ""}
                                      isMultiple={true}
                                    />
                                  </div>
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                      value={k.value ? k.value.split(",") : ""}
                                      defaultValues={k.defaultValues}
                                    />
                                  </div>
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                      value={k.value ? k.value.split(",") : ""}
                                    />
                                  </div>
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
                                      value={k.value}
                                      isReadOnly={true}
                                    />
                                  </div>
                                  {(applicationData.status ===
                                    LANG.FORM_STATUS.INSPECTION_COMPLETED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.APPROVED ||
                                    applicationData.status ===
                                      LANG.FORM_STATUS.REJECTED) && (
                                    <div className="mt-3">
                                      <InspectCheckOne
                                        label="Is the given information found correct?"
                                        inspectionValue={k.inspectionValue}
                                        disableEdit={true}
                                        showAttachment={false}
                                        attachments={k.attachments}
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
                                  )}
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
