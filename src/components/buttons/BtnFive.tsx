import { Link } from "react-router-dom";
import styles from "./BtnFive.module.css";
import stylesOne from "./BtnOne.module.css";
import "../../styles/global.css";


/**
 * BtnFive component renders
 * second transparent variant of left navigation button
 */

interface BtnFiveProps {
  label: string;
  btnType: string;
  clickHandler?: (event: any) => void;
  isLink: boolean;
  link: string;
  isModal?: boolean;
  floatBottom?: boolean;
  modalId?: string;
  showIcon?: boolean;
  iconValue?: string;
}

export const BtnFive = ({
  label,
  btnType,
  clickHandler,
  isLink,
  link,
  isModal,
  floatBottom,
  modalId,
  showIcon,
  iconValue,
}: BtnFiveProps) => {
  if (btnType === "button") {
    return (
      <>
        {isLink ? (
          <Link to={link}>
            <button
              type="button"
              onClick={clickHandler}
              className={`${styles.btn_five} ${
                floatBottom ? stylesOne.btn_float_bottom : ""
              } mb-4`}
              data-toggle="modal"
              data-target={`#${modalId}`}
            >
              <span
                className={`${
                  showIcon ? "material-icons vertical_align_bottom ps-2" : ""
                }`}
              >
                {iconValue}
              </span>
              {label}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={clickHandler}
            className={`${styles.btn_five} ${
              floatBottom ? stylesOne.btn_float_bottom : ""
            } mb-4`}
            data-toggle="modal"
            data-target={`#${modalId}`}
          >
            <span
              className={`${
                showIcon ? "material-icons vertical_align_bottom ps-2" : ""
              }`}
            >
              {iconValue}
            </span>
            {label}
          </button>
        )}
      </>
    );
  } else {
    return (
      <>
        {isLink ? (
          <Link to={link}>
            <button
              type="submit"
              onClick={clickHandler}
              className={`${styles.btn_five} ${
                floatBottom ? stylesOne.btn_float_bottom : ""
              } mb-4`}
              data-toggle="modal"
              data-target={`#${modalId}`}
            >
              <span className={`${showIcon} ? 'materical-icons: ''`}>
                {iconValue}
              </span>
              {label}
            </button>
          </Link>
        ) : (
          <button
            type="submit"
            onClick={clickHandler}
            className={`${styles.btn_five} ${
              floatBottom ? stylesOne.btn_float_bottom : ""
            } mb-4`}
            data-toggle="modal"
            data-target={`#${modalId}`}
          >
            <span className={`${showIcon} ? 'materical-icons: ''`}>
              {iconValue}
            </span>
            {label}
          </button>
        )}
      </>
    );
  }
};
