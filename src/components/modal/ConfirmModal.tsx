

interface ConfirmModalProps {
    title: string;
    children: any;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({title, children, onConfirm, onCancel}: ConfirmModalProps) => {
    return (
        <>
        <div className="modal fade show" id="staticBackdrop" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>No</button>
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>Yes</button>
                </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
        </>
    )
    
}

