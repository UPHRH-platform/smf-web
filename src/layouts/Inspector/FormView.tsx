/**
 * FormView component renders
 * form page layout and its UI components inside
 * view application page
 */

import { Radio } from "../../components/form-elements";
import { StatusBarLarge } from "../../components/status-bar";

interface FormViewProps {
    data?: any
}

export const FormView = ({ data }: FormViewProps) => {
    return (
        <div className="">
            {/* Section one */}
            <div className="">
                <StatusBarLarge label="New" status="green" />
            </div>

            {/* Section two */}
            <div className="mt-3">
                <Radio />
            </div>
        </div>
    );
}