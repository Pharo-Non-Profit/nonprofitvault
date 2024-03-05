import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloud, faArrowLeft, faSearch, faTable, faFilter, faFilterCircleXmark,
    faArrowCircleRight, faMoneyBills, faUniversity, faArrowCircleUp, faMessage,
    faChevronRight, faPlus, faPencil, faTimes, faBullhorn,
    faArrowUpRightFromSquare, faNewspaper, faWrench, faHardHat, faUserCircle,
    faTasks, faGauge, faArrowRight, faUsers, faBarcode
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import BubbleLink from "../../../Reusable/EveryPage/BubbleLink";
import { getSmartFolderListAPI } from "../../../../API/SmartFolder";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormSelectField from "../../../Reusable/FormSelectField";
import DateTextFormatter from "../../../Reusable/EveryPage/DateTextFormatter";
import DateTimeTextFormatter from "../../../Reusable/EveryPage/DateTimeTextFormatter";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import {
    SMART_FOLDER_BUSINESS_SUB_CATEGORY_GOVERNMENT_CANADA,
    SMART_FOLDER_PERSONAL_SUB_CATEGORY_PROOF_OF_PURCHASE,
    SMART_FOLDER_PERSONAL_SUB_CATEGORY_HOME_OWNERSHIP
} from "../../../../Constants/App/SmartFolder";

import {
    topAlertMessageState,
    topAlertStatusState,
    currentUserState,
    assistantFilterStatusState,
    assistantFilterTypeState,
    assistantFilterSortState,
    smartFolderListDataState
} from "../../../../AppState";
import { USER_ROLES,
    PAGE_SIZE_OPTIONS,
    USER_STATUS_LIST_OPTIONS,
    USER_ROLE_LIST_OPTIONS,
    ASSISTANT_SORT_OPTIONS,
    ASSISTANT_STATUS_FILTER_OPTIONS,
    ASSISTANT_TYPE_OF_FILTER_OPTIONS
} from "../../../../Constants/FieldOptions";


function CustomerSmartFolderList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);
    const [status, setStatus] = useRecoilState(assistantFilterStatusState);                   // Filtering
    const [type, setType] = useRecoilState(assistantFilterTypeState);                         // Filtering
    const [sortByValue, setSortByValue] = useRecoilState(assistantFilterSortState);           // Sorting
    const [listData, setListData] = useRecoilState(smartFolderListDataState);

    ////
    //// Component states.
    ////

    // Page states.
    const [onPageLoaded, setOnPageLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [isFetching, setFetching] = useState(false);

    // List states.
    const [listCount, setListCount] = useState(0);
    const [selectedUploadDirectoryForDeletion, setSelectedUploadDirectoryForDeletion] = useState("");
    const [pageSize, setPageSize] = useState(10);                                      // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);                        // Pagination
    const [nextCursor, setNextCursor] = useState("");                                  // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                            // Pagination

    ////
    //// API.
    ////

    const onListSuccess = (response) => {
        console.log("onListSuccess: Starting...");
        if (response.results !== null) {
            setListData(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    const onListError = (apiErr) => {
        console.log("onListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onListDone = (response) => {
        console.log("onListDone: Starting...");
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
        console.log("fetchList: Starting...");
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

        // // Filtering
        // if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
        //     params.set("search", keywords);
        // }
        // if (s !== undefined && s !== null && s !== "") {
        //     params.set("status", s);
        // }
        // if (t !== undefined && t !== null && t !== "") {
        //     params.set("type", t);
        // }

        getSmartFolderListAPI(
            params,
            onListSuccess,
            onListError,
            onListDone,
            onUnauthorized
        );
    }

    // Function resets the filter state to its default state.
    const onClearFilterClick = (e) => {
        // setType(0);
        // setStatus(1);
        // setSortByValue(DEFAULT_ASSISTANT_LIST_SORT_BY_VALUE);
    }


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
        <div class="container">
            <section class="section">

                {/* Desktop Breadcrumbs */}
                <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                    <ul className="">
                        <li className=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                        <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;Smart Folders</Link></li>
                    </ul>
                </nav>

                {/* Mobile Breadcrumbs */}
                <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                    <ul>
                        <li className="">
                            <Link to="/dashboard" aria-current="page">
                                <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Page Title */}
                <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;Smart Folders</h1>
                <hr />

                {/* Page Menu Options */}
                <section className="hero ">
                    <div className="hero-body has-text-centered">
                        <div className="container">
                            <div className="columns is-vcentered">
                                <div className="column">
                                    <BubbleLink
                                        title={`Add`}
                                        subtitle={`Add a new folder`}
                                        faIcon={faPlus}
                                        url={`/smart-folders/add`}
                                        bgColour={`has-background-danger-dark`}
                                    />
                                </div>
                                <div className="column">
                                    <BubbleLink
                                        title={`Search`}
                                        subtitle={`Search all files`}
                                        faIcon={faSearch}
                                        url={`/smart-folderss/search`}
                                        bgColour={`has-background-success-dark`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Page Content */}
                <nav class="box" style={{ borderRadius: "20px"}}>

                    {/* Title + Options */}
                    <div class="columns">
                        <div class="column">
                            <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;List</h1>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <div className="has-background-white-bis" style={{borderRadius:"15px", padding:"20px"}}>
                        <div className="columns is-12">
                            <div className="column is-half">
                                <h1 className="subtitle is-5 is-underlined"><FontAwesomeIcon className="fas" icon={faFilter} />&nbsp;Filtering & Sorting</h1>
                            </div>
                            <div className="column is-half has-text-right">
                                <Link onClick={onClearFilterClick}>
                                    <FontAwesomeIcon className="mdi" icon={faFilterCircleXmark} />&nbsp;Clear Filter
                                </Link>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <FormSelectField
                                    label="Status"
                                    name="status"
                                    placeholder="Pick status"
                                    selectedValue={status}
                                    helpText=""
                                    onChange={(e)=>setStatus(parseInt(e.target.value))}
                                    options={ASSISTANT_STATUS_FILTER_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                            <div className="column">
                                <FormSelectField
                                    label="Type"
                                    name="type"
                                    placeholder="Pick assistant type"
                                    selectedValue={type}
                                    helpText=""
                                    onChange={(e)=>setType(parseInt(e.target.value))}
                                    options={ASSISTANT_TYPE_OF_FILTER_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                            <div className="column">
                                <FormSelectField
                                    label="Sort by"
                                    name="sortByValue"
                                    placeholder="Pick sorting"
                                    selectedValue={sortByValue}
                                    helpText=""
                                    onChange={(e)=>setSortByValue(e.target.value)}
                                    options={ASSISTANT_SORT_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Contents */}
                    {isFetching
                        ?
                        <PageLoadingContent displayMessage={"Loading..."} />
                        :
                        <>
                            <FormErrorBox errors={errors} />
                            {listData && listData.results && (listData.results.length > 0 || previousCursors.length > 0)
                                ?
                                <div className="container">
                                    <div className="columns">
                                    {listData.results.map(function(datum, i){
                                        return (
                                            <div className="column is-6">
                                                <div className="card">
                                                    <div className="card-image has-background-info">
                                                        <div className="has-text-centered" style={{padding:"60px"}}>
                                                            {datum.subCategory === SMART_FOLDER_BUSINESS_SUB_CATEGORY_GOVERNMENT_CANADA && <FontAwesomeIcon className="fas" icon={faUniversity} style={{ color: 'white', fontSize: '9rem' }} />}
                                                        {/*
                                                        , SMART_FOLDER_PERSONAL_SUB_CATEGORY_PROOF_OF_PURCHASE, SMART_FOLDER_PERSONAL_SUB_CATEGORY_HOME_OWNERSHIP
                                                        */}
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="media">

                                                          <div className="media-content">
                                                            <p className="title is-3">{datum.name}</p>
                                                          </div>
                                                        </div>

                                                        <div className="content">
                                                            Begin uploading, sharing or reviewing previous uploaded government related documents by clicking below:
                                                            <br />
                                                            <br />
                                                        </div>
                                                    </div>
                                                    <footer className="card-footer">
                                                        <Link to={`/smart-folder/${datum.id}`} className="card-footer-item button is-primary is-medium">
                                                           View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowCircleRight} />
                                                        </Link>
                                                    </footer>
                                                </div>
                                            </div>

                                        );
                                    })}
                                    </div>
                                </div>
                                :
                                <section className="hero is-medium has-background-white-ter">
                                    <div className="hero-body">
                                        <p className="title">
                                            <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Smart Folders
                                        </p>
                                        <p className="subtitle">
                                            No smart folders. <b><Link to="/smart-folders/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first smart folder.
                                        </p>
                                    </div>
                                </section>
                            }
                        </>
                    }
                </nav>
            </section>
        </div>
    );
}

export default CustomerSmartFolderList;
