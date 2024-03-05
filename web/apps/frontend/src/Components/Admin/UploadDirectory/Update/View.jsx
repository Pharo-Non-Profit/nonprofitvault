import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faCloudUpload, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { putUploadDirectoryUpdateAPI, getUploadDirectoryDetailAPI } from "../../../../API/UploadDirectory";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import { OPENAI_COMPLETION_MODEL_WITH_EMPTY_OPTION } from "../../../../Constants/FieldOptions";


function AdminUploadDirectoryUpdate() {
    ////
    //// URL Parameters.
    ////

    const { id } = useParams()

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
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sortNumber, setSortNumber] = useState("");

    ////
    //// Event handling.
    ////

    const onHandleChange = (event) => {
        setSelected(event.target.files[0]);
    };

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Starting...")
        setFetching(true);
        setErrors({});

        const decamelizedData = {
            id: id,
            name: name,
            description: description,
            sort_number: sortNumber,
        };
        putUploadDirectoryUpdateAPI(
            decamelizedData,
            onAdminUploadDirectoryUpdateSuccess,
            onAdminUploadDirectoryUpdateError,
            onAdminUploadDirectoryUpdateDone,
            onUnauthorized
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    // --- Update --- //

    function onAdminUploadDirectoryUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminUploadDirectoryUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Upload directory updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminUploadDirectoryUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminUploadDirectoryUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to the user attachments page.
        setForceURL("/admin/upload-directory/"+id);
    }

    function onAdminUploadDirectoryUpdateError(apiErr) {
        console.log("onAdminUploadDirectoryUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminUploadDirectoryUpdateError: Delayed for 2 seconds.");
            console.log("onAdminUploadDirectoryUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminUploadDirectoryUpdateDone() {
        console.log("onAdminUploadDirectoryUpdateDone: Starting...");
        setFetching(false);
    }

    // --- Detail --- //
    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setName(response.name);
        setDescription(response.description);
        setSortNumber(response.sortNumber);
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
            setErrors({});
            getUploadDirectoryDetailAPI(
                id,
                onSuccess,
                onError,
                onDone,
                onUnauthorized
            );
        }

        return () => { mounted = false; }
    }, [id,]);

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
                            <li className=""><Link to="/admin/upload-directories" aria-current="page"><FontAwesomeIcon className="fas" icon={faCloudUpload} />&nbsp;My Uploads</Link></li>
                            <li className=""><Link to={`/admin/upload-directory/${id}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={`/assistant/${id}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faCloudUpload} />&nbsp;My Uploads</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">

                        {/* Name + Options */}
                        <div className="columns">
                            <div className="column">
                                <p className="title is-4">
                                    <FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit
                                </p>
                            </div>
                            <div className="column has-text-right">
                                {/* Do nothing ... */}
                            </div>
                        </div>

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
                                        helpText="Provide the public name which will be displayed to admins."
                                        onChange={(e)=>setName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <FormTextareaField
                                        label="Description (Optional)"
                                        name="description"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText="Provide the description for admins to read when viewing this assistant."
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="280px"
                                        rows={4}
                                    />

                                    <FormInputField
                                        label="Sort Number"
                                        name="sortNumber"
                                        placeholder="Number input"
                                        value={sortNumber}
                                        errorText={errors && errors.sortNumber}
                                        helpText=""
                                        onChange={(e)=>setSortNumber(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link to={`/upload-directory/${id}`} className="button is-fullwidth-mobile"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link>
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

export default AdminUploadDirectoryUpdate;
