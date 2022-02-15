import { useEffect } from "react";
import { HeadingOne } from "../../components/headings";
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import { menuSelected as menuSelectedAtom } from "../../states/atoms";
import { BtnOne, BtnTwo } from "../../components/buttons";
import { ModalOne } from "../../components/modal";

/**
 * ReviewApplicationLayout component renders
 * review contents based on the selected applications for
 * the regulator
 */

interface ReviewApplicationLayoutProps {
  data?: any;
}

export const ReviewApplicationLayout = ({
  data,
}: ReviewApplicationLayoutProps) => {
  const [selectedMenu, setSelectedMenu] = useRecoilState(menuSelectedAtom);

  const updateMenuSelection = (e: any, value: string) => {
    e.preventDefault();

    setSelectedMenu(value);
  };

  useEffect(() => {
    if (data.fields && data.fields[0]) {
      setSelectedMenu(data.fields[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fields]);

  return (
    <div className="">
      {data && (
        <>
          <div className="row pt-3">
            <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7">
              <div className="float-start">
                <HeadingOne heading={data.title} />
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
              <div className="d-flex flex-row float-end mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0">
                 <div className="me-4">
                     <BtnOne label="View status log" btnType="button" isLink={false} link="" isModal={true} floatBottom={false} modalId="staticBackdrop" />
                 </div>
                 <div className="">
                     <BtnTwo label="Change status" btnType="button" isLink={false} link="" isModal={false} floatBottom={false} />
                 </div>
                 {/* <ModalOne id="staticBackdrop" ariaLabel="staticBackdropLabel" heading="Status log" list={modalList}/> */}
             </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="row">
              {/* Side navigation */}
              <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 pt-4">
                {data.fields &&
                  data.fields.map((i: any, j: number) => {
                    return (
                      <SideNavigation
                        text={i.name}
                        key={j}
                        isSelected={
                          selectedMenu && selectedMenu === i.name ? true : false
                        }
                        clickHandler={(e) => {
                          updateMenuSelection(e, i.name);
                        }}
                      />
                    );
                  })}
              </div>
              <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mt-2"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
