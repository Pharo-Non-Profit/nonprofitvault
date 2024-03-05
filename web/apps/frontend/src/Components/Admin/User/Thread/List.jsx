import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faArrowRight, faTable, faCodeBranch, faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getUserDetailAPI } from "../../../../API/User";
import { getAssistantThreadListAPI } from "../../../../API/AssistantThread";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../../Reusable/DataDisplayRowText";
import DataDisplayRowSelect from "../../../Reusable/DataDisplayRowSelect";
import AlertBanner from "../../../Reusable/EveryPage/AlertBanner";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../../Constants/App";
import { addUserState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../../AppState";
import { USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, USER_TYPE_OF_FILTER_OPTIONS, USER_ORGANIZATION_TYPE_OPTIONS } from "../../../../Constants/FieldOptions";
import AdminUserThreadListDesktop from "./ListDesktop";
import AdminUserThreadListMobile from "./ListMobile";


function AdminUserDetailThreadList() {
    ////
    //// URL Parameters.
    ////

    const { cid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [user, setUser] = useState({});
    const [tabIndex, setTabIndex] = useState(1);
    const [orderList, setThreadList] = useState([]);

    const [pageSize, setPageSize] = useState(10);                                      // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);                        // Pagination
    const [nextCursor, setNextCursor] = useState("");                                  // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                            // Pagination
    const [showFilter, setShowFilter] = useState(false);                               // Filtering + Searching
    const [sortByValue, setSortByValue] = useState("assignment_date,DESC");            // Sorting
    const [status, setStatus] = useState(0);                                           // Filtering
    const [createdAtGTE, setCreatedAtGTE] = useState(null);                            // Filtering

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, so, s, j, custid) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "last_name") // Sorting

        if (cur !== "") { // Pagination
            params.set("cursor", cur);
        }

        // DEVELOPERS NOTE: Our `sortByValue` is string with the sort field
        // and sort order combined with a comma seperation. Therefore we
        // need to split as follows.
        const sortArray = so.split(",");
        params.set("sort_field", sortArray[0]);
        params.set("sort_order", sortArray[1]);

        // Filtering
        if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
            params.set("search", keywords);
        }
        if (s !== undefined && s !== null && s !== "") {
            params.set("status", s);
        }
        if (j !== undefined && j !== null && j !== "") {
            const jStr = j.getTime();
            params.set("created_at_gte", jStr);
        }

        // User id.
        params.set("user_id", custid);

        getAssistantThreadListAPI(
            params,
            onThreadListSuccess,
            onThreadListError,
            onThreadListDone,
            onUnauthorized
        );
    }

    const onNextClicked = (e) => {
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    ////
    //// API.
    ////

    // --- User Detail --- //

    function onUserSuccess(response){
        console.log("onUserSuccess: Starting...");
    }

    function onUserError(apiErr) {
        console.log("onUserError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserDone() {
        console.log("onUserDone: Starting...");
        setFetching(false);
    }

    // --- Thread List --- //

    function onThreadListSuccess(response){
        console.log("onThreadListSuccess: Starting...");
        console.log("onThreadListSuccess: response:", response);
        setThreadList(response);
    }

    function onThreadListError(apiErr) {
        console.log("onThreadListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onThreadListDone() {
        console.log("onThreadListDone: Starting...");
        setFetching(false);
    }

    const onUnauthorized = () => {
        setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            setFetching(true);
            getUserDetailAPI(
                cid,
                onUserSuccess,
                onUserError,
                onUserDone,
                onUnauthorized
            );

            fetchList(
                currentCursor,
                pageSize,
                "",
                sortByValue,
                status,
                createdAtGTE,
                cid
            );
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize, sortByValue, status, createdAtGTE, cid]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div className="container">
                <section className="section">
                    {/* Desktop Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Users</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Threads)</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link></li>
                        </ul>
                    </nav>

                    {/* Page banner */}
                    {user && user.status === 2 && <AlertBanner message="Archived" status="info" />}

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">

                        {/* Title + Options */}
                        {user && <div className="columns">
                            <div className="column">
                                <p className="title is-4"><FontAwesomeIcon className="fas" icon={faCodeBranch} />&nbsp;Threads</p>
                            </div>
                            <div className="column has-text-right">
                                {/*
                                <Link to={`/admin/orders/add/step-2-from-launchpad?id=${user && cid}&fn=${user && user.firstName}&ln=${user && user.lastName}`} className="button is-small is-success is-fullwidth-mobile" type="button" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowUpRightFromSquare} />
                                </Link>
                                */}
                            </div>
                        </div>}

                        {/* <p className="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />

                                {user && <div className="container">

                                    {/* Tab Navigation */}
                                    <div className= "tabs is-medium is-size-7-mobile">
                                        <ul>
                                            <li>
                                                <Link to={`/admin/user/${cid}`}>Summary</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${cid}/detail`}>Detail</Link>
                                            </li>
                                            <li className="is-active">
                                                <Link><strong>Threads</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${cid}/comments`}>Comments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${cid}/attachments`}>ObjectFiles</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${cid}/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {orderList && orderList.results && (orderList.results.length > 0 || previousCursors.length > 0)
                                        ?
                                        <div className="container">
                                            {/*
                                                ##################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                                ##################################################################
                                            */}
                                            <div className="is-hidden-touch" >
                                                <AdminUserThreadListDesktop
                                                    listData={orderList}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
                                                    onPreviousClicked={onPreviousClicked}
                                                    onNextClicked={onNextClicked}
                                                    sortByValue={sortByValue}
                                                    cid={cid}
                                                />
                                            </div>

                                            {/*
                                                ###########################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
                                                ###########################################################################
                                            */}
                                            <div className="is-fullwidth is-hidden-desktop">
                                                <AdminUserThreadListMobile
                                                    listData={orderList}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
                                                    onPreviousClicked={onPreviousClicked}
                                                    onNextClicked={onNextClicked}
                                                    cid={cid}
                                                />
                                            </div>
                                        </div>
                                        :
                                        <section className="hero is-medium has-background-white-ter">
                                            <div className="hero-body">
                                                <p className="title">
                                                    <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Threads
                                                </p>
                                                <p className="subtitle">
                                                    No threads found for this user.
                                                </p>
                                            </div>
                                        </section>
                                    }

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-fullwidth-mobile" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            {/*
                                            <Link className="button is-success is-fullwidth-mobile" to={`/admin/orders/add/step-2-from-launchpad?id=${user && cid}&fn=${user && user.firstName}&ln=${user && user.lastName}`} target="_blank" rel="noreferrer"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowUpRightFromSquare} /></Link>
                                            */}
                                        </div>
                                    </div>

                                </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminUserDetailThreadList;
