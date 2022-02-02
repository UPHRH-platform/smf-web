/**
 * FormView component renders
 * form page layout and its UI components inside
 * view application page
 */

import { StatusBarLarge } from "../../components/status-bar";

interface FormViewProps {
    data?: any
}

export const FormView = ({ data }: FormViewProps) => {
    return (
       <div className="">
           {/* Section one */}
            <div className="">
                <StatusBarLarge label="New" status="green"/>
            </div>
       </div>
    );
}