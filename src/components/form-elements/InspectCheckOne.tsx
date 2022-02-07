import styles from "./InspectCheckOne.module.css";

/**
 * InspectCheckOne component renders
 * inspector input area
 */

interface InspectCheckOneProps {
    label?: string
    children?: any
    showComments?: boolean
}

export const InspectCheckOne = ({ label, children, showComments }: InspectCheckOneProps) => {
    return (
        <div className={`${styles.inspect_check_one} p-4`}>
            <label>{label}</label>
            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                    <div className="mt-2 float-start">
                        {children}
                    </div>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    {showComments ? (
                        <div className="float-end pt-4">
                            <label className={`${styles.inspect_check_one_custom_label_one}`}><span className={`${styles.custom_material_icons} material-icons pe-2`}>create</span>Edit reason</label>
                        </div>
                    ) : (
                        <div className="float-end pt-4">
                            <label className={`${styles.inspect_check_one_custom_label_one}`}>Add note<span className={`${styles.custom_material_icons} material-icons ps-2`}>speaker_notes</span></label>
                        </div>
                    )}

                </div>
            </div>

            {showComments &&
                <div className={`${styles.inspect_check_one_comments} mt-3`}>
                    <p className="p-0">Filium morte multavit si sine dubio praeclara sunt, explicabo nemo enim maxime consuevit iactare vestra se esse admonere interesse enim ipsam voluptatem, quia voluptas nulla pariatur.</p>
                </div>
            }
        </div>
    )
}