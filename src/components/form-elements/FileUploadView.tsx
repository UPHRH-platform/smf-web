import styles from "./FileUploadView.module.css";
import { HeadingFour } from "../headings";

/**
 * FileUploadView component renders
 * files uploaded view type questions
 */

interface FileUploadViewProps {
  label?: string;
  value?: any;
  clickHandler?: (event: any) => void;
  isReadOnly?: boolean;
  showLabel?: boolean;
  defaultValues?: any;
}

export const FileUploadView = ({
  label,
  clickHandler,
  isReadOnly,
  showLabel,
  value,
  defaultValues,
}: FileUploadViewProps) => {
  return (
    <div className="">
      {showLabel && (
        <>
          <HeadingFour heading={label} />
          <br />
        </>
      )}
      <div className={`${styles.file_uploaded_view}`}>
        {value &&
          value.map((i: any, j: number) => {
            return (
              <div className="col-12 p-0 m-0" key={j}>
                {i && (
                  <div
                    className={`${styles.file_upload_list} row p-0 m-0 p-1 m-2`}
                  >
                    <div className="col-6">
                      <p className="float-start p-0 m-0">{i.split("/")[5]}</p>
                    </div>
                    <div className="col-6">
                      <a className="float-end p-0 m-0" target="_blank" href={i} rel="noreferrer">
                        Preview on new tab
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
