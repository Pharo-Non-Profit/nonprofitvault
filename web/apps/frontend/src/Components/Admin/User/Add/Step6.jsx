import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import deepClone from "../../../../Helpers/deepCloneUtility";
import { postUserCreateAPI} from "../../../../API/User";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../../Reusable/DataDisplayRowText";
import DataDisplayRowCheckbox from "../../../Reusable/DataDisplayRowCheckbox";
import DataDisplayRowRadio from "../../../Reusable/DataDisplayRowRadio";
import DataDisplayRowSelect from "../../../Reusable/DataDisplayRowSelect";
import DataDisplayRowTagIDs from "../../../Reusable/DataDisplayRowTagIDs";
import DataDisplayRowHowHearAboutUsItem from "../../../Reusable/DataDisplayRowHowHear";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { COMMERCIAL_USER_TYPE_OF_ID } from "../../../../Constants/App";
import { addUserState, ADD_USER_STATE_DEFAULT, topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import {
    USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS,
    USER_TYPE_OF_FILTER_OPTIONS,
    USER_ORGANIZATION_TYPE_OPTIONS,
    GENDER_OPTIONS_WITH_EMPTY_OPTION
} from "../../../../Constants/FieldOptions";


function AdminUserAddStep6() {
    ////
    //// Global state.
    ////

    const [addUser, setAddUser] = useRecoilState(addUserState);
    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        const payload = deepClone(addUser); // Make a copy of the read-only data.

        // Apply the following fixes to our payload.

        // Fix 1: Format join date.
        const joinDateObject = new Date(addUser.joinDate);
        const joinDateISOString = joinDateObject.toISOString();
        payload.joinDate = joinDateISOString;

        console.log("onSubmitClick: payload:", addUser);
        setFetching(false);
        setErrors({});
        postUserCreateAPI(
            payload,
            onSuccess,
            onError,
            onDone,
            onUnauthorized
        );
    }

    ////
    //// API.
    ////

    function onSuccess(response){
        // For debugging purposes only.
        console.log("onSuccess: Starting...");
        console.log(response);

        if (response === undefined || response === null || response === "") {
        console.log("onSuccess: exiting early");
            return;
        }

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("User created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onSuccess: Delayed for 2 seconds.");
            console.log("onSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Clear all data that staff inputed in this wizard.
        setAddUser(ADD_USER_STATE_DEFAULT);

        // Redirect the user to a new page.
        setForceURL("/admin/user/"+response.id);
    }

    function onError(apiErr) {
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDone() {
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
            setFetching(false);
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
                            <li className=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Users</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/admin/users" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Users</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Users</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New User</h4>
                    <hr />

                    {/* Progress Wizard*/}
                    <nav className="box has-background-success-light" >
                        <p className="subtitle is-5">Step 6 of 6</p>
                        <progress class="progress is-success" value="100" max="100">100%</progress>
                    </nav>

                    {/* Page */}
                    <nav className="box">

                        <p className="title is-4"><FontAwesomeIcon className="fas" icon={faQuestionCircle} />&nbsp;Are you ready to submit?</p>

                        <p className="pb-4 has-text-grey">Please carefully review the following user details and if you are ready click the <b>Submit</b> to complete.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                {addUser !== undefined && addUser !== null && addUser !== "" && <div className="container">
                                    <p className="title is-4 mt-2"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Contact&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<Link to="/admin/users/add/step-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></p>

                                    <DataDisplayRowSelect
                                        label="Type"
                                        selectedValue={addUser.type}
                                        options={USER_TYPE_OF_FILTER_OPTIONS}
                                    />
                                    {addUser.type === COMMERCIAL_USER_TYPE_OF_ID && <>
                                        <DataDisplayRowText
                                            label="Organization Name"
                                            value={addUser.organizationName}
                                        />
                                        <DataDisplayRowSelect
                                            label="Organization Type"
                                            selectedValue={addUser.organizationType}
                                            options={USER_ORGANIZATION_TYPE_OPTIONS}
                                        />
                                    </>}

                                    <DataDisplayRowText
                                        label="First Name"
                                        value={addUser.firstName}
                                    />

                                    <DataDisplayRowText
                                        label="Last Name"
                                        value={addUser.lastName}
                                    />

                                    <DataDisplayRowText
                                        label="Email"
                                        value={addUser.email}
                                        type="email"
                                    />

                                    <DataDisplayRowCheckbox
                                       label="I agree to receive electronic email"
                                       checked={addUser.isOkToEmail}
                                    />

                                    <DataDisplayRowText
                                        label="Phone"
                                        value={addUser.phone}
                                        type="phone"
                                    />

                                    <DataDisplayRowSelect
                                        label="Phone Type"
                                        selectedValue={addUser.phoneType}
                                        options={USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />

                                    <DataDisplayRowCheckbox
                                       label="I agree to receive texts to my phone"
                                       checked={addUser.isOkToText}
                                    />

                                    <DataDisplayRowText
                                        label="Other Phone (Optional)"
                                        value={addUser.otherPhone}
                                        type="phone"
                                    />

                                    {addUser.otherPhoneType !== 0 && <DataDisplayRowSelect
                                        label="Other Phone Type (Optional)"
                                        selectedValue={addUser.otherPhoneType}
                                        options={USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />}

                                    <p className="title is-4"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<Link to="/admin/users/add/step-5"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></p>

                                    <DataDisplayRowCheckbox
                                       label="Has shipping address different then billing address"
                                       checked={addUser.hasShippingAddress}
                                    />

                                    <div className="columns">
                                        <div className="column">
                                            {addUser.hasShippingAddress
                                                ? <p className="subtitle is-6">Billing Address</p>
                                                : <></>
                                            }

                                            <DataDisplayRowText
                                                label="Country"
                                                value={addUser.country}
                                            />

                                            <DataDisplayRowText
                                                label="Province/Territory"
                                                value={addUser.region}
                                            />

                                            <DataDisplayRowText
                                                label="City"
                                                value={addUser.city}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 1"
                                                value={addUser.addressLine1}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 2 (Optional)"
                                                value={addUser.addressLine2}
                                            />

                                            <DataDisplayRowText
                                                label="Postal Code)"
                                                value={addUser.postalCode}
                                            />
                                        </div>
                                        {addUser.hasShippingAddress &&<div className="column">
                                            <p className="subtitle is-6">Shipping Address</p>

                                            <DataDisplayRowText
                                                label="Name"
                                                value={addUser.shippingName}
                                            />

                                            <DataDisplayRowText
                                                label="Phone"
                                                value={addUser.shippingPhone}
                                                type="phone"
                                            />

                                            <DataDisplayRowText
                                                label="Country"
                                                value={addUser.shippingCountry}
                                            />

                                            <DataDisplayRowText
                                                label="Province/Territory"
                                                value={addUser.shippingRegion}
                                            />

                                            <DataDisplayRowText
                                                label="City"
                                                value={addUser.shippingCity}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 1"
                                                value={addUser.shippingAddressLine1}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 2 (Optional)"
                                                value={addUser.shippingAddressLine2}
                                            />

                                            <DataDisplayRowText
                                                label="Postal Code"
                                                value={addUser.shippingPostalCode}
                                            />
                                        </div>}
                                    </div>

                                    <p className="title is-4"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<Link to="/admin/users/add/step-6"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></p>

                                    <DataDisplayRowTagIDs
                                        tags={addUser.tags}
                                    />

                                    <DataDisplayRowHowHearAboutUsItem
                                        howDidYouHearAboutUsID={addUser.howDidYouHearAboutUsID}
                                    />

                                    {addUser.howDidYouHearAboutUsOther !== undefined && addUser.howDidYouHearAboutUsOther !== null && addUser.howDidYouHearAboutUsOther !== null &&
                                        <DataDisplayRowText
                                            label="How did you hear about us? (Other)"
                                            value={addUser.howDidYouHearAboutUsOther}
                                        />
                                    }

                                    <DataDisplayRowSelect
                                        label="Gender"
                                        selectedValue={addUser.gender}
                                        options={GENDER_OPTIONS_WITH_EMPTY_OPTION}
                                    />
                                    {addUser.gender === 1 && <DataDisplayRowText
                                        label="Gender (Other)"
                                        value={addUser.genderOther}
                                    />}

                                    <DataDisplayRowText
                                        label="Birth Date (Optional)"
                                        value={addUser.birthDate}
                                        type="date"
                                    />

                                    <DataDisplayRowText
                                        label="Join Date (Optional)"
                                        value={addUser.joinDate}
                                        type="date"
                                    />

                                    <DataDisplayRowText
                                        label="Additional Comment"
                                        value={addUser.additionalComment}
                                    />

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-medium is-fullwidth-mobile" to="/admin/users/add/step-5"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <button className="button is-medium is-success is-fullwidth-mobile" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Submit</button>
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

export default AdminUserAddStep6
