import { useEffect, useState } from "react";
import { CardThree } from "../../components/cards";
import { Radio } from "../../components/form-elements";
import { HeadingThree } from "../../components/headings/HeadingThree";
import { StatusBarLarge } from "../../components/status-bar";

/**
 * FormView component renders
 * form page layout and its UI components inside
 * view application page
 */

interface FormViewProps {
    data?: any;
}

export const FormView = ({ data }: FormViewProps) => {
    const [radioData, setRadioData] = useState<any>();

    useEffect(() => {
        let questions = [
            {
                id: 0,
                question: "Lorem ipsum doalr sit amet",
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
            {
                id: 1,
                question: "Lorem ipsum doalr sit amet",
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
            {
                id: 2,
                question: "Lorem ipsum doalr sit amet",
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
            {
                id: 3,
                question: "Lorem ipsum doalr sit amet",
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
            {
                id: 4,
                question: "Lorem ipsum doalr sit amet",
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
        ];

        setRadioData(questions);
    }, []);

    const updateRadioSelection = (e: any, id: number) => {
        e.preventDefault();

        let tempArray = [...radioData];

        tempArray.map((k: any, l: any) => {
            if (k.id === id) {
                k.options.map((h: any, f: any) => {
                    if (h.isSelected === true) {
                        h.isSelected = false;
                    } else {
                        h.isSelected = true;
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
                                                <HeadingThree title={i.question} />
                                            </div>
                                            <div className="d-flex flex-row">
                                                {i.options.map((m: any, n: any) => {
                                                    return (
                                                        <div className="me-3" key={m.id}>
                                                            <Radio
                                                                isSelected={m.isSelected}
                                                                label={m.label}
                                                                clickHandler={(e) =>
                                                                    updateRadioSelection(e, i.id)
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                })}
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
