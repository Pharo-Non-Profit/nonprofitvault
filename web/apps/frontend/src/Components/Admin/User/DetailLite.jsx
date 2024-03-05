import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTags, faEnvelope, faTable, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getUserDetailAPI } from "../../../API/User";
import FormErrorBox from "../../Reusable/FormErrorBox";
import URLTextFormatter from "../../Reusable/EveryPage/URLTextFormatter";
import EmailTextFormatter from "../../Reusable/EveryPage/EmailTextFormatter";
import PhoneTextFormatter from "../../Reusable/EveryPage/PhoneTextFormatter";
import TagsTextFormatter from "../../Reusable/EveryPage/TagsTextFormatter";
import AlertBanner from "../../Reusable/EveryPage/AlertBanner";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import {
    topAlertMessageState,
    topAlertStatusState
} from "../../../AppState";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from "../../../Constants/App";
import {
    addUserState,
    ADD_CUSTOMER_STATE_DEFAULT
} from "../../../AppState";
import {
    USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS,
    USER_TYPE_OF_FILTER_OPTIONS,
    USER_ORGANIZATION_TYPE_OPTIONS
} from "../../../Constants/FieldOptions";


function AdminUserDetailLite() {
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
                onDone,
                onUnauthorized
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
                                <p className="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Summary</p>
                            </div>
                            <div className="column has-text-right">
                                <Link to={`/admin/user/${cid}/edit`} className="button is-small is-warning is-fullwidth-mobile" type="button" disabled={user.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                </Link>
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
                                            <li className="is-active">
                                                <Link><strong>Summary</strong></Link>
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
                                            <li>
                                                <Link to={`/admin/user/${user.id}/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="card">
                                        <div className="card-content">
                                            <div className="media">
                                                {/*
                                                <div className="media-left">
                                                    <figure className="image is-48x48">
                                                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                                                    </figure>
                                                </div>
                                                 */}
                                                <div className="media-content">
                                                    {user.type === 3 && <p className="title is-2 is-size-3-mobile">
                                                        <FontAwesomeIcon className="mdi" icon={faBuilding} />&nbsp;{user.organizationName}
                                                    </p>}
                                                    <p className="title is-3 is-size-4-mobile">
                                                        {user.type === 2 && <><FontAwesomeIcon className="mdi" icon={faHome} />&nbsp;</>}
                                                        {user.name}
                                                    </p>
                                                    <p className="subtitle is-5 is-size-6-mobile">
                                                        <URLTextFormatter
                                                            urlKey={user.fullAddressWithPostalCode}
                                                            urlValue={user.fullAddressUrl}
                                                            type={`external`}
                                                        />
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="content">
                                                <p>
                                                    <FontAwesomeIcon className="fas" icon={faEnvelope} />&nbsp;
                                                    {user.email
                                                        ?
                                                        <EmailTextFormatter value={user.email} />
                                                        :
                                                        <>-</>
                                                    }
                                                </p>
                                                <p>
                                                    <FontAwesomeIcon className="fas" icon={faSquarePhone} />&nbsp;
                                                    {user.phone
                                                        ?
                                                        <PhoneTextFormatter value={user.phone} />
                                                        :
                                                        <>-</>
                                                    }
                                                </p>
                                                <p>
                                                    <FontAwesomeIcon className="fas" icon={faTags} />&nbsp;Tag(s):&nbsp;
                                                    {user.tags && user.tags.length > 0
                                                        ?
                                                        <TagsTextFormatter tags={user.tags} />
                                                        :
                                                        <>-</>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="columns">
                                        <div className="column">

                                        </div>
                                        <div className="column">
                                        </div>
                                    </div>

{/*
                                    {user.avatarObjectUrl && <>
                                        <DataDisplayRowImage
                                            label="Profile Photo"
                                            objectURL={user.avatarObjectUrl}
                                            maxWidth={"640px"}
                                        />
                                    </>}

                                    <DataDisplayRowSelect
                                        label="Type"
                                        selectedValue={user.type}
                                        options={USER_TYPE_OF_FILTER_OPTIONS}
                                    />

                                    {user.type === COMMERCIAL_CUSTOMER_TYPE_OF_ID && <>
                                        <DataDisplayRowText
                                            label="Organization Name"
                                            value={user.organizationName}
                                        />
                                        <DataDisplayRowSelect
                                            label="Organization Type"
                                            selectedValue={user.organizationType}
                                            options={USER_ORGANIZATION_TYPE_OPTIONS}
                                        />
                                    </>}

                                    <DataDisplayRowText
                                        label="First Name"
                                        value={user.firstName}
                                    />

                                    <DataDisplayRowText
                                        label="Last Name"
                                        value={user.lastName}
                                    />

                                    <DataDisplayRowText
                                        label="Email"
                                        value={user.email}
                                        type="email"
                                    />

                                    <DataDisplayRowText
                                        label="Phone"
                                        value={user.phone}
                                        type="phone"
                                    />
*/}

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-fullwidth-mobile" to={`/admin/users`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <Link to={`/admin/user/${cid}/edit`} className="button is-warning is-fullwidth-mobile" disabled={user.status === 2}><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AdminUserDetailLite;
