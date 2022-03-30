/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import styles from "./InspectCheckOne.module.css";
import { TextField } from "./TextField";
import { HeadingFour } from "../headings";
import { useRecoilState } from "recoil";
import { dataObjectFileUpload as dataObjectFileUploadAtom } from "../../states/atoms";
import { FormService } from "../../services";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";

/**
 * InspectCheckOne component renders
 * inspector input area
 */

interface InspectCheckOneProps {
  label?: string;
  children?: any;
  showComments?: boolean;
  comments?: any;
  modalId?: string;
  modalTriggerLabel?: string;
  clickHandler?: (event: any) => void;
  attachmentRemoveHandler?: (event: any) => void;
  inspectionValue?: any;
  disableEdit: boolean;
  showAttachment?: boolean;
  attachments?: any;
  id?: string;
  showAttachmentRemover?: boolean;
}

export const InspectCheckOne = ({
  label,
  children,
  showComments,
  comments,
  modalId,
  modalTriggerLabel,
  clickHandler,
  attachmentRemoveHandler,
  inspectionValue,
  disableEdit,
  showAttachment,
  attachments,
  id,
  showAttachmentRemover,
}: InspectCheckOneProps) => {
  const [insValue, setInsValue] = useState("");

  const [dataObjectFileUploadValue, setDataObjectFileUploadValue] =
    useRecoilState(dataObjectFileUploadAtom);

  useEffect(() => {
    if (inspectionValue !== "") {
      setInsValue(inspectionValue);
    }
  }, [inspectionValue]);

  useEffect(() => {
    document
      .getElementById(`${id}`)
      ?.addEventListener("change", (event: any) => {
        let label = event.target.id.split("attachment")[1];
        let file = event.target!.files[0];

        let data = new FormData();
        data.append("files", file);

        FormService.uploadfile(data).then(
          (response) => {
            if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
              let derviedObject = {
                field: label,
                value: response.responseData[0],
              };

              setDataObjectFileUploadValue(derviedObject);
            } else {
              Notify.error(response.statusInfo.errorMessage);
            }
          },
          (error) => {
            error.statusInfo
              ? Notify.error(error.statusInfo.errorMessage)
              : Notify.error(error.message);
          }
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.inspect_check_one} p-4`} onClick={clickHandler}>
      <label>{label}</label>
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
          <div className="mt-2 float-start">{children}</div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
          {showComments && !disableEdit ? (
            <div className="float-end pt-4">
              <label
                className={`${styles.inspect_check_one_custom_label_one}`}
                data-toggle="modal"
                data-target={`#${modalId}`}
              >
                <span
                  className={`${styles.custom_material_icons} material-icons pe-2`}
                >
                  create
                </span>
                {modalTriggerLabel ? modalTriggerLabel : "Edit reason"}
              </label>
            </div>
          ) : !disableEdit ? (
            <div className="float-end pt-4">
              <label
                className={`${styles.inspect_check_one_custom_label_one}`}
                data-toggle="modal"
                data-target={`#${modalId}`}
              >
                Add note
                <span
                  className={`${styles.custom_material_icons} material-icons ps-2`}
                >
                  speaker_notes
                </span>
              </label>
            </div>
          ) : (
            ""
          )}

          {showAttachment && (
            <>
              <div className="float-end pt-4">
                <input
                  type={"file"}
                  id={id}
                  style={{ display: "none" }}
                  accept="image/png, image/gif, image/jpeg"
                />
                <label
                  htmlFor={id}
                  className={`${styles.inspect_check_one_custom_label_one} me-4 me-sm-0 me-md-0 me-lg-4 me-xl-4`}
                >
                  {"Attach photo"}
                  <span
                    className={`${styles.custom_material_icons_two} material-icons ps-2`}
                  >
                    add_a_photo
                  </span>
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {showComments && comments && (
        <div className={`${styles.inspect_check_one_comments} mt-3`}>
          <p className="p-0">{comments}</p>
        </div>
      )}

      {inspectionValue && (
        <div className={`mt-3`}>
          <div className="mt-2 col-sm-12 col-md-3 col-lg-3 p-0 m-0">
            <TextField
              showLabel={true}
              label="Actual value"
              isReadOnly={true}
              type="text"
              value={insValue}
            />
          </div>
        </div>
      )}

      {attachments && attachments.length > 0 && (
        <div className="mt-4">
          <HeadingFour heading="Captured/Attached photos" />
          <div className="row">
            {attachments.map((i: any, j: number) => {
              return (
                <div
                  className={`${styles.preview_image} mt-3 col-sm-12 col-md-3 col-lg-3`}
                  key={j}
                >
                  <img
                    src={i}
                    alt={`Attachment ${j}`}
                    title={`Attachment ${j}`}
                    height="100"
                    width="177"
                  />
                  {showAttachmentRemover && (
                    <i
                      className={`${styles.custom_close_btn} material-icons `}
                      onClick={attachmentRemoveHandler}
                    >
                      close
                    </i>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
