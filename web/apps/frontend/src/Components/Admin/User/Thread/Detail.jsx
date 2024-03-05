import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faArrowRight, faTrash, faTable, faCodeBranch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getAssistantThreadDetailAPI, deleteAssistantThreadAPI } from "../../../../API/AssistantThread";
import { postAssistantMessageCreateAPI, getAssistantMessageListAPI } from "../../../../API/AssistantMessage";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import DataDisplayRowAssistantFiles from "../../../Reusable/DataDisplayRowAssistantFiles";
import DataDisplayRowText from "../../../Reusable/DataDisplayRowText";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormCountryField from "../../../Reusable/FormCountryField";
import FormRegionField from "../../../Reusable/FormRegionField";
import DataDisplayRowDownloadLink from "../../../Reusable/DataDisplayRowDownloadLink";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import DateTimeTextFormatter from "../../../Reusable/EveryPage/DateTimeTextFormatter";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import { ASSISTANT_THREAD_STATUS_ACTIVE, ASSISTANT_THREAD_STATUS_QUEUED, ASSISTANT_THREAD_STATUS_ERROR, ASSISTANT_THREAD_STATUS_ARCHIVED } from "../../../../Constants/App";


function AdminUserDetailThreadDetail() {
    ////
    //// URL Parameters.
    ////

    const { cid, tid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    // Page states.
    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // List data states.
    const [listData, setListData] = useState({});
    const [pageSize, setPageSize] = useState(10);                               // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);                 // Pagination
    const [nextCursor, setNextCursor] = useState("");                           // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                     // Pagination

    // Detail data states.
    const [assistant, setAssistant] = useState({});

    // Create.
    const [message, setMessage] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        const payload = {
            assistant_thread_id: tid,
            text: message,
        };
        postAssistantMessageCreateAPI(
            payload,
            onAssistantMessageSuccess,
            onAssistantMessageError,
            onAssistantMessageDone,
            onUnauthorized
        );
        setShowDeleteModal(false);
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteAssistantThreadAPI(
            tid,
            onAssistantThreadDeleteSuccess,
            onAssistantThreadDeleteError,
            onAssistantThreadDeleteDone,
            onUnauthorized
        );
        setShowDeleteModal(false);
    }

    ////
    //// API.
    ////

    // --- (ASSISTANT THREAD) DETAIL --- //

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setAssistant(response);

        // The following code will fetch the messages for the particular thread.

        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", 1_000);        // Pagination
        params.set("sort_field", "created_at") // Sorting
        params.set("sort_order", 1)            // Sorting
        if (currentCursor !== "") { // Pagination
            params.set("cursor", currentCursor);
        }
        params.set("assistant_thread_id", tid);

        getAssistantMessageListAPI(
            params,
            onAssistantListSuccess,
            onAssistantListError,
            onAssistantListDone,
            onUnauthorized
        );
    }

    function onError(apiErr) {
        console.log("onError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDone() {
        console.log("onDone: Starting...");
        setFetching(false);
    }

    // --- (ASSISTANT MESSAGES) LIST --- //

    function onAssistantListSuccess(response){
        console.log("onAssistantListSuccess: Starting...");
        if (response.results !== null) {
            setListData(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onAssistantListError(apiErr) {
        console.log("onAssistantListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAssistantListDone() {
        console.log("onAssistantListDone: Starting...");
        setFetching(false);
    }

    // --- (ASSISTANT THREAD) DELETE --- //

    function onAssistantThreadDeleteSuccess(response){
        console.log("onAssistantThreadDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Assistant thread deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect back to the list.
        setForceURL("/admin/user/"+cid+"/threads");
    }

    function onAssistantThreadDeleteError(apiErr) {
        console.log("onAssistantThreadDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onAssistantThreadDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAssistantThreadDeleteDone() {
        console.log("onAssistantThreadDeleteDone: Starting...");
        setFetching(false);
    }

    // --- CREATE MESSAGE --- //

    function onAssistantMessageSuccess(response){
        // For debugging purposes only.
        console.log("onAssistantMessageSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Assistant message created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAssistantMessageSuccess: Delayed for 2 seconds.");
            console.log("onAssistantMessageSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch the latest list.
        setFetching(true);
        getAssistantThreadDetailAPI(
            tid,
            onSuccess,
            onError,
            onDone,
            onUnauthorized
        );
    }

    function onAssistantMessageError(apiErr) {
        console.log("onAssistantMessageError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAssistantMessageDone() {
        console.log("onAssistantMessageDone: Starting...");
        setFetching(false);
    }

    // --- ALL --- //

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
            getAssistantThreadDetailAPI(
                tid,
                onSuccess,
                onError,
                onDone,
                onUnauthorized
            );
        }

        return () => { mounted = false; }
    }, [tid,]);

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
                    {/* Page Modal(s) */}
                    <div className={`modal ${showDeleteModal ? 'is-active' : ''}`}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Are you sure?</p>
                                <button className="delete" aria-label="close" onClick={(e)=>setShowDeleteModal(false)}></button>
                            </header>
                            <section className="modal-card-body">
                                You are about to <b>delete</b> this assistant thread; it will no longer appear in our OpenAI account. This action can be undone. Are you sure you would like to continue?
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                <button className="button" onClick={(e)=>setShowDeleteModal(false)}>Cancel</button>
                            </footer>
                        </div>
                    </div>

                    {/* Desktop Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Users</Link></li>
                            <li className=""><Link to={`/admin/user/${cid}/threads`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Threads)</Link></li>
                            <li className="is-active"><Link to="" aria-current="page"><FontAwesomeIcon className="fas" icon={faCodeBranch} />&nbsp;Assistant Thread</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={`/admin/user/${cid}/threads`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Threads)</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;User</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page Back Button */}
                    <Link to={`/admin/user/${cid}/threads`} className="is-fullwidth-mobile">
                        <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Threads
                    </Link><br /><br />

                    {/* Page */}
                    <nav className="box">
                        {/* Title + Options */}
                        {assistant && <div className="columns">
                            <div className="column">
                                <p className="title is-4">
                                    <FontAwesomeIcon className="fas" icon={faCodeBranch} />&nbsp;Thread Detail
                                </p>
                            </div>
                            <div className="column has-text-right">
                                <Link onClick={(e)=>setShowDeleteModal(true)} className="button is-small is-danger is-fullwidth-mobile" type="button" disabled={assistant.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faTrash} />&nbsp;Delete
                                </Link>
                            </div>
                        </div>}

                        <FormErrorBox errors={errors} />

                        {/* <p className="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                {assistant && <div className="container ">

                                    {assistant.status === ASSISTANT_THREAD_STATUS_ACTIVE && <>
                                        {listData && listData.results && <>
                                            {listData.results.map(function(message, i){
                                                console.log(message); // For debugging purposes only.

                                                // Set the ownership title.
                                                const fromWhom = message.fromAssistant ? "Assistant" : "User";

                                                // Render according to the `status` of the message.
                                                if (message.status === 1) { // success
                                                    return <>
                                                        <div className="pb-3">
                                                            <span className="is-pulled-right has-text-grey-light">{fromWhom} at <b><DateTimeTextFormatter value={message.createdAt} /></b></span>
                                                            <br />
                                                            <article className="message">
                                                                <div className="message-body">{message.text}</div>
                                                            </article>
                                                        </div>
                                                    </>
                                                }
                                                if (message.status === 2) { // processing in openai
                                                    return <PageLoadingContent displayMessage={"Processing"} />
                                                }
                                                return (<></>)
                                            })}
                                        </>}

                                        {/*
                                        <div className="mt-4 block has-background-success-light p-3">
                                            <FormTextareaField
                                                label="Write your question here:"
                                                name="message"
                                                placeholder="Text input"
                                                value={message}
                                                errorText={errors && errors.message}
                                                helpText=""
                                                onChange={(e)=>setMessage(e.target.value)}
                                                isRequired={true}
                                                maxWidth="180px"
                                            />
                                        </div>
                                        */}

                                    </>}
                                    {assistant.status === ASSISTANT_THREAD_STATUS_QUEUED && <>
                                        <section className="hero is-medium has-background-white-ter">
                                            <div className="hero-body">
                                                <p className="title">
                                                    <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Processing
                                                </p>
                                                <p className="subtitle">
                                                    Your submission is currently being processed by OpenAI, please wait until finishes.
                                                </p>
                                            </div>
                                        </section>
                                    </>}
                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link to={`/admin/user/${cid}/threads`} className="button is-fullwidth-mobile">
                                                <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Threads)
                                            </Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            {/*
                                            <button onClick={onSubmitClick} className="button is-success is-fullwidth-mobile" disabled={assistant.status !== ASSISTANT_THREAD_STATUS_ACTIVE }>
                                                <FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Submit Question
                                            </button>
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

export default AdminUserDetailThreadDetail;
