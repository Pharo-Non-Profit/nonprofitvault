import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faQuestion, faHome, faBuilding, faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { DateTime } from "luxon";

import FormErrorBox from "../../../Reusable/FormErrorBox";
import { PAGE_SIZE_OPTIONS } from "../../../../Constants/FieldOptions";
// import UserTypeOfIconFormatter from "../../../Reusable/SpecificPage/User/TypeOfIconFormatter";
// import UserThreadStatusFormatter from "../../../Reusable/SpecificPage/User/ThreadStatusFormatter";
import DateTextFormatter from "../../../Reusable/EveryPage/DateTextFormatter";


/*
Display for both tablet and mobile.
*/
function AdminUserThreadListMobile(props) {
    const { listData, setPageSize, pageSize, previousCursors, onPreviousClicked, onNextClicked, onSelectUserForDeletion, cid } = props;
    // console.log("listData:", listData);
    return (
        <>
            {listData && listData.results && listData.results.map(function(datum, i){
                console.log("datum:", datum);
                return <div className="mb-5">
                    <hr />
                    <strong>Assistant:</strong>&nbsp;{datum.assistantName}
                    <br />
                    <br />
                    <strong>Created At:</strong>&nbsp;<DateTextFormatter value={datum.createdAt} />
                    <br />
                    <br />
                    <strong>Modified At:</strong>&nbsp;<DateTextFormatter value={datum.modifiedAt} />
                    <br />
                    <br />
                    <Link to={`/admin/user/${cid}/thread/${datum.id}`} className="button is-primary is-fullwidth-mobile" type="button">
                        View&nbsp;<FontAwesomeIcon className="mdi" icon={faChevronRight} />
                    </Link>

                </div>;
            })}

            <div className="columns pt-4">
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
        </>
    );
}

export default AdminUserThreadListMobile;
