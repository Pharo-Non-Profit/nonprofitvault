/*
    THIS FILE IS DEPRECATED BECAUSE WE DON'T WANT TO HAVE THE SERVER DOWNLOAD
    AND PROVIDE THE FILE FROM S3 AND THEN FROM THE SERVER DOWNLOAD IT TO THE
    USER.
 */
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownload, faCloudUpload, faChevronRight, faCloud, faFilterCircleXmark,faArrowLeft, faUniversity, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getObjectFileListAPI, getObjectFileContentAPI } from "../../../../../../API/ObjectFile";
import {
    topAlertMessageState,
    topAlertStatusState,
    currentUserState,
    assistantFilterStatusState,
    assistantFilterTypeState,
    assistantFilterSortState
} from "../../../../../../AppState";
import FormErrorBox from "../../../../../Reusable/FormErrorBox";
import PageLoadingContent from "../../../../../Reusable/PageLoadingContent";
import { CANADA_GOVERNMENT_FILE_CLASSIFICATION_LIST } from "../../../../../../Constants/FileClassificationForCanada";
import DeleteObjectFileModal from "../../../Reusable/DeleteObjectFileModal";
import UploadObjectFileModal from "../../../Reusable/UploadObjectFileModal";
import { OBJECT_FILE_CATEGORY_GOVERNMENT_CANADA } from "../../../../../../Constants/App/ObjectFile";


function CustomerDocumentsByGovernmentCategoryListForCanada() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);
    const [status, setStatus] = useRecoilState(assistantFilterStatusState);                   // Filtering
    const [type, setType] = useRecoilState(assistantFilterTypeState);                         // Filtering
    const [sortByValue, setSortByValue] = useRecoilState(assistantFilterSortState);           // Sorting

    ////
    //// Component states.
    ////

    // Modal related states.
    const [classificationKeyForUpload, setClassificationKeyForUpload] = useState("");
    const [classificationLabelForUpload, setClassificationLabelForUpload] = useState("");
    const [objectFileIDForDeletion, setObjectFileIDForDeletion] = useState("");

    // Page related states.
    const [fileClassifications] = useState(CANADA_GOVERNMENT_FILE_CLASSIFICATION_LIST);
    const [onPageLoaded, setOnPageLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [listData, setListData] = useState("");
    const [listCount, setListCount] = useState(0);
    const [selectedObjectFileForDeletion, setSelectedObjectFileForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                                      // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);                        // Pagination
    const [nextCursor, setNextCursor] = useState("");                                  // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                            // Pagination

    ////
    //// API.
    ////

    // --- List --- //

    function onObjectFileListSuccess(response){
        console.log("onObjectFileListSuccess: Starting...");
        if (response.results !== null) {
            setListData(response);
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

    // --- Count --- //

    function onObjectFileCountSuccess(response) {
        console.log("onObjectFileCountSuccess: Starting...");
        console.log("onObjectFileCountSuccess: response:", response);
        setListCount(response.count);
    }

    function onObjectFileCountError(apiErr) {
        console.log("onObjectFileCountError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onObjectFileCountDone() {
        console.log("onObjectFileCountDone: Starting...");
        setFetching(false);
    }

    // --- All --- //

    const onUnauthorized = () => {
        setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, so, s, t) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "lexical_name") // Sorting

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
        if (t !== undefined && t !== null && t !== "") {
            params.set("type", t);
        }

        getObjectFileListAPI(
            params,
            onObjectFileListSuccess,
            onObjectFileListError,
            onObjectFileListDone,
            onUnauthorized
        );
    }

    const onUploadDocumentClick = (classID, classLabel) => {
        setClassificationKeyForUpload(classID);
        setClassificationLabelForUpload(classLabel);
    }

    const onDeleteDocumentClick = (objectFileID, classLabel) => {
        setObjectFileIDForDeletion(objectFileID);
        setClassificationLabelForUpload(classLabel);
    }

    const onDownloadDocumentClick = (objectFileID, objectFileFilename) => {
    setErrors({});
    setFetching(true);

    getObjectFileContentAPI(
        objectFileID,
        (data) => { // ON SUCCESS
           // Reset any previous errors.
           setErrors({});

           // Convert data to Blob object
           const blob = new Blob([data]);

           // Create an anchor element
           const link = document.createElement('a');

           // Set the href attribute to the blob URL
           link.href = URL.createObjectURL(blob);

           // Set the download attribute to specify the filename
           link.download = objectFileFilename; // Replace 'filename.ext' with the desired filename

           // Hide the anchor element
           link.style.display = 'none';

           // Append the anchor element to the document body
           document.body.appendChild(link);

           // Trigger a click event on the anchor element
           link.click();

           // Remove the anchor element from the document body
           document.body.removeChild(link);

       // Reset the fetching state
       setFetching(false);
        },
        (apiErr) => { // ON ERROR
            // Handle API errors
            setErrors(apiErr);
            setFetching(false);
        },
        () => { // ON DONE
            // Do nothing...
        },
        onUnauthorized
    );
};

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            fetchList(currentCursor, pageSize, "", sortByValue, status, type);

            // If you loaded the page for the very first time.
            if (onPageLoaded === false) {
                window.scrollTo(0, 0);  // Start the page at the top of the page.
                setOnPageLoaded(true);
            }
        }

        return () => { mounted = false; }
    }, [onPageLoaded, currentCursor, pageSize, sortByValue, status, type]);

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
                        <ul className="">
                            <li className=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/documents" aria-current="page"><FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;Cloud Documents</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUniversity} />&nbsp;Government</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className="">
                                <Link to="/documents" aria-current="page">
                                    <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Cloud Documents
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;Cloud Documents</h1>
                    <hr />

                    {/* Page Modal(s) */}
                    <DeleteObjectFileModal
                        objectFileIDForDeletion={objectFileIDForDeletion}
                        setObjectFileIDForDeletion={setObjectFileIDForDeletion}
                        classificationLabelForUpload={classificationLabelForUpload}
                        onSuccessCompletionCallback={()=>{
                            console.log("UPLODAED!!!!!!!!!!!!!");
                            setOnPageLoaded(false);
                            fetchList(currentCursor, pageSize, "", sortByValue, status, type);
                        }}
                        onErrorCompletionCallback={()=>{
                            console.log("ERR!!!!!!!!!!!!!");
                        }}
                    />
                    <UploadObjectFileModal
                        currentUser={currentUser}
                        category={OBJECT_FILE_CATEGORY_GOVERNMENT_CANADA}
                        classificationKeyForUpload={classificationKeyForUpload}
                        setClassificationKeyForUpload={setClassificationKeyForUpload}
                        classificationLabelForUpload={classificationLabelForUpload}
                        onSuccessCompletionCallback={()=>{
                            console.log("UPLODAED!!!!!!!!!!!!!");
                            setOnPageLoaded(false);
                            fetchList(currentCursor, pageSize, "", sortByValue, status, type);
                        }}
                        onErrorCompletionCallback={()=>{
                            console.log("ERR!!!!!!!!!!!!!");
                        }}
                    />

                    {/* Page Table */}
                    <nav className="box" style={{ borderRadius: "20px"}}>

                        {/* Title + Options */}
                        <div className="columns">
                            <div className="column">
                                <h1 className="title is-3"><FontAwesomeIcon className="fas" icon={faUniversity} />&nbsp;Government Related Cloud Documents</h1>
                                <p>The following documents are need by the government for your non-profit organization.</p>
                            </div>
                        </div>

                        {/* Table Contents */}
                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                {fileClassifications && fileClassifications.map(function(fileClassification, i){

                                    // Variable indicates if we've matched an `object_file` with this file classification.
                                    let isMatch = false;
                                    let objectFile = null;

                                    if (listData !== undefined && listData !== null && listData !== "") {
                                        if (listData.results !== undefined && listData.results !== null && listData.results !== "") {
                                            for (let i = 0; i < listData.results.length; i++) {
                                                objectFile = listData.results[i];
                                                if (objectFile.classification === fileClassification.id) {
                                                    isMatch = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    return <>
                                        {/*
                                            ----------------------
                                            DESKTOP OR TABLET VIEW
                                            ----------------------
                                        */}
                                        <div class="column is-hidden-mobile" key={`desktop_tablet_${fileClassification.id}`}>
                                            <hr />
                                            <div class="columns">
                                                <div class="column">
                                                    <h1 class="title is-5">
                                                        {fileClassification.label}
                                                    </h1>
                                                    <span className="has-text-grey">{fileClassification.short}</span>
                                                    <br />
                                                    <br />
                                                </div>
                                                <div class="column is-one-quarter">
                                                    <div class="buttons is-right">
                                                        {isMatch
                                                            ?
                                                            <>
                                                                <button onClick={(e)=>onDownloadDocumentClick(objectFile.id, objectFile.filename)} class="button is-small is-primary" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faCloudDownload} />&nbsp;Download
                                                                </button>
                                                                <button onClick={(a,b)=>onDeleteDocumentClick(objectFile.id, fileClassification.label)} class="button is-small is-danger" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                                                </button>
                                                            </>
                                                            :
                                                            <>
                                                                <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-small is-success" type="button">
                                                                    <FontAwesomeIcon className="mdi" icon={faCloudUpload} />&nbsp;Upload
                                                                </button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/*
                                            ----------------------
                                                 MOBILE VIEW
                                            ----------------------
                                        */}
                                        <div class="is-hidden-tablet" key={`mobile_${fileClassification.id}`}>
                                            <div className="mb-5 content">
                                                <hr />
                                                <strong>{fileClassification.label}</strong>
                                                <br />
                                                <br />
                                                <span className="has-text-grey">{fileClassification.short}</span>
                                                <br />
                                                <br />
                                                {isMatch
                                                    ?
                                                    <>
                                                        <button onClick={(e)=>onDownloadDocumentClick(objectFile.id)} class="button is-fullwidth-mobile is-primary" type="button">
                                                            <FontAwesomeIcon className="mdi" icon={faCloudDownload} />&nbsp;Download
                                                        </button>
                                                        <br />
                                                        <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-fullwidth-mobile is-danger" type="button">
                                                            <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-fullwidth-mobile is-success" type="button">
                                                            <FontAwesomeIcon className="mdi" icon={faCloudUpload} />&nbsp;Upload
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </>;
                                })}

                                {/*
                                {listData && listData.results && (listData.results.length > 0 || previousCursors.length > 0)
                                    ?
                                    <div className="container">

                                    </div>
                                    :
                                    <section className="hero is-medium has-background-white-ter">
                                        <div className="hero-body">
                                            <p className="title">
                                                <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Folders
                                            </p>
                                            <p className="subtitle">
                                                No folders. <b><Link to="/upload-directories/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your folder to upload your files to.
                                            </p>
                                        </div>
                                    </section>
                                }
                                */}
                            </>
                        }
                        <div className="columns pt-5">
                            <div className="column is-half">
                                <Link className="button is-fullwidth-mobile" to={`/documents`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Cloud Documents</Link>
                            </div>
                            <div className="column is-half has-text-right">

                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </>
    );
}

export default CustomerDocumentsByGovernmentCategoryListForCanada;
