/* eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable no-self-assign*/
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
import { BtnTwo, BtnThree } from "../../components/buttons";
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
      let objectValues: any = [];
      let objectValueApp: any = [];

      let objectKeys = Object.keys(applicationData.dataObject).sort();

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

      Object.keys(applicationData.dataObject)
        .sort()
        .forEach(function (v, i) {
          objectValues.push(applicationData.dataObject[v]);
        });

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

    let tempArray = [...processedData];

    tempArray.map((i, j) => {
      if (i.sideMenu === menuLabel) {
        i.fields.map((m: any, n: number) => {
          if (m.label === field) {
            setModalTextArea(m.comments);
            setModalInspectionValue(m.inspectionValue);
            if (status === "correct") {
              m.isCorrect = true;
              m.comments = "";
              m.inspectionValue = "";
              setModalTextArea("");
              setModalInspectionValue("");
            } else if (status === "incorrect") {
              m.isCorrect = false;
              m.comments = m.comments;
              m.inspectionValue = m.inspectionValue;
            } else {
              m.isCorrect = "";
              m.comments = m.comments;
              m.inspectionValue = m.inspectionValue;
            }
          } else {
            if (!m.comments && !m.isCorrect) {
              m.isCorrect = "";
            }
          }
          return null;
        });
      }
      return null;
    });

    setProcessedData(tempArray);
  };

  const submitFieldCorrectness = (e: any, menuLabel: any, field: any) => {
    e.preventDefault();

    let comments: any = "";
    let correctField: any = "";

    let targetElement = document.getElementById(field);

    comments = targetElement?.querySelector("textarea")?.value;

    correctField = targetElement?.querySelector("input")?.value;

    let tempArray = [...processedData];

    tempArray.map((i, j) => {
      if (i.sideMenu === menuLabel) {
        i.fields.map((m: any, n: number) => {
          if (
            m.label.replace(/\s/g, "").replace(/[^a-zA-Z ]/g, "") + m.id ===
            field
          ) {
            setModalTextArea(comments);
            m.comments = comments;
            setModalInspectionValue(correctField);
            m.inspectionValue = correctField;
          }
          return null;
        });
      }
      return null;
    });

    setModalTextArea("");
    setModalInspectionValue("");
    setProcessedData(tempArray);
  };

  useEffect(() => {
    if (processedData.length) {
      let tempArray: any = [];
      processedData.map((i, j) => {
        i.fields &&
          i.fields.map((m: any, n: number) => {
            return tempArray.push(m.isCorrect);
          });
        return null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        return null;
      });
      return null;
    });

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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
                                    />
                                  </div>
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
                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
                                      children={
                                        <div className="d-flex flex-row">
                                          {k.isCorrect === "" ? (
                                            <>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Correct"
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={false}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  clickHandler={(e) => {
                                                    onCheckCorrectness(
                                                      e,
                                                      selectedMenuLabel,
                                                      k.label,
                                                      "correct"
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="me-3">
                                                <Radio
                                                  isSelected={true}
                                                  label="Incorrect"
                                                  isModal={true}
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      defaultValue={k.value || ""}
                                    />
                                  </div>
                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label.replace(/\s/g, "") +
                                                    k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      value={
                                        (k.value && k.value.split(",")) || ""
                                      }
                                    />
                                  </div>
                                  <div className="">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                                      modalTriggerLabel={"Edit"}
                                      disableEdit={false}
                                      clickHandler={(e) => {
                                        setModalTextArea(k.comments);
                                        setModalInspectionValue(
                                          k.inspectionValue
                                        );
                                      }}
                                      inspectionValue={k.inspectionValue}
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                                  modalId={
                                                    k.label
                                                      .replace(/\s/g, "")
                                                      .replace(
                                                        /[^a-zA-Z ]/g,
                                                        ""
                                                      ) + k.id
                                                  }
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
                                      modalId={
                                        k.label
                                          .replace(/\s/g, "")
                                          .replace(/[^a-zA-Z ]/g, "") + k.id
                                      }
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
                          id={
                            m.label
                              .replace(/\s/g, "")
                              .replace(/[^a-zA-Z ]/g, "") + m.id
                          }
                          enableHandler={true}
                          enableSkip={false}
                          subFieldType={m.fieldType}
                          subHeading={
                            m.comments === "" && m.isCorrect === ""
                              ? ""
                              : m.comments !== "" &&
                                !m.inspectionValue &&
                                m.isCorrect === undefined
                              ? "Enter the correct value"
                              : !m.isCorrect && m.comments === ""
                              ? "Enter the correct value"
                              : m.comments !== "" &&
                                m.isCorrect === "" &&
                                !m.inspectionValue
                              ? ""
                              : m.comments !== "" &&
                                m.isCorrect &&
                                m.inspectionValue
                              ? ""
                              : m.comments !== "" &&
                                m.isCorrect &&
                                !m.inspectionValue
                              ? ""
                              : !m.comments && m.isCorrect && !m.inspectionValue
                              ? ""
                              : "Enter the correct value"
                          }
                          ariaLabel={`${
                            m.label
                              .replace(/\s/g, "")
                              .replace(/[^a-zA-Z ]/g, "") + m.id
                          }Label`}
                          heading={
                            m.comments === "" && m.isCorrect === ""
                              ? "Add note"
                              : m.comments !== "" &&
                                !m.isCorrect &&
                                m.inspectionValue
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
                              m.label
                                .replace(/\s/g, "")
                                .replace(/[^a-zA-Z ]/g, "") + m.id
                            );
                          }}
                          cancelHandler={(e) => {
                            onCheckCorrectness(
                              e,
                              selectedMenuLabel,
                              m.label
                                .replace(/\s/g, "")
                                .replace(/[^a-zA-Z ]/g, "") + m.id
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
                                return null;
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
                                return null;
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
