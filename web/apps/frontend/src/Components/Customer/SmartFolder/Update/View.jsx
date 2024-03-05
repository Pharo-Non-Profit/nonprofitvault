import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversity, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faCloud, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { putSmartFolderUpdateAPI } from "../../../../API/SmartFolder";
import { getSmartFolderDetailAPI } from "../../../../API/SmartFolder";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormSelectField from "../../../Reusable/FormSelectField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import { OPENAI_COMPLETION_MODEL_WITH_EMPTY_OPTION } from "../../../../Constants/FieldOptions";
import {
    SMART_FOLDER_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS,
    SMART_FOLDER_CATEGORY_BUSINESS,
    SMART_FOLDER_BUSINESS_SUB_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS,
    SMART_FOLDER_CATEGORY_PERSONAL,
    SMART_FOLDER_PERSONAL_SUB_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS,
} from "../../../../Constants/App/SmartFolder";


function CustomerSmartFolderUpdate() {
    ////
    //// URL Parameters.
    ////

    const { sfid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [onPageLoaded, setOnPageLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sortNumber, setSortNumber] = useState(1);
    const [category, setCategory] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    const [smartFolderDetail, setSmartFolderDetail] = useState("");

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
            id: sfid,
            name: name,
            description: description,
            sort_number: parseInt(sortNumber),
            category: category,
            sub_category: subCategory,
        };
        putSmartFolderUpdateAPI(
            decamelizedData,
            onCustomerUserSmartFolderAddSuccess,
            onCustomerUserSmartFolderAddError,
            onCustomerUserSmartFolderAddDone,
            onUnauthorized
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    // --- Smart Folder Detail --- //

    function onSmartFolderDetailSuccess(response){
        console.log("onSmartFolderDetailSuccess: Starting...");
        setSmartFolderDetail(response);
        setName(response.name);
        setDescription(response.description);
        setCategory(response.category);
        setSubCategory(response.subCategory);
    }

    function onSmartFolderDetailError(apiErr) {
        console.log("onSmartFolderDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onSmartFolderDetailDone() {
        console.log("onSmartFolderDetailDone: Starting...");
        setFetching(false);
    }

    // --- Update --- //

    function onCustomerUserSmartFolderAddSuccess(response){
        // For debugging purposes only.
        console.log("onCustomerUserSmartFolderAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Smart folder updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onCustomerUserSmartFolderAddSuccess: Delayed for 2 seconds.");
            console.log("onCustomerUserSmartFolderAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to the user attachments page.
        setForceURL("/smart-folder/"+response.id);
    }

    function onCustomerUserSmartFolderAddError(apiErr) {
        console.log("onCustomerUserSmartFolderAddError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onCustomerUserSmartFolderAddError: Delayed for 2 seconds.");
            console.log("onCustomerUserSmartFolderAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onCustomerUserSmartFolderAddDone() {
        console.log("onCustomerUserSmartFolderAddDone: Starting...");
        setFetching(false);
    }

    // --- All --- //

    const onUnauthorized = () => {
        setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        setFetching(true);
        getSmartFolderDetailAPI(
            sfid,
            onSmartFolderDetailSuccess,
            onSmartFolderDetailError,
            onSmartFolderDetailDone,
            onUnauthorized
        );

        // If you loaded the page for the very first time.
        if (onPageLoaded === false) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            setOnPageLoaded(true);
        }

        return () => { mounted = false; }
    }, [sfid]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    let subCategoryOptions;
    switch (category) {
        case SMART_FOLDER_CATEGORY_BUSINESS:
            subCategoryOptions = SMART_FOLDER_BUSINESS_SUB_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS;
            break;
        case SMART_FOLDER_CATEGORY_PERSONAL:
            subCategoryOptions = SMART_FOLDER_PERSONAL_SUB_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS;
            break;
    }
    console.log("category", category);
    console.log("subCategoryOptions", subCategoryOptions);

    return (
        <>
            <div className="container">
                <section className="section">

                    {/* Desktop Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/smart-folders" aria-current="page"><FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;Smart Folders</Link></li>
                            <li className="">
                                {smartFolderDetail && <>
                                    <Link aria-current="page" to={`/smart-folder/${sfid}`}>
                                        <FontAwesomeIcon className="fas" icon={faUniversity} />&nbsp;{smartFolderDetail.name}
                                    </Link>
                                </>}
                            </li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={`/smart-folder/${sfid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Page Name */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;{smartFolderDetail && <>{smartFolderDetail.name}</>}</h1>
                    <h4 className="subtitle is-5"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Smart Folder</h4>
                    <hr />

                    {/* Page Contents */}
                    <nav class="box" style={{ borderRadius: "20px"}}>

                        {/* Name + Options */}
                        <p className="title is-4">
                            <FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Smart Folder
                        </p>
                        <p className="pb-4 has-text-grey">Please fill out all the required fields before submitting.</p>
                        <FormErrorBox errors={errors} />

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
                                        maxWidth="400px"
                                    />

                                    <FormTextareaField
                                        label="Description (Optional)"
                                        name="description"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText=""
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="280px"
                                        rows={4}
                                    />

                                    {/*<FormInputField
                                        label="Sort Number (Optional)"
                                        name="sortNumber"
                                        placeholder="Number input"
                                        value={sortNumber}
                                        errorText={errors && errors.sortNumber}
                                        helpText=""
                                        onChange={(e)=>setSortNumber(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />*/}

                                    <FormSelectField
                                        label="Category"
                                        name="category"
                                        placeholder="Pick"
                                        selectedValue={category}
                                        errorText={errors && errors.category}
                                        helpText=""
                                        onChange={(e)=>setCategory(parseInt(e.target.value))}
                                        options={SMART_FOLDER_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />

                                    <FormSelectField
                                        label="Sub-Category"
                                        name="subCategory"
                                        placeholder="Pick"
                                        selectedValue={subCategory}
                                        errorText={errors && errors.subCategory}
                                        helpText=""
                                        onChange={(e)=>setSubCategory(parseInt(e.target.value))}
                                        options={subCategoryOptions}
                                        disabled={category===0}
                                    />

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link to={`/smart-folder/${sfid}`} className="button is-fullwidth-mobile">
                                                <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail
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

export default CustomerSmartFolderUpdate;
