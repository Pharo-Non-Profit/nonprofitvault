import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faFile, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { deleteObjectFileAPI } from "../../../../../API/ObjectFile";
import FormErrorBox from "../../../../Reusable/FormErrorBox";
import PageLoadingContent from "../../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../../AppState";


function DeleteObjectFileModal({ objectFileIDForDeletion, setObjectFileIDForDeletion, classificationLabelForUpload, onSuccessCompletionCallback, onErrorCompletionCallback }) {
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

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onSubmitClick: Starting...")
        setFetching(true);
        setErrors({});

        deleteObjectFileAPI(
            objectFileIDForDeletion,
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
        setTopAlertMessage("Cloud document deleted");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onCustomerUserObjectFileAddSuccess: Delayed for 2 seconds.");
            console.log("onCustomerUserObjectFileAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        setErrors({}); // Clear the errors.
        setObjectFileIDForDeletion(""); // Setting empty string will force this modal to hide.
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
            <div className={`modal ${objectFileIDForDeletion ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Are you sure?</p>
                        <button className="delete" aria-label="close" onClick={(e)=>{setObjectFileIDForDeletion("")}}></button>
                    </header>
                    <section className="modal-card-body">
                        You are about to <b>permentatly delete</b> this <strong>{classificationLabelForUpload}</strong> document; this action can be undone. Are you sure you would like to continue?
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                        <button className="button" onClick={(e)=>{setObjectFileIDForDeletion("")}}>Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default DeleteObjectFileModal;
