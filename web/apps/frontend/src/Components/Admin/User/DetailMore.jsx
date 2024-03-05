import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingUser, faImage, faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis, faArchive, faBoxOpen, faTrashCan, faHomeUser } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getUserDetailAPI } from "../../../API/User";
import FormErrorBox from "../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../Reusable/DataDisplayRowText";
import DataDisplayRowSelect from "../../Reusable/DataDisplayRowSelect";
import AlertBanner from "../../Reusable/EveryPage/AlertBanner";
import BubbleLink from "../../Reusable/EveryPage/BubbleLink";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { addUserState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../AppState";
import { USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, USER_TYPE_OF_FILTER_OPTIONS, USER_ORGANIZATION_TYPE_OPTIONS } from "../../../Constants/FieldOptions";


function AdminUserDetailMore() {
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

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setUser(response);
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
            getUserDetailAPI(
                cid,
                onSuccess,
                onError,
                onDone,onUnauthorized
            );
        }

        return () => { mounted = false; }
    }, [cid]);

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

                    {/* Page */}
                    <nav className="box">

                        {/* Title + Options */}
                        {user && <div className="columns">
                            <div className="column">
                                <p className="title is-4">More&nbsp;<FontAwesomeIcon className="fas" icon={faEllipsis} /></p>
                            </div>
                            <div className="column has-text-right">

                            </div>
                        </div>}

                        {/* <p className="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />

                                {user && <div className="container">

                                    {/* Tab Navigation */}
                                    <div className= "tabs is-medium is-size-7-mobile">
                                        <ul>
                                            <li>
                                                <Link to={`/admin/user/${user.id}`}>Summary</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${user.id}/detail`}>Detail</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${user.id}/threads`}>Threads</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${user.id}/comments`}>Comments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/user/${user.id}/attachments`}>ObjectFiles</Link>
                                            </li>
                                            <li className="is-active">
                                                <Link><strong>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></strong></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Page Menu Options */}
                                    <section className="hero ">
                                        <div className="hero-body has-text-centered">
                                            <div className="container">
                                                <div className="columns is-vcentered is-multiline">
                                                    {/*
                                                    <div className="column">
                                                        <BubbleLink
                                                            title={`Photo`}
                                                            subtitle={`Upload a photo of the user`}
                                                            faIcon={faImage}
                                                            url={`/admin/user/${cid}/avatar`}
                                                            bgColour={`has-background-danger-dark`}
                                                        />
                                                    </div>
                                                    */}
                                                    {user.status === 2
                                                        ?
                                                        <div className="column">
                                                            <BubbleLink
                                                                title={`Unarchive`}
                                                                subtitle={`Make user visible in list and search results`}
                                                                faIcon={faBoxOpen}
                                                                url={`/admin/user/${cid}/unarchive`}
                                                                bgColour={`has-background-success-dark`}
                                                            />
                                                        </div>
                                                        :
                                                        <div className="column">
                                                            <BubbleLink
                                                                title={`Archive`}
                                                                subtitle={`Make user hidden from list and search results`}
                                                                faIcon={faArchive}
                                                                url={`/admin/user/${cid}/archive`}
                                                                bgColour={`has-background-success-dark`}
                                                            />
                                                        </div>
                                                    }
                                                    {user.status === 1 && <>
                                                        {user.type === COMMERCIAL_CUSTOMER_TYPE_OF_ID
                                                            ?
                                                            <div className="column">
                                                                <BubbleLink
                                                                    title={`Downgrade`}
                                                                    subtitle={`Change user to become residential user`}
                                                                    faIcon={faHomeUser}
                                                                    url={`/admin/user/${cid}/downgrade`}
                                                                    bgColour={`has-background-info-dark`}
                                                                />
                                                            </div>
                                                            :
                                                            <div className="column">
                                                                <BubbleLink
                                                                    title={`Upgrade`}
                                                                    subtitle={`Change user to become business user`}
                                                                    faIcon={faBuildingUser}
                                                                    url={`/admin/user/${cid}/upgrade`}
                                                                    bgColour={`has-background-info-dark`}
                                                                />
                                                            </div>
                                                        }
                                                    </>}
                                                    {user.status === 1 &&<div className="column">
                                                        <BubbleLink
                                                            title={`Delete`}
                                                            subtitle={`Permanently delete this user and all associated data`}
                                                            faIcon={faTrashCan}
                                                            url={`/admin/user/${cid}/permadelete`}
                                                            bgColour={`has-background-danger`}
                                                        />
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Bottom Navigation */}
                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-fullwidth-mobile" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link>
                                        </div>
                                        <div className="column is-half has-text-right">

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

export default AdminUserDetailMore;
