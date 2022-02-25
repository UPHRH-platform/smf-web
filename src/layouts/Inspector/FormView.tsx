import { useEffect, useState } from "react";
import { CardThree } from "../../components/cards";
import {
  InspectCheckOne,
  Radio,
  SelectField,
  TextAreaField,
  TextField,
} from "../../components/form-elements";
import { HeadingOne, HeadingFour } from "../../components/headings";
import { ModalTwo } from "../../components/modal";
import { StatusBarLarge } from "../../components/status-bar";
import { useRecoilValue } from "recoil";
import { sideMenuData as selectedSideMenuDataAtom } from "../../states/atoms";
import { BtnOne, BtnTwo, BtnThree } from "../../components/buttons";
import btnStylesTwo from "../../components/buttons/BtnTwo.module.css";
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

/**
 * FormView component renders
 * form page layout and its UI components inside
 * view application page
 */

interface FormViewProps {
  applicationData?: any;
  formData?: any;
}

export const FormView = ({ applicationData, formData }: FormViewProps) => {
  const [selectedMenuData, setSelectedDataMenu] = useState<any[]>([]);
  const [enableInspectioComplete, setEnableInspectionComplete] =
    useState(false);
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useRecoilState(sideMenuLabelAtom);

  const [modalTextArea, setModalTextArea] =
    useRecoilState(modalTwoTextAreaAtom);
  const [modalInspectionValue, setModalInspectionValue] = useRecoilState(
    modalTwoInspectionValueAtom
  );
  const [dataObjectFormValue, setDataObjectFormValue] = useRecoilState(
    dataObjectInspectionFormAtom
  );

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
                  return tempFormArray.push({
                    id: b,
                    parent: n,
                    label: h,
                    value: Object.values(q)[b],
                    defaultValues: k.values,
                    fieldType: k.fieldType,
                    isCorrect: "",
                    inspectionValue: "",
                    comments: "",
                  });
                }
                return null;
              });
              return null;
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

  const onCheckCorrectness = (
    e: any,
    menuLabel: any,
    field: any,
    status?: string,
    comments?: any
  ) => {
    e.preventDefault();

    // console.log(menuLabel, field, status);

    let tempArray = [...processedData];

    tempArray.map((i, j) => {
      if (i.sideMenu === menuLabel) {
        i.fields.map((m: any, n: number) => {
          if (m.label === field) {
            if (status === "correct") {
              m.isCorrect = true;
              m.comments = "";
              m.inspectionValue = "";
            } else if (status === "incorrect") {
              m.isCorrect = false;
              m.comments = "";
              m.inspectionValue = "";
            } else {
              m.isCorrect = "";
              m.comments = "";
              m.inspectionValue = "";
            }
          }
        });
      }
    });

    // console.log(tempArray);

    setProcessedData(tempArray);
  };

  const submitFieldCorrectness = (e: any, menuLabel: any, field: any) => {
    e.preventDefault();

    // console.log(menuLabel, field);

    let comments: any = "";
    let correctField: any = "";

    let targetElement = document.getElementById(field);

    comments = targetElement?.querySelector("textarea")?.value;

    correctField = targetElement?.querySelector("input")?.value;

    let tempArray = [...processedData];

    tempArray.map((i, j) => {
      if (i.sideMenu === menuLabel) {
        i.fields.map((m: any, n: number) => {
          if (m.label.replace(/\s/g, "") === field) {
            setModalTextArea(comments);
            m.comments = comments;
            setModalInspectionValue(correctField);
            m.inspectionValue = correctField;
          }
        });
      }
    });

    setModalTextArea("");
    setModalInspectionValue("");
    // console.log(tempArray);
    setProcessedData(tempArray);
  };

  useEffect(() => {
    if (processedData.length) {
      let tempArray: any = [];
      processedData.map((i, j) => {
        i.fields &&
          i.fields.map((m: any, n: number) => {
            tempArray.push(m.isCorrect);
          });
      });

      if (tempArray.includes("")) {
        setEnableInspectionComplete(false);
      } else {
        if (formData.inspectionFields) {
          setEnableInspectionComplete(true);
        } else {
          setEnableInspectionComplete(false);
        }
      }
    }
  }, [selectedMenuLabel, processedData]);

  const processFormData = (e: any) => {
    e.preventDefault();

    let dataObject: any = {};

    let tempArray = [...processedData];

    tempArray.map((i, j) => {
      i.fields.map((m: any, n: number) => {
        dataObject[i.sideMenu] = {
          [m.label]: {
            value: m.isCorrect ? "correct" : "incorrect",
            comments: m.comments,
            inspectionValue: m.inspectionValue,
          },
          ...dataObject[i.sideMenu],
        };
      });
    });

    console.log(dataObject);

    history.push({
      pathname: `/inspection-summary/${formData.id}/${applicationData.applicationId}`,
      state: [formData, applicationData, dataObject],
    });

    setDataObjectFormValue(dataObject);
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
              <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 g-0 g-md-3"></div>
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
              <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mb-4">
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
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                  <div className="ps-4 pe-4 pt-3 mb-2 pb-1 col-4">
                                    <TextAreaField
                                      showLabel={k.label ? true : false}
                                      label={k.label || ""}
                                      isReadOnly={true}
                                      defaultValue={k.value || ""}
                                    />
                                  </div>
                                  <div className="">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                  <div className="">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                  <div className="">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                  <div className="">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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
                                  <div className="">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={
                                        k.comments === "" && k.isCorrect === ""
                                          ? "Edit note"
                                          : k.comments !== "" && !k.isCorrect
                                          ? k.isCorrect === ""
                                            ? "Edit note"
                                            : "Edit reason"
                                          : !k.isCorrect && k.comments === ""
                                          ? "Edit reason"
                                          : "Edit note"
                                      }
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) =>
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={k.label.replace(
                                                    /\s/g,
                                                    ""
                                                  )}
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "incorrect"
                                                    );
                                                  }}
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
                                      modalId={k.label.replace(/\s/g, "")}
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

                {selectedMenuData.length > 0 &&
                  selectedMenuData.map((m: any, n: number) => {
                    return (
                      <div className="" key={n}>
                        <ModalTwo
                          id={m.label.replace(/\s/g, "")}
                          enableHandler={true}
                          enableSkip={false}
                          subFieldType={m.fieldType}
                          subHeading={
                            m.comments === "" && m.isCorrect === ""
                              ? ""
                              : !m.isCorrect && m.comments === ""
                              ? "Enter the correct value"
                              : ""
                          }
                          ariaLabel={`${m.label.replace(/\s/g, "")}Label`}
                          heading={
                            m.comments === "" && m.isCorrect === ""
                              ? "Add note"
                              : m.comments !== "" && !m.isCorrect
                              ? "Enter the reason for the incorrect selection"
                              : !m.isCorrect && m.comments === ""
                              ? "Enter the reason for the incorrect selection"
                              : "Add note"
                          }
                          showTextAreaLabel={false}
                          submitHandler={(e) => {
                            submitFieldCorrectness(
                              e,
                              selectedMenuLabel,
                              m.label.replace(/\s/g, "")
                            );
                          }}
                          cancelHandler={(e) => {
                            onCheckCorrectness(
                              e,
                              selectedMenuLabel,
                              m.label.replace(/\s/g, ""),
                              ""
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                <div className="row">
                  <div className="col-12 mt-4">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-0 p-0 float-left">
                      {processedData.length > 0 &&
                        processedData[0].sideMenu !== selectedMenuLabel && (
                          <BtnThree
                            label="Previous"
                            btnType="button"
                            isLink={false}
                            link=""
                            isModal={false}
                            showIcon={true}
                            iconValue={`arrow_back`}
                            clickHandler={(e) => {
                              processedData.map((m, n) => {
                                if (m.sideMenu === selectedMenuLabel) {
                                  setSelectedMenuLabel(
                                    processedData[n - 1].sideMenu
                                  );
                                }
                              });
                            }}
                          />
                        )}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-0 p-0 float-right">
                      <div className="float-right">
                        {processedData.length > 0 &&
                        processedData[processedData.length - 1].sideMenu !==
                          selectedMenuLabel ? (
                          <BtnTwo
                            label="Next"
                            btnType="button"
                            isLink={false}
                            link=""
                            isModal={false}
                            showIcon={true}
                            iconValue={`arrow_forward`}
                            clickHandler={(e) => {
                              processedData.map((m, n) => {
                                if (m.sideMenu === selectedMenuLabel) {
                                  setSelectedMenuLabel(
                                    processedData[n + 1].sideMenu
                                  );
                                }
                              });
                            }}
                          />
                        ) : enableInspectioComplete ? (
                          <BtnTwo
                            label="Inspection completed"
                            btnType="button"
                            isLink={true}
                            link={`/inspection-summary/${formData.id}/${applicationData.applicationId}`}
                            stateData={formData}
                            isModal={false}
                            showIcon={false}
                            iconValue=""
                            clickHandler={(e) => processFormData(e)}
                          />
                        ) : (
                          <button
                            type="button"
                            className={`${btnStylesTwo.btn_two_disabled}`}
                            disabled={true}
                          >
                            Inspection completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
