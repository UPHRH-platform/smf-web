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
} from "../../components/form-elements";
import { ReviewService } from "../../services";
import { useHistory } from "react-router-dom";
import { APP, LANG } from "../../constants";
import Notify from "../../helpers/notify";

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
      let objectKeys = Object.keys(applicationData.dataObject);
      let objectValues = Object.values(applicationData.dataObject);

      setSelectedMenuLabel(objectKeys[0]);

      let tempArray: any = [];
      let tempFormArray: any = [];

      objectKeys.map((i, j) => {
        return tempArray.push({
          sideMenu: i,
          fields: [Object.values(objectValues)[j]],
        });
      });

      tempArray.map((m: any, n: number) => {
        formData &&
          formData.fields.map((k: any, l: number) => {
            Object.values(m.fields).map((q: any, w: number) => {
              Object.keys(q).map((h: any, b: number) => {
                if (h === k.name) {
                  tempFormArray.push({
                    id: b,
                    parent: n,
                    label: h,
                    value: Object.values(q)[b],
                    defaultValues: k.values,
                    fieldType: k.fieldType,
                  });
                }
                return null;
              });
              return null
            });
            return null;
          });
          return null;
      });

      tempArray.map((y: any, f: number) => {
        y.fields = [];
        tempFormArray.map((g: any, d: number) => {
          if (g.parent === f) {
            y.fields.push(g);
          }
          return null;
        });
        return null;
      });

      setProcessedData(tempArray);
    }

    if (applicationData.applicationId) {
      // getApplicationStatusLog(applicationData.applicationId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationData]);

  useEffect(() => {
    if (processedData && selectedMenuLabel && selectedMenuLabel.length !== 0) {
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
          comments: reviewerNote[0],
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
          console.log(response.responseData);
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
              <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 g-0 g-md-3">
                <div className="col"></div>
                <div className="col">
                  <div className="float-end">
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
                        applicationData.status === LANG.FORM_STATUS.RETURNED
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="float-end">
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
                </div>
                <div className="col">
                  <div className="float-end">
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
                <ModalTwo
                  id="returnModal"
                  ariaLabel="returnModalLabel"
                  showTextAreaLabel={false}
                  heading="Add note"
                  textAreaPlaceholder="Write here"
                />
                <InspectionScheduleModal
                  id="sendToInspection"
                  showTextAreaLabel={false}
                  heading="Schedule the inspection"
                  ariaLabel="sendToInspectionLabel"
                  applicationId={applicationData.applicationId}
                />
                <ModalOne
                  id="statusLog"
                  ariaLabel="statusLogLabel"
                  heading="Status log"
                  list=""
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
                    status={applicationData.status}
                    label={applicationData.status}
                    timeStamp={applicationData.timestamp}
                    applicationId={applicationData.applicationId}
                    inspectionData={
                      applicationData.inspection
                        ? applicationData.inspection
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
                                <div className="ps-4 pe-4 pt-3 col-4">
                                  <TextField
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    type="text"
                                    isReadOnly={true}
                                    value={k.value || ""}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      case "date":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3 col-4">
                                  <TextField
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    type="date"
                                    isReadOnly={true}
                                    value={k.value || ""}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      case "dropdown":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
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
                              }
                            />
                          </div>
                        );
                      case "radio":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
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
                              }
                            />
                          </div>
                        );
                      case "textarea":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3 mb-3 pb-1 col-4">
                                  <TextAreaField
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    isReadOnly={true}
                                    defaultValue={k.value || ""}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      case "numeric":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3 col-4">
                                  <TextField
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    type="number"
                                    isReadOnly={true}
                                    value={k.value || ""}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      case "multiselect":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
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
                              }
                            />
                          </div>
                        );
                      case "checkbox":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3 mb-3">
                                  <HeadingFour heading={k.label || ""} />
                                  <CheckBoxField
                                    label={k.label || ""}
                                    showLabel={false}
                                    value={k.value.split(",") || ""}
                                    defaultValues={k.defaultValues}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      case "file":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3 mb-4 col-7">
                                  <FileUploadView
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    value={k.value.split(",") || ""}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      case "boolean":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3 mb-4">
                                  <BooleanField
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    isReadOnly={true}
                                  />
                                </div>
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
