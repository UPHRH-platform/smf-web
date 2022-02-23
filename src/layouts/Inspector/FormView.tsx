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
import { CheckBoxField } from "../../components/form-elements";
import { BooleanField } from "../../components/form-elements";
import { FileUploadView } from "../../components/form-elements";
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import {
  sideMenuLabel as sideMenuLabelAtom,
  modalTwoTextArea as modalTwoTextAreaAtom,
} from "../../states/atoms";
import { useHistory } from "react-router-dom";
import { kill } from "process";

/**
 * FormView component renders
 * form page layout and its UI components inside
 * view application page
 */

// const selectOptions = [{
//     id: 0,
//     value: "option_a",
//     label: "Option A"
// },
// {
//     id: 1,
//     value: "option_b",
//     label: "Option B"
// },
// {
//     id: 2,
//     value: "option_c",
//     label: "Option C"
// }
// ]

interface FormViewProps {
  applicationData?: any;
  formData?: any;
}

export const FormView = ({ applicationData, formData }: FormViewProps) => {
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
                  return tempFormArray.push({
                    id: b,
                    parent: n,
                    label: h,
                    value: Object.values(q)[b],
                    defaultValues: k.values,
                    fieldType: k.fieldType,
                    isCorrect: "",
                    inspectionvValue: "",
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
    status: string,
    comments?: any
  ) => {
    e.preventDefault();

    // console.log(menuLabel, field, status);

    let textAreaElement = document.getElementById(field);

    if (status === "correct") {
      comments = "";
    } else {
      comments = textAreaElement?.querySelector("textarea")?.value;
    }

    let tempArray = [...processedData];

    tempArray.map((i, j) => {
      if (i.sideMenu === menuLabel) {
        i.fields.map((m: any, n: number) => {
          if (m.label === field) {
            if (status === "correct") {
              m.isCorrect = true;
              m.comments = comments;
            } else {
              m.isCorrect = false;
              m.comments = comments;
            }
          }
        });
      }
    });

    // console.log(tempArray);

    setProcessedData(tempArray);
  };

  // const [radioData, setRadioData] = useState<any>();

  // const selectedSideMenuData = useRecoilValue(selectedSideMenuDataAtom);
  // const [currentFields, setCurrentFields] = useState([]);

  // useEffect(() => {
  //   let fieldsElement: any = selectedSideMenuData;
  //   if (fieldsElement && fieldsElement.fields) {
  //     setCurrentFields(fieldsElement.fields);
  //   }
  // }, [selectedSideMenuData]);

  // useEffect(() => {
  //   console.log(formData);
  //   console.log(applicationData);
  // }, [formData, applicationData]);

  useEffect(() => {
    // let questions = [
    //     {
    //         id: 0,
    //         question: "Radio",
    //         options: [
    //             {
    //                 id: 0,
    //                 label: "Yes",
    //                 isSelected: true,
    //             },
    //             {
    //                 id: 1,
    //                 label: "No",
    //                 isSelected: false,
    //             },
    //         ],
    //     },
    // ]
    // setRadioData(questions);
  }, []);

  // const updateRadioSelection = (e: any, id: number, itemId: any) => {
  //     e.preventDefault();

  //     let tempArray = [...radioData];

  //     tempArray.map((k: any, l: any) => {
  //         if (k.id === id) {
  //             k.options.map((h: any, f: any) => {
  //                 if (h.isSelected === true) {
  //                     h.isSelected = false;
  //                 } else {
  //                     if (h.id === itemId) {
  //                         h.isSelected = true;
  //                     } else {
  //                         h.isSelected = false;
  //                     }
  //                 }
  //                 return null;
  //             })
  //         }
  //         return null;
  //     });

  //     setRadioData(tempArray);
  // };

  return (
    <div className="">
      {/* Section one */}
      {/* <div className="">
                <StatusBarLarge label="New" status="green" />
            </div> */}

      {/* Section two */}
      {/* <div className="mt-3">
                 {radioData &&
                    radioData.map((i: any, j: any) => {
                        return ( 
                <div className="mb-3">
                    <CardThree
                        children={
                            <div className="p-4">
                                <div className="pb-2">
                                                <HeadingFour heading={i.question} />
                                            </div>
                                <div className="d-flex flex-row">
                                                {i.options.map((m: any, n: any) => {
                                                    return (
                                                        <div className="me-3" key={m.id}>
                                                            <Radio
                                                                isSelected={m.isSelected}
                                                                label={m.label}
                                                                clickHandler={(e) =>
                                                                    updateRadioSelection(e, i.id, m.id)
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                <div className="mt-1">
                                    <TextField label="Registration code" placeholder="Type here" showLabel={true} type="text" enableCheck={false} checkBoxLabel="This is my official email" checkBoxValue="This is my official email" checkboxId="emailCheckBox" />
                                </div>
                                <div className="mt-3">
                                                <SelectField showLabel={true} label="Select" option={selectOptions} selectId="optionSelect" selectName="optionSelect" placeholder="Select from the list" />
                                            </div>
                                            <div className="mt-3">
                                                <TextAreaField showLabel={true} label="Textarea" placeholder="Type here" showStatus={true}/>
                                            </div>
                            </div>
                        }
                    /> 
                </div>*/}
      {/* 
      {currentFields &&
        currentFields.map((i: any, j: any) => {
          return (
            <div className="mt-3" key={i.id}>
              <div className="mb-3">
                <CardThree
                  children={
                    <>
                      <div className="p-4">
                        <div className="mt-1 col-4 p-0 m-0">
                          <TextField
                            label={i.label}
                            placeholder="Type here"
                            showLabel={true}
                            type="text"
                            enableCheck={false}
                            isReadOnly={true}
                            defaultValue={i.value || ""}
                          />
                        </div>
                      </div>
                      <div className="">
                        <InspectCheckOne
                          label="Is the given information found correct?"
                          children={
                            <div className="d-flex flex-row">
                              <div className="me-3">
                                <Radio isSelected={true} label="Correct" />
                              </div>
                              <div className="me-3">
                                <Radio
                                  isSelected={false}
                                  label="Incorrect"
                                  isModal={true}
                                  modalId="reasonModal"
                                />
                              </div>
                            </div>
                          }
                          showComments={i.showComments}
                          modalId="reasonModal"
                        />
                      </div>
                    </>
                  }
                />
              </div>
            </div>
          );
        })} */}

      {/* <div className="mt-3"> */}
      {/* <ModalTwo
                    id="reasonModal"
                    ariaLabel="reasonModalLabel"
                    heading="Enter the reason for the incorrect selection"
                /> */}

      {/* );
                    })} */}
      {/* </div> */}
      {/* <div className="row">
        <div className="col-12 mt-3">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-0 p-0 float-left">
            <BtnThree
              label="Cancel"
              btnType="button"
              isLink={true}
              link=""
              isModal={false}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-0 p-0 float-right">
            <div className="float-right">
              <BtnTwo
                label="Next"
                btnType="button"
                isLink={true}
                link="/inspection-summary"
                isModal={false}
                showIcon={true}
                iconValue={`arrow_forward`}
              />
            </div>
          </div>
        </div>
      </div> */}

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
                                  <div className="mt-3">
                                    <InspectCheckOne
                                      label="Is the given information found correct?"
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
                                  <ModalTwo
                                    id={k.label}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label.replace(/\s/g, "")}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label.replace(/\s/g, "")}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label.replace(/\s/g, "")}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label.replace(/\s/g, "")}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label.replace(/\s/g, "")}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
                                  <ModalTwo
                                    id={k.label.replace(/\s/g, "")}
                                    enableHandler={true}
                                    ariaLabel={`${k.label}Label`}
                                    heading="Enter the reason for the incorrect selection"
                                    showTextAreaLabel={false}
                                    submitHandler={(e) =>
                                      onCheckCorrectness(
                                        e,
                                        selectedMenuLabel,
                                        k.label,
                                        "incorrect"
                                      )
                                    }
                                  />
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
