/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from "react";
import { HeadingOne } from "../../components/headings";
import Header from "../../components/common/Header";
import { useHistory } from "react-router-dom";

/**
 * Landing component renders
 * dashboard layout and its UI components
 */

interface LandingProps {
  data?: any;
}

export const Landing = ({ data }: LandingProps) => {
  let history = useHistory();

  return (
    <Fragment>
      <Header history={history} />
      <div className="container-fluid">
        <div className="container dashboard-inner-container mt-4">
          {/* Section one */}
          <section className="pt-3">
            <HeadingOne heading="Insights so far" />
          </section>
        </div>
      </div>
    </Fragment>
  );
};
