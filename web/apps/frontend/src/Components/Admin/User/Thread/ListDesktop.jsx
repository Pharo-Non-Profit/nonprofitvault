import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faExternalLinkAlt, faBuilding, faHome, faQuestion, faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS, USER_ROLES } from "../../../../Constants/FieldOptions";
// import UserTypeOfIconFormatter from "../../../Reusable/SpecificPage/User/TypeOfIconFormatter";
// import UserThreadStatusFormatter from "../../../Reusable/SpecificPage/User/ThreadStatusFormatter";
import DateTextFormatter from "../../../Reusable/EveryPage/DateTextFormatter";


function AdminUserThreadListDesktop(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectUserForDeletion, sortByValue, cid } = props;
    return (
        <div className="b-table">
            <div className="table-wrapper has-mobile-cards">
                <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Assistant</th>
                            <th>Created At</th>
                            <th>Modified At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {listData && listData.results && listData.results.map(function(datum, i){
                            return <tr>
                                <td data-label="Assistant">
                                    {datum.assistantName}
                                </td>
                                <td data-label="Created At">
                                    <DateTextFormatter value={datum.createdAt} />
                                </td>
                                <td data-label="Modified At">
                                    <DateTextFormatter value={datum.modifiedAt} />
                                </td>
                                <td className="is-actions-cell">
                                    <div className="buttons is-right">
                                        <Link to={`/admin/user/${cid}/thread/${datum.id}`} className="is-small">
                                            View&nbsp;<FontAwesomeIcon className="mdi" icon={faChevronRight} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>

                <div className="columns">
                    <div className="column is-half">
                        <span className="select">
                            <select className={`input has-text-grey-light`}
                                     name="pageSize"
                                 onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                                {PAGE_SIZE_OPTIONS.map(function(option, i){
                                    return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                                })}
                            </select>
                        </span>

                    </div>
                    <div className="column is-half has-text-right">
                        {previousCursors.length > 0 &&
                            <button className="button" onClick={onPreviousClicked}>Previous</button>
                        }
                        {listData.hasNextPage && <>
                            <button className="button" onClick={onNextClicked}>Next</button>
                        </>}
                    </div>
                </div>

            </div>
        </div>
    );
}



export default AdminUserThreadListDesktop;
