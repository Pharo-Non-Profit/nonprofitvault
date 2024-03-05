import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye, faBuilding, faEnvelope, faSquarePhone, faTable, faHome,
    faImage, faEllipsis, faRepeat, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faIdCard, faAddressBook, faContactCard, faChartPie, faKey
} from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getAccountDetailAPI } from "../../../API/Account";
import DateTimeTextFormatter from "../../Reusable/EveryPage/DateTimeTextFormatter";
import CheckboxTextFormatter from "../../Reusable/EveryPage/CheckboxTextFormatter";
import SelectTextFormatter from "../../Reusable/EveryPage/SelectTextFormatter";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputField from "../../Reusable/FormInputField";
import FormTextYesNoRow from "../../Reusable/FormRowTextYesNo";
import DataDisplayRowImage from "../../Reusable/DataDisplayRowImage";
import TagsTextFormatter from "../../Reusable/EveryPage/TagsTextFormatter";
import URLTextFormatter from "../../Reusable/EveryPage/URLTextFormatter";
import EmailTextFormatter from "../../Reusable/EveryPage/EmailTextFormatter";
import PhoneTextFormatter from "../../Reusable/EveryPage/PhoneTextFormatter";
import DateTextFormatter from "../../Reusable/EveryPage/DateTextFormatter";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { EXECUTIVE_ROLE_ID, MANAGEMENT_ROLE_ID, FRONTLINE_ROLE_ID, ASSOCIATE_ROLE_ID, CUSTOMER_ROLE_ID } from "../../../Constants/App";
import {
    USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS,
    USER_TYPE_OF_FILTER_OPTIONS,
    USER_ORGANIZATION_TYPE_OPTIONS,
    GENDER_OPTIONS_WITH_EMPTY_OPTION
} from "../../../Constants/FieldOptions";


function AccountDetail() {
    ////
    ////
    ////

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
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onAccountDetailSuccess(response) {
        console.log("onAccountDetailSuccess: Starting...");
        setCurrentUser(response);
    }

    function onAccountDetailError(apiErr) {
        console.log("onAccountDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAccountDetailDone() {
        console.log("onAccountDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// BREADCRUMB
    ////

    const generateBreadcrumbItemLink = (currentUser) => {
        let dashboardLink;
        switch (currentUser.role) {
            case EXECUTIVE_ROLE_ID:
                dashboardLink = "/admin/dashboard";
                break;
            case MANAGEMENT_ROLE_ID:
                dashboardLink = "/admin/dashboard";
                break;
            case FRONTLINE_ROLE_ID:
                dashboardLink = "/admin/dashboard";
                break;
            case CUSTOMER_ROLE_ID:
                dashboardLink = "/dashboard";
                break;
            default:
                dashboardLink = "/501"; // Default or error handling
                break;
        }
        return dashboardLink;
    };

    const breadcrumbItems = {
        items: [
            { text: 'Dashboard', link: generateBreadcrumbItemLink(currentUser), isActive: false, icon: faGauge },
            { text: 'Account', link: '/account', icon: faUserCircle, isActive: true }
        ],
        mobileBackLinkItems: {
            link: generateBreadcrumbItemLink(currentUser),
            text: "Back to Dashboard",
            icon: faArrowLeft
        }
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
            getAccountDetailAPI(
                onAccountDetailSuccess,
                onAccountDetailError,
                onAccountDetailDone
            );
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL} />
    }

    return (
        <>
            <div className="container">
                <section className="section">

                    {/* Desktop Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={generateBreadcrumbItemLink(currentUser)} aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to={generateBreadcrumbItemLink(currentUser)} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Profile</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">

                        {/* Title + Options */}
                        {currentUser && <div className="columns">
                            <div className="column">
                                <p className="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Detail</p>
                            </div>
                            <div className="column has-text-right">
                                <Link to={`/account/edit`} className="button is-small is-warning is-fullwidth-mobile" type="button" disabled={currentUser.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />
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

                                {currentUser && <div className="container">

                                    {/* Tab Navigation */}
                                    <div className= "tabs is-medium is-size-7-mobile">
                                        <ul>
                                            <li className="is-active">
                                                <Link>Detail</Link>
                                            </li>
                                            <li>
                                                <Link to={`/account/2fa`}>2FA</Link>
                                            </li>
                                            <li>
                                                <Link to={`/account/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {/*
                                        ##########################
                                        Peronsal Information Table
                                        ##########################
                                    */}
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr className="has-background-black">
                                                <th className="has-text-white" colSpan="2">
                                                    Personal Information
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Type:</th>
                                                <td>
                                                    <SelectTextFormatter
                                                        selectedValue={currentUser.type}
                                                        options={USER_TYPE_OF_FILTER_OPTIONS}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>First Name:</th>
                                                <td>{currentUser.firstName}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Last Name:</th>
                                                <td>{currentUser.lastName}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Date of Birth:</th>
                                                <td>
                                                    {currentUser.birthDate
                                                        ?
                                                        <DateTextFormatter value={currentUser.birthDate} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Gender:</th>
                                                <td>
                                                    {currentUser.gender
                                                        ?
                                                        <>
                                                            <SelectTextFormatter
                                                                selectedValue={currentUser.gender}
                                                                options={GENDER_OPTIONS_WITH_EMPTY_OPTION}
                                                            />
                                                            {currentUser.gender === 1 && <>
                                                                &nbsp;-&nbsp;{currentUser.genderOther}
                                                            </>}
                                                        </>
                                                        :
                                                        <>-</>
                                                    }

                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Description:</th>
                                                <td>
                                                    {currentUser.description
                                                        ?
                                                        currentUser.description
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Tags:</th>
                                                <td>
                                                    {currentUser.tags && currentUser.tags.length > 0
                                                        ?
                                                        <TagsTextFormatter tags={currentUser.tags} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/*
                                        ##########################
                                        Company Information Table
                                        ##########################
                                    */}
                                    {currentUser.type === COMMERCIAL_CUSTOMER_TYPE_OF_ID &&
                                        <table className="table is-fullwidth">
                                            <thead>
                                                <tr className="has-background-black">
                                                    <th className="has-text-white" colSpan="2">
                                                        Company Information
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className="has-background-light" style={{width: "30%"}}>Company Name:</th>
                                                    <td>{currentUser.organizationName}</td>
                                                </tr>
                                                <tr>
                                                    <th className="has-background-light" style={{width: "30%"}}>Company Type:</th>
                                                    <td>
                                                        <SelectTextFormatter
                                                            selectedValue={currentUser.organizationType}
                                                            options={USER_ORGANIZATION_TYPE_OPTIONS}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }

                                    {/*
                                        ###################
                                        Contact Point Table
                                        ###################
                                    */}
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr className="has-background-black">
                                                <th className="has-text-white" colSpan="2">
                                                    Contact Point
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Email:</th>
                                                <td>
                                                    {currentUser.email
                                                        ?
                                                        <EmailTextFormatter value={currentUser.email} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>I agree to receive electronic email:</th>
                                                <td><CheckboxTextFormatter checked={currentUser.isOkToEmail} /></td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Phone:</th>
                                                <td>
                                                    {currentUser.phone
                                                        ?
                                                        <PhoneTextFormatter value={currentUser.phone} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Phone Type:</th>
                                                <td>
                                                    <SelectTextFormatter
                                                        selectedValue={currentUser.phoneType}
                                                        options={USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                                    />
                                                </td>
                                            </tr>
                                            {currentUser.otherPhone &&
                                                <>
                                                    <tr>
                                                        <th className="has-background-light" style={{width: "30%"}}>Other Phone (Optional):</th>
                                                        <td>
                                                            {currentUser.otherPhone
                                                                ?
                                                                <PhoneTextFormatter value={currentUser.otherPhone} />
                                                                :
                                                                <>-</>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="has-background-light" style={{width: "30%"}}>Other Phone Type (Optional):</th>
                                                        <td>
                                                            <SelectTextFormatter
                                                                selectedValue={currentUser.otherPhoneType}
                                                                options={USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                                            />
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>I agree to receive texts to my phone:</th>
                                                <td><CheckboxTextFormatter checked={currentUser.isOkToText} /></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/*
                                        ##########################
                                        Address Table
                                        ##########################
                                    */}
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr className="has-background-black">
                                                <th className="has-text-white" colSpan="2">
                                                    Address
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Location:</th>
                                                <td>
                                                    <URLTextFormatter
                                                        urlKey={currentUser.fullAddressWithPostalCode}
                                                        urlValue={currentUser.fullAddressUrl}
                                                        type={`external`}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/*
                                        ##########################
                                        Internal Metrics Table
                                        ##########################
                                    */}
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr className="has-background-black">
                                                <th className="has-text-white" colSpan="2">
                                                   Internal Metrics
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>How did they discover us?:</th>
                                                <td>
                                                    {currentUser.isHowDidYouHearAboutUsOther
                                                        ?
                                                        currentUser.howDidYouHearAboutUsOther
                                                        :
                                                        currentUser.howDidYouHearAboutUsText
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Join date:</th>
                                                <td><DateTimeTextFormatter value={currentUser.joinDate} /></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/*

                                        <DataDisplayRowHowHearAboutUsItem
                                            howDidYouHearAboutUsID={currentUser.howDidYouHearAboutUsID}
                                        />

                                        {currentUser.howDidYouHearAboutUsOther !== undefined && currentUser.howDidYouHearAboutUsOther !== null && currentUser.howDidYouHearAboutUsOther !== null &&
                                            <DataDisplayRowText
                                                label="How did you hear about us? (Other)"
                                                value={currentUser.howDidYouHearAboutUsOther}
                                            />
                                        }
                                    */}

                                    {/*
                                        ##########################
                                        System Table
                                        ##########################
                                    */}
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr className="has-background-black">
                                                <th className="has-text-white" colSpan="2">
                                                  System
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Created at:</th>
                                                <td><DateTimeTextFormatter value={currentUser.createdAt} /></td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Created by:</th>
                                                <td>{currentUser.createdByUserName}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Created from:</th>
                                                <td>{currentUser.createdFromIpAddress}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Modified at:</th>
                                                <td><DateTimeTextFormatter value={currentUser.modifiedAt} /></td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Modified by:</th>
                                                <td>{currentUser.modifiedByUserName}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Modified from:</th>
                                                <td>{currentUser.modifiedFromIpAddress}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-medium is-fullwidth-mobile" to={generateBreadcrumbItemLink(currentUser)}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <Link to={`/account/edit`} className="button is-medium is-warning is-fullwidth-mobile" disabled={currentUser.status === 2}><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AccountDetail;
