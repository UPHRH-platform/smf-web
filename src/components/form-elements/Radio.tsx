import styles from "./Radio.module.css";
// import styleOne from "./TextField.module.css";

/**
 * Radio component renders
 * radio type questions
 */

interface RadioProps {
  label: string;
  clickHandler?: (event: any) => void;
  isSelected: boolean;
  isModal?: boolean;
  modalId?: string;
  isReadOnly?: boolean;
}

export const Radio = ({
  label,
  clickHandler,
  isSelected,
  isModal,
  modalId,
  isReadOnly,
}: RadioProps) => {
  if (isSelected) {
    if (!isModal) {
      return (
        <button
          className={`${styles.custom_radio_btn_selected} p-2 px-3`}
          onClick={clickHandler}
          disabled={isReadOnly ? true : false}
        >
          <span
            className={`${styles.custom_radio_icon_selected} material-icons pe-2`}
          >
            radio_button_checked
          </span>
          {label}
        </button>
      );
    } else {
      return (
        <button
          className={`${styles.custom_radio_btn_selected} p-2 px-3`}
          data-toggle="modal"
          data-target={`#${modalId}`}
          onClick={clickHandler}
          disabled={isReadOnly ? true : false}
        >
          <span
            className={`${styles.custom_radio_icon_selected} material-icons pe-2`}
          >
            radio_button_checked
          </span>
          {label}
        </button>
      );
    }
  } else {
    if (!isModal) {
      return (
        <button
          className={`${styles.custom_radio_btn_unselected} p-2 px-3`}
          onClick={clickHandler}
          disabled={isReadOnly ? true : false}
        >
          <span
            className={`${styles.custom_radio_icon_unselected} material-icons pe-2`}
          >
            radio_button_unchecked
          </span>
          {label}
        </button>
      );
    } else {
      return (
        <button
          className={`${styles.custom_radio_btn_unselected} p-2 px-3`}
          data-toggle="modal"
          data-target={`#${modalId}`}
          onClick={clickHandler}
          disabled={isReadOnly ? true : false}
        >
          <span
            className={`${styles.custom_radio_icon_unselected} material-icons pe-2`}
          >
            radio_button_unchecked
          </span>
          {label}
        </button>
      );
    }
  }
};
