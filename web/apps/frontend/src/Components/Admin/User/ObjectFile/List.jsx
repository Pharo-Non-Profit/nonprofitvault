import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faArrowRight, faTrashCan, faArrowUpRightFromSquare, faFile, faDownload, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { OBJECT_FILE_STATES, PAGE_SIZE_OPTIONS } from "../../../../Constants/FieldOptions";

import { getUserDetailAPI } from "../../../../API/User";
import { getObjectFileListAPI, deleteObjectFileAPI } from "../../../../API/ObjectFile";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import AlertBanner from "../../../Reusable/EveryPage/AlertBanner";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import AdminUserDetailObjectFileListDesktop from "./ListDektop";
import AdminUserDetailObjectFileListMobile from "./ListMobile";


function AdminUserDetailObjectFileList() {
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
    const [attachments, setObjectFiles] = useState("");
    const [selectedObjectFileForDeletion, setSelectedObjectFileForDeletion] = useState("");
    const [pageSize, setPageSize] = useState(10);               // Pagination
    const [previousCursors, setPreviousCursors] = useState([]); // Pagination
    const [nextCursor, setNextCursor] = useState("");           // Pagination
    const [currentCursor, setCurrentCursor] = useState("");     // Pagination

    ////
    //// Event handling.
    ////

    const fetchObjectFileList = (cur, userID, limit) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set('ownership_id', cid);
        params.set('ownership_role', 1); // 1=User or User.
        params.set("page_size", limit);
        if (cur !== "") {
            params.set("cursor", cur);
        }

        getObjectFileListAPI(
            params,
            onObjectFileListSuccess,
            onObjectFileListError,
            onObjectFileListDone,
            onUnauthorized
        );
    }

    const onNextClicked = (e) => {
        console.log("onNextClicked");
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        console.log("onPreviousClicked");
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    const onSelectObjectFileForDeletion = (e, attachment) => {
        console.log("onSelectObjectFileForDeletion", attachment);
        setSelectedObjectFileForDeletion(attachment);
    }

    const onDeselectObjectFileForDeletion = (e) => {
        console.log("onDeselectObjectFileForDeletion");
        setSelectedObjectFileForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteObjectFileAPI(
            selectedObjectFileForDeletion.id,
            onObjectFileDeleteSuccess,
            onObjectFileDeleteError,
            onObjectFileDeleteDone,
            onUnauthorized
        );
        setSelectedObjectFileForDeletion("");
    }

    ////
    //// API.
    ////

    // User details.

    // --- Detail --- //

    function onUserDetailSuccess(response){
        console.log("onUserDetailSuccess: Starting...");
        setUser(response);
    }

    function onUserDetailError(apiErr) {
        console.log("onUserDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUserDetailDone() {
        console.log("onUserDetailDone: Starting...");
        setFetching(false);
    }

    // --- ObjectFile list --- //

    function onObjectFileListSuccess(response){
        console.log("onObjectFileListSuccess: Starting...");
        if (response.results !== null) {
            setObjectFiles(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onObjectFileListError(apiErr) {
        console.log("onObjectFileListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onObjectFileListDone() {
        console.log("onObjectFileListDone: Starting...");
        setFetching(false);
    }

    // --- ObjectFile delete --- //

    function onObjectFileDeleteSuccess(response){
        console.log("onObjectFileDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("ObjectFile deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchObjectFileList(currentCursor, cid, pageSize);
    }

    function onObjectFileDeleteError(apiErr) {
        console.log("onObjectFileDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onObjectFileDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onObjectFileDeleteDone() {
        console.log("onObjectFileDeleteDone: Starting...");
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
                onUserDetailSuccess,
                onUserDetailError,
                onUserDetailDone,
                onUnauthorized
            );
            fetchObjectFileList(currentCursor, cid, pageSize);
        }

        return () => { mounted = false; }
    }, [currentCursor, cid, pageSize]);

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
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
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

                    {/* Modal */}
                    <div className={`modal ${selectedObjectFileForDeletion ? 'is-active' : ''}`}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Are you sure?</p>
                                <button className="delete" aria-label="close" onClick={onDeselectObjectFileForDeletion}></button>
                            </header>
                            <section className="modal-card-body">
                                You are about to <b>archive</b> this user; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                <button className="button" onClick={onDeselectObjectFileForDeletion}>Cancel</button>
                            </footer>
                        </div>
                    </div>

                    {/* Page */}
                    <nav className="box">

                        {/* Title + Options */}
                        <div className="columns">
                            <div className="column">
                                <p className="title is-4"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;ObjectFiles</p>
                            </div>
                            {user && <div className="column has-text-right">
                                <Link to={`/admin/user/${cid}/attachments/add`} className="button is-small is-success is-fullwidth-mobile" type="button" disabled={user.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New
                                </Link>
                            </div>}
                        </div>

                        <FormErrorBox errors={errors} />

                        {/* <p className="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
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
                                            <li>
                                                <Link to={`/admin/user/${cid}/threads`}>Threads</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${cid}/comments`}>Comments</Link>
                                            </li>
                                            <li className="is-active">
                                                <Link to={`/admin/user/${cid}/attachments`}><strong>ObjectFiles</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${user.id}/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {!isFetching && attachments && attachments.results && (attachments.results.length > 0 || previousCursors.length > 0)
                                        ?
                                        <div className="container">

                                            {/*
                                                ##################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                                ##################################################################
                                            */}
                                            <div className="is-hidden-touch" >
                                                <AdminUserDetailObjectFileListDesktop
                                                    userID={cid}
                                                    listData={attachments}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
                                                    onPreviousClicked={onPreviousClicked}
                                                    onNextClicked={onNextClicked}
                                                    onSelectObjectFileForDeletion={onSelectObjectFileForDeletion}
                                                />
                                            </div>

                                            {/*
                                                ###########################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
                                                ###########################################################################
                                            */}
                                            <div className="is-fullwidth is-hidden-desktop">
                                                <AdminUserDetailObjectFileListMobile
                                                    userID={cid}
                                                    listData={attachments}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
                                                    onPreviousClicked={onPreviousClicked}
                                                    onNextClicked={onNextClicked}
                                                    onSelectObjectFileForDeletion={onSelectObjectFileForDeletion}
                                                />
                                            </div>
                                        </div>
                                        :
                                        <div className="container">
                                            <article className="message is-dark">
                                                <div className="message-body">
                                                    No attachments. {user.status !== 2 && <><b><Link to={`/admin/user/${cid}/attachments/add`}>Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new attachment.</>}
                                                </div>
                                            </article>
                                        </div>
                                    }

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-fullwidth-mobile" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <Link to={`/admin/user/${cid}/attachments/add`} className="button is-success is-fullwidth-mobile" disabled={user.status === 2}><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link>
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

export default AdminUserDetailObjectFileList;
