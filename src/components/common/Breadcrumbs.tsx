import { Fragment } from "react";
import { Link } from "react-router-dom";

export interface ITitle {
  title: string;
  url: string;
  icon?: string;
}

interface BreadcrumbsProps {
  data: ITitle[];
  historyData: any;
}

export const Breadcrumbs = ({ data, historyData }: BreadcrumbsProps) => {
  return (
    <Fragment>
      <div className="d-flex align-items-center h100">
        {data &&
          data.length &&
          data.map((title, index) => {
            return (
              <div className="d-flex custom breadcrumb" key={index}>
                {index !== 0 && <i className="fa fa-chevron-right arrow"></i>}
                {title.title && (!title.url || title.url === "none") && (
                  <span className="d-flex ml-2 m-auto">
                    {/* <i className="fa fa-chevron-right arrow"></i> */}
                    <span className="title">{title.title}</span>
                  </span>
                )}
                {
                  title.url && title.url !== "none" && (
                    <Link to={title.url} className="title active">
                      {/* <i className="fa fa-chevron-right arrow"></i> */}
                      {title.title}
                    </Link>
                  )
                  // <Link to={title.url} className={`${historyData.location.pathname.match(title.url)
                  //     ? "title active"
                  //     : "title"
                  //     }`}>{title.title}</Link>
                }
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};
