import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faFile, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { postObjectFileCreateAPI } from "../../../../API/ObjectFile";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";


function UploadObjectFileModal({ currentUser, category, classificationKeyForUpload, classificationLabelForUpload, setClassificationKeyForUpload, onSuccessCompletionCallback, onErrorCompletionCallback }) {
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
    const [selectedFile, setSelectedFile] = useState(null);

    ////
    //// Event handling.
    ////

    const onHandleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Starting...")
        setFetching(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', "");
        formData.append('description', "");
        formData.append('category', category);
        formData.append('classification', classificationKeyForUpload);
        if (selectedFile !== undefined && selectedFile !== null && selectedFile !== "") {
            formData.append('file', selectedFile);
        }

        postObjectFileCreateAPI(
            formData,
            onCustomerUserObjectFileAddSuccess,
            onCustomerUserObjectFileAddError,
            onCustomerUserObjectFileAddDone,
            onUnauthorized
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    function onCustomerUserObjectFileAddSuccess(response){
        // For debugging purposes only.
        console.log("onCustomerUserObjectFileAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Cloud document uploaded");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onCustomerUserObjectFileAddSuccess: Delayed for 2 seconds.");
            console.log("onCustomerUserObjectFileAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        setErrors({}); // Clear the errors.
        setSelectedFile(null); // Clear the current file submission.
        setClassificationKeyForUpload(""); // Setting empty string will force this modal to hide.
        onSuccessCompletionCallback();
    }

    function onCustomerUserObjectFileAddError(apiErr) {
        console.log("onCustomerUserObjectFileAddError: Starting...");
        setErrors(apiErr);
        onErrorCompletionCallback(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onCustomerUserObjectFileAddError: Delayed for 2 seconds.");
            console.log("onCustomerUserObjectFileAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerUserObjectFileAddDone() {
        console.log("onCustomerUserObjectFileAddDone: Starting...");
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
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div className={`modal ${classificationKeyForUpload ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title"><FontAwesomeIcon className="mdi" icon={faCloudUpload} />&nbsp;Upload Document</p>
                        <button className="delete" aria-label="close" onClick={(e)=>{setClassificationKeyForUpload("")}}></button>
                    </header>
                    <section className="modal-card-body">
                        <p className="has-text-grey">Please click on <strong>Chooose File</strong> button and select your <strong>{classificationLabelForUpload}</strong> document found on your computer, when you are ready click <strong>Submit Document</strong> to finish uploading.</p>
                        <br />
                        <FormErrorBox errors={errors} />
                        {selectedFile !== undefined && selectedFile !== null && selectedFile !== ""
                            ?
                            <>
                                <article className="message is-success">
                                    <div className="message-body">
                                        <FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;File ready to upload.
                                    </div>
                                </article>
                            </>
                            :
                            <>
                                <input name="file" type="file" onChange={onHandleFileChange} className="button is-medium" />
                                <br />
                                <br />
                            </>
                        }
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={(e)=>{onSubmitClick()}}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Submit Document</button>
                        <button className="button" onClick={(e)=>{setClassificationKeyForUpload("")}}><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default UploadObjectFileModal;
