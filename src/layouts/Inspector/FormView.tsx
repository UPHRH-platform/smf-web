import { useEffect, useState } from "react";
import { CardThree } from "../../components/cards";
import { Radio, SelectField, TextAreaField, TextField } from "../../components/form-elements";
import { HeadingFour } from "../../components/headings";
import { StatusBarLarge } from "../../components/status-bar";

/**
 * FormView component renders
 * form page layout and its UI components inside
 * view application page
 */

const selectOptions = [{
    id: 0,
    value: "option_a",
    label: "Option A"
},
{
    id: 1,
    value: "option_b",
    label: "Option B"
},
{
    id: 2,
    value: "option_c",
    label: "Option C"
}
]

interface FormViewProps {
    data?: any;
}

export const FormView = ({ data }: FormViewProps) => {
    const [radioData, setRadioData] = useState<any>();

    useEffect(() => {
        let questions = [
            {
                id: 0,
                question: "Radio",
                options: [
                    {
                        id: 0,
                        label: "Yes",
                        isSelected: true,
                    },
                    {
                        id: 1,
                        label: "No",
                        isSelected: false,
                    },
                ],
            },
        ]


        setRadioData(questions);
    }, []);

    const updateRadioSelection = (e: any, id: number, itemId: any) => {
        e.preventDefault();

        let tempArray = [...radioData];

        tempArray.map((k: any, l: any) => {
            if (k.id === id) {
                k.options.map((h: any, f: any) => {
                    if (h.isSelected === true) {
                        h.isSelected = false;
                    } else {
                        if (h.id === itemId) {
                            h.isSelected = true;
                        } else {
                            h.isSelected = false;
                        }
                    }
                    return null;
                })
            }
            return null;
        });

        setRadioData(tempArray);
    };

    return (
        <div className="">
            {/* Section one */}
            <div className="">
                <StatusBarLarge label="New" status="green" />
            </div>

            {/* Section two */}
            <div className="mt-3">
                {radioData &&
                    radioData.map((i: any, j: any) => {
                        return (
                            <div className="mb-3" key={i.id}>
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
                                            <div className="mt-3">
                                                <TextField label="Text field" placeholder="Type here" showLabel={true} type="text" enableCheck={true} checkBoxLabel="This is my official email" checkBoxValue="This is my official email" checkboxId="emailCheckBox" />
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
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
