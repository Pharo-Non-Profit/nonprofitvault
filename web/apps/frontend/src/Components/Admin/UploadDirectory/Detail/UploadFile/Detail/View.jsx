import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload, faTrash, faTable, faFile, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getUploadFileDetailAPI, deleteUploadFileAPI } from "../../../../../../API/UploadFile";
import FormErrorBox from "../../../../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../../../../Reusable/DataDisplayRowText";
import FormInputField from "../../../../../Reusable/FormInputField";
import FormTextareaField from "../../../../../Reusable/FormTextareaField";
import FormRadioField from "../../../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../../../Reusable/FormCheckboxField";
import FormCountryField from "../../../../../Reusable/FormCountryField";
import FormRegionField from "../../../../../Reusable/FormRegionField";
import DataDisplayRowDownloadLink from "../../../../../Reusable/DataDisplayRowDownloadLink";
import PageLoadingContent from "../../../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../../../AppState";


function AdminUploadDirectoryUploadFileDetail() {
    ////
    //// URL Parameters.
    ////

    const { udid, ufid } = useParams()

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
    const [attachment, setUploadFile] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    ////
    //// Event handling.
    ////

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteUploadFileAPI(
            ufid,
            onUploadFileDeleteSuccess,
            onUploadFileDeleteError,
            onUploadFileDeleteDone,
            onUnauthorized
        );
        setShowDeleteModal(false);
    }

    ////
    //// API.
    ////

    // --- DETAIL --- //

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setUploadFile(response);
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

    // --- DELETE --- //

    function onUploadFileDeleteSuccess(response){
        console.log("onUploadFileDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Assistant file deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect back to the list.
        setForceURL("/admin/upload-directory/" + udid + "/upload-files");
    }

    function onUploadFileDeleteError(apiErr) {
        console.log("onUploadFileDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onUploadFileDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUploadFileDeleteDone() {
        console.log("onUploadFileDeleteDone: Starting...");
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
            getUploadFileDetailAPI(
                ufid,
                onSuccess,
                onError,
                onDone,
                onUnauthorized
            );
        }

        return () => { mounted = false; }
    }, [ufid,]);

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
                                You are about to <b>delete</b> this file; it will no longer appear in our OpenAI account. This action can be undone. Are you sure you would like to continue?
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
                            <li className=""><Link to="/admin/upload-directories" aria-current="page"><FontAwesomeIcon className="fas" icon={faCloudUpload} />&nbsp;My Uploads</Link></li>
                            <li className=""><Link to={`/admin/upload-directory/${udid}/upload-files`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Files)</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;File</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={`/admin/upload-directory/${udid}/upload-files`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Files)</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faCloudUpload} />&nbsp;My Uploads</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">

                        {/* Title + Options */}
                        {attachment && <div className="columns">
                            <div className="column">
                                <p className="title is-4">
                                    <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Detail
                                </p>
                            </div>
                            <div className="column has-text-right">
                                <Link to={`/admin/upload-directory/${udid}/upload-file/${ufid}/edit`} className="button is-small is-warning is-fullwidth-mobile" type="button" disabled={attachment.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                </Link>&nbsp;
                                <Link onClick={(e)=>setShowDeleteModal(true)} className="button is-small is-danger is-fullwidth-mobile" type="button" disabled={attachment.status === 2}>
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
                                {attachment && <div className="container">

                                    <DataDisplayRowText
                                        label="Name"
                                        value={attachment.name}
                                    />

                                    <DataDisplayRowText
                                        label="Description"
                                        value={attachment.description}
                                    />

                                    <DataDisplayRowText
                                        label="OpenAI File ID"
                                        value={attachment.openaiFileId}
                                    />

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link to={`/admin/upload-directory/${udid}/upload-files`} className="button is-fullwidth-mobile">
                                                <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Files)
                                            </Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <Link to={`/admin/upload-directory/${udid}/upload-file/${ufid}/edit`} className="button is-medium is-warning is-fullwidth-mobile" type="button">
                                                <FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit
                                            </Link>
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

export default AdminUploadDirectoryUploadFileDetail;
