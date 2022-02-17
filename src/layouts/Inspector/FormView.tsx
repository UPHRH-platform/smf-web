import { useEffect, useState } from "react";
import { CardThree } from "../../components/cards";
import {
  InspectCheckOne,
  Radio,
  SelectField,
  TextAreaField,
  TextField,
} from "../../components/form-elements";
import { HeadingFour } from "../../components/headings";
import { ModalTwo } from "../../components/modal";
import { StatusBarLarge } from "../../components/status-bar";
import { useRecoilValue } from "recoil";
import { sideMenuData as selectedSideMenuDataAtom } from "../../states/atoms";
import { BtnOne, BtnTwo, BtnThree } from "../../components/buttons";

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
  data?: any;
}

export const FormView = ({ data }: FormViewProps) => {
  // const [radioData, setRadioData] = useState<any>();

  const selectedSideMenuData = useRecoilValue(selectedSideMenuDataAtom);
  const [currentFields, setCurrentFields] = useState([]);

  useEffect(() => {
    let fieldsElement: any = selectedSideMenuData;
    if (fieldsElement && fieldsElement.fields) {
      setCurrentFields(fieldsElement.fields);
    }
  }, [selectedSideMenuData]);

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
        })}

      <div className="mt-3">
        {/* <ModalTwo
                    id="reasonModal"
                    ariaLabel="reasonModalLabel"
                    heading="Enter the reason for the incorrect selection"
                /> */}

        {/* );
                    })} */}
      </div>
      <div className="row">
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
      </div>
    </div>
  );
};
