import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faFile, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../../../../../Hooks/useLocalStorage";
import { postUploadFileCreateAPI } from "../../../../../../API/UploadFile";
import FormErrorBox from "../../../../../Reusable/FormErrorBox";
import FormInputField from "../../../../../Reusable/FormInputField";
import FormTextareaField from "../../../../../Reusable/FormTextareaField";
import FormRadioField from "../../../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../../../Reusable/FormCheckboxField";
import FormCountryField from "../../../../../Reusable/FormCountryField";
import FormRegionField from "../../../../../Reusable/FormRegionField";
import PageLoadingContent from "../../../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../../../AppState";


function CustomerUploadDirectoryUploadFileAdd() {
    ////
    //// URL Parameters.
    ////

    const { udid } = useParams()

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
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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
        formData.append('name', name);
        formData.append('description', description);
        formData.append('upload_directory_id', udid);
        if (selectedFile !== undefined && selectedFile !== null && selectedFile !== "") {
            formData.append('file', selectedFile);
        }

        postUploadFileCreateAPI(
            formData,
            onCustomerUserUploadFileAddSuccess,
            onCustomerUserUploadFileAddError,
            onCustomerUserUploadFileAddDone,
            onUnauthorized
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    function onCustomerUserUploadFileAddSuccess(response){
        // For debugging purposes only.
        console.log("onCustomerUserUploadFileAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("UploadFile uploaded");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onCustomerUserUploadFileAddSuccess: Delayed for 2 seconds.");
            console.log("onCustomerUserUploadFileAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to the user attachments page.
        setForceURL("/upload-directory/" + udid + "/upload-file/" + response.id);
    }

    function onCustomerUserUploadFileAddError(apiErr) {
        console.log("onCustomerUserUploadFileAddError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onCustomerUserUploadFileAddError: Delayed for 2 seconds.");
            console.log("onCustomerUserUploadFileAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerUserUploadFileAddDone() {
        console.log("onCustomerUserUploadFileAddDone: Starting...");
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
            <div className="container">
                <section className="section">
                    {/* Desktop Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/upload-directories" aria-current="page"><FontAwesomeIcon className="fas" icon={faCloudUpload} />&nbsp;Documents</Link></li>
                            <li className=""><Link to={`/upload-directory/${udid}/upload-files`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Files)</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={`/assistant-files`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Files)</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faCloudUpload} />&nbsp;Documents</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">

                        {/* Name + Options */}
                        <p className="name is-4"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add File</p>

                        <FormErrorBox errors={errors} />

                        {/* <p className="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <div className="container">

                                    <FormInputField
                                        label="Name"
                                        name="name"
                                        placeholder="Text input"
                                        value={name}
                                        errorText={errors && errors.name}
                                        helpText=""
                                        onChange={(e)=>setName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <FormInputField
                                        label="Description"
                                        name="description"
                                        type="text"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText=""
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="485px"
                                    />

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

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link to={`/upload-directory/${udid}/upload-files`} className="button is-fullwidth-mobile">
                                                <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Files)
                                            </Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <button className="button is-medium is-success is-fullwidth-mobile" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default CustomerUploadDirectoryUploadFileAdd;
