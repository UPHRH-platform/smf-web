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

      // tempArray.map((y: any, f: number) => {
      //   y.fields = [];
      //   tempFormArray.map((g: any, d: number) => {
      //     if (g.sideMenu === y.sideMenu) {
      //       y.fields.push(g);
      //     }
      //     return null;
      //   });
      //   return null;
      // });

      // setSelectedMenuLabel(tempArray[0].sideMenu);

      // setProcessedData(tempArray);

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

      setSelectedMenuLabel(arrThree[0].sideMenu);

      // console.log(tempArray)
      // console.log(arrThree)

      // setProcessedData(tempArray);
      setProcessedData(arrThree)

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
                  enableHandler={false}
                  enableSkip={false}
                  ariaLabel="returnModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                />
                <ModalTwo
                  id="rejectModal"
                  enableHandler={true}
                  enableSkip={false}
                  ariaLabel="returnModalLabel"
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
                  ariaLabel="returnModalLabel"
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
                      applicationData.comments ? applicationData.comments : ""
                    }
                    approvedNote={
                      applicationData.status !== LANG.FORM_STATUS.RETURNED &&
                      (applicationData.status === LANG.FORM_STATUS.APPROVED ||
                        applicationData.status === LANG.FORM_STATUS.REJECTED)
                        ? applicationData.notes
                        : ""
                    }
                    inspectorSummary={
                      applicationData.status ===
                      LANG.FORM_STATUS.INSPECTION_COMPLETED
                        ? applicationData.inspectorSummaryDataObject &&
                          applicationData.inspectorSummaryDataObject[
                            "Inspection Summary"
                          ]["Enter the summary of this inspection"]
                        : ""
                    }
                  />
                )}
                {selectedMenuData &&
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
                                      value={k.value.split(",") || ""}
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
                                      value={k.value.split(",") || ""}
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
                                      value={k.value.split(",") || ""}
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
