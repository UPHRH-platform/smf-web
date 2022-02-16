import { useEffect, useState } from "react";
import { HeadingOne } from "../../components/headings";
import { SideNavigation } from "../../components/navigation";
import { useRecoilState } from "recoil";
import { sideMenuLabel as sideMenuLabelAtom } from "../../states/atoms";
import { BtnThree, BtnTwo, BtnFour } from "../../components/buttons";
import { ModalOne } from "../../components/modal";
import { StatusBarLarge } from "../../components/status-bar";
import { CardThree } from "../../components/cards";
import { TextField } from "../../components/form-elements";

/**
 * ReviewApplicationLayout component renders
 * review contents based on the selected applications for
 * the regulator
 */

interface ReviewApplicationLayoutProps {
  formData?: any;
  applicationData?: any;
}

export const ReviewApplicationLayout = ({
  formData,
  applicationData,
}: ReviewApplicationLayoutProps) => {
  const [selectedMenuData, setSelectedDataMenu] = useState<any[]>([]);
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useRecoilState(sideMenuLabelAtom);

  const [processedData, setProcessedData] = useState<any[]>([]);

  const updateMenuSelection = (e: any, value: string) => {
    e.preventDefault();

    setSelectedMenuLabel(value);
  };

  useEffect(() => {
    if (applicationData.dataObject) {
      let objectKeys = Object.keys(applicationData.dataObject);
      let objectValues = Object.values(applicationData.dataObject);

      setSelectedMenuLabel(objectKeys[0]);

      let tempArray: any = [];
      let tempFormArray: any = [];

      objectKeys.map((i, j) => {
        tempArray.push({
          sideMenu: i,
          fields: [Object.values(objectValues)[j]],
        });
      });

      tempArray.map((m: any, n: number) => {
        formData &&
          formData.fields.map((k: any, l: number) => {
            Object.values(m.fields).map((q: any, w: number) => {
              Object.keys(q).map((h: any, b: number) => {
                if (h === k.name) {
                  tempFormArray.push({
                    id: b,
                    parent: n,
                    label: h,
                    value: Object.values(q)[b],
                    fieldType: k.fieldType,
                  });
                }
              });
            });
          });
      });

      tempArray.map((y: any, f: number) => {
        y.fields = [];
        tempFormArray.map((g: any, d: number) => {
          if (g.parent === f) {
            y.fields.push(g);
          }
        });
      });

      setProcessedData(tempArray);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationData]);

  useEffect(() => {
    if (selectedMenuLabel && selectedMenuLabel.length !== 0) {
      setSelectedDataMenu([]);
      processedData.map((i, j) => {
        if (i.sideMenu === selectedMenuLabel) {
          setSelectedDataMenu(i.fields);
        }
      });
    }
  }, [selectedMenuLabel]);

  return (
    <div className="">
      {applicationData && (
        <>
          <div className="row pt-3">
            <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7">
              <div className="float-start">
                <HeadingOne heading={applicationData.title} />
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
              <div className="d-flex flex-row float-end mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0">
                {/* <div className="me-4">
                  <BtnThree
                    label="View status log"
                    btnType="button"
                    isLink={false}
                    link=""
                    isModal={true}
                    floatBottom={false}
                    modalId="staticBackdrop"
                  />
                </div> */}
                <div className="">
                  <BtnFour
                    label="View status log"
                    btnType="button"
                    isLink={false}
                    link=""
                    isModal={false}
                    floatBottom={false}
                  />
                </div>
                {/* <ModalOne id="staticBackdrop" ariaLabel="staticBackdropLabel" heading="Status log" list={modalList}/> */}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="row">
              {/* Side navigation */}
              <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 pt-4">
                {processedData &&
                  processedData.map((i: any, j: number) => {
                    return (
                      <SideNavigation
                        text={i.sideMenu}
                        key={j}
                        isSelected={
                          selectedMenuLabel && selectedMenuLabel === i.sideMenu
                            ? true
                            : false
                        }
                        clickHandler={(e) => {
                          updateMenuSelection(e, i.sideMenu);
                        }}
                      />
                    );
                  })}
              </div>

              {/* Form view */}
              <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 p-0 m-0 mt-4">
                {applicationData.status && (
                  <StatusBarLarge
                    status="green"
                    label={applicationData.status}
                  />
                )}

                {selectedMenuData &&
                  selectedMenuData.map((k: any, l: number) => {
                    switch (k.fieldType) {
                      case "text":
                        return (
                          <div className="mt-3" key={l}>
                            <CardThree
                              children={
                                <div className="ps-4 pe-4 pt-3">
                                  <TextField
                                    showLabel={k.label ? true : false}
                                    label={k.label || ""}
                                    type="text"
                                    isReadOnly={true}
                                    value={k.value || ""}
                                  />
                                </div>
                              }
                            />
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
