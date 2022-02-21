import { useEffect } from "react"
import "./TabOne.css"

/**
 * TabOne component renders
 * tab view and its children
 */

interface TabOneProps {
    tabId: string
    tabContentId: string
    tabList: any
}

export const TabOne = ({ tabId, tabContentId, tabList }: TabOneProps) => {
    return (
        <div className="">
            <ul className="nav nav-tabs" id={tabId} role="tablist">
                {tabList && tabList.map((i: any, j: any) => {
                    return (
                        <li className="nav-item me-4" role="presentation" key={j}>
                            <button className={`${j === 0 ? `tab_one nav-link active` : `tab_one nav-link`}`} id={i.ariaLabelled} data-toggle="tab" data-target={`#${i.id}`} type="button" role="tab" aria-controls={i.id} aria-selected="true">{i.label}</button>
                        </li>
                    );
                })}
            </ul>
            <div className="tab-content mt-4" id={tabContentId}>
                {tabList && tabList.map((m: any, n: any) => {
                    return (
                        <div className={`${n === 0 ? "tab-pane fade show active" : "tab-pane fade"}`} id={m.id} key={m.id} role="tabpanel" aria-labelledby={m.ariaLabelled}>{m.children && <>{m.children}</>}</div>
                    );
                })}
            </div>
        </div>
    )
}