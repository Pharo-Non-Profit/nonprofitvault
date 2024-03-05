import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getUserDetailAPI } from "../../../API/User";
import FormErrorBox from "../../Reusable/FormErrorBox";
import SelectTextFormatter from "../../Reusable/EveryPage/SelectTextFormatter";
import CheckboxTextFormatter from "../../Reusable/EveryPage/CheckboxTextFormatter";
import EmailTextFormatter from "../../Reusable/EveryPage/EmailTextFormatter";
import PhoneTextFormatter from "../../Reusable/EveryPage/PhoneTextFormatter";
import RadioTextFormatter from "../../Reusable/EveryPage/RadioTextFormatter";
import DateTextFormatter from "../../Reusable/EveryPage/DateTextFormatter";
import DateTimeTextFormatter from "../../Reusable/EveryPage/DateTimeTextFormatter";
import TagsTextFormatter from "../../Reusable/EveryPage/TagsTextFormatter";
import URLTextFormatter from "../../Reusable/EveryPage/URLTextFormatter";
import AlertBanner from "../../Reusable/EveryPage/AlertBanner";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { addUserState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../AppState";
import {
    USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS,
    USER_TYPE_OF_FILTER_OPTIONS,
    USER_ORGANIZATION_TYPE_OPTIONS,
    GENDER_OPTIONS_WITH_EMPTY_OPTION
} from "../../../Constants/FieldOptions";


function AdminUserDetailFull() {
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
                                <p className="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Detail</p>
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
                                            <li>
                                                <Link to={`/admin/user/${user.id}`}>Summary</Link>
                                            </li>
                                            <li className="is-active">
                                                <Link><strong>Detail</strong></Link>
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
                                                        selectedValue={user.type}
                                                        options={USER_TYPE_OF_FILTER_OPTIONS}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>First Name:</th>
                                    			<td>{user.firstName}</td>
                                    		</tr>
                                            <tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>Last Name:</th>
                                    			<td>{user.lastName}</td>
                                    		</tr>
                                            <tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>Date of Birth:</th>
                                    			<td>
                                                    {user.birthDate
                                                        ?
                                                        <DateTextFormatter value={user.birthDate} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                    		</tr>
                                            <tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>Gender:</th>
                                    			<td>
                                                    {user.gender
                                                        ?
                                                        <>
                                                            <SelectTextFormatter
                                                                selectedValue={user.gender}
                                                                options={GENDER_OPTIONS_WITH_EMPTY_OPTION}
                                                            />
                                                            {user.gender === 1 && <>
                                                                &nbsp;-&nbsp;{user.genderOther}
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
                                                    {user.description
                                                        ?
                                                        user.description
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                    		</tr>
                                            <tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>Tags:</th>
                                    			<td>
                                                    {user.tags && user.tags.length > 0
                                                        ?
                                                        <TagsTextFormatter tags={user.tags} />
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
                                    {user.type === COMMERCIAL_CUSTOMER_TYPE_OF_ID &&
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
                                                    <td>{user.organizationName}</td>
                                                </tr>
                                                <tr>
                                                    <th className="has-background-light" style={{width: "30%"}}>Company Type:</th>
                                                    <td>
                                                        <SelectTextFormatter
                                                            selectedValue={user.organizationType}
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
                                                    {user.email
                                                        ?
                                                        <EmailTextFormatter value={user.email} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                    		</tr>
                                    		<tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>I agree to receive electronic email:</th>
                                    			<td><CheckboxTextFormatter checked={user.isOkToEmail} /></td>
                                    		</tr>
                                    		<tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>Phone:</th>
                                    			<td>
                                                    {user.phone
                                                        ?
                                                        <PhoneTextFormatter value={user.phone} />
                                                        :
                                                        <>-</>
                                                    }
                                                </td>
                                    		</tr>
                                            <tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>Phone Type:</th>
                                    			<td>
                                    				<SelectTextFormatter
                                    					selectedValue={user.phoneType}
                                    					options={USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    				/>
                                    			</td>
                                    		</tr>
                                    		{user.otherPhone &&
                                    			<>
                                    				<tr>
                                    					<th className="has-background-light" style={{width: "30%"}}>Other Phone (Optional):</th>
                                    					<td>
                                                            {user.otherPhone
                                                                ?
                                                                <PhoneTextFormatter value={user.otherPhone} />
                                                                :
                                                                <>-</>
                                                            }
                                                        </td>
                                    				</tr>
                                    				<tr>
                                    					<th className="has-background-light" style={{width: "30%"}}>Other Phone Type (Optional):</th>
                                    					<td>
                                    						<SelectTextFormatter
                                    							selectedValue={user.otherPhoneType}
                                    							options={USER_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    						/>
                                    					</td>
                                    				</tr>
                                    			</>
                                    		}
                                    		<tr>
                                    			<th className="has-background-light" style={{width: "30%"}}>I agree to receive texts to my phone:</th>
                                    			<td><CheckboxTextFormatter checked={user.isOkToText} /></td>
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
                                                        urlKey={user.fullAddressWithPostalCode}
                                                        urlValue={user.fullAddressUrl}
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
                                                    {user.isHowDidYouHearAboutUsOther
                                                        ?
                                                        user.howDidYouHearAboutUsOther
                                                        :
                                                        user.howDidYouHearAboutUsText
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Join date:</th>
                                                <td><DateTimeTextFormatter value={user.joinDate} /></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/*

                                        <DataDisplayRowHowHearAboutUsItem
                                            howDidYouHearAboutUsID={user.howDidYouHearAboutUsID}
                                        />

                                        {user.howDidYouHearAboutUsOther !== undefined && user.howDidYouHearAboutUsOther !== null && user.howDidYouHearAboutUsOther !== null &&
                                            <DataDisplayRowText
                                                label="How did you hear about us? (Other)"
                                                value={user.howDidYouHearAboutUsOther}
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
                                                <td><DateTimeTextFormatter value={user.createdAt} /></td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Created by:</th>
                                                <td>{user.createdByUserName}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Created from:</th>
                                                <td>{user.createdFromIpAddress}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Modified at:</th>
                                                <td><DateTimeTextFormatter value={user.modifiedAt} /></td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Modified by:</th>
                                                <td>{user.modifiedByUserName}</td>
                                            </tr>
                                            <tr>
                                                <th className="has-background-light" style={{width: "30%"}}>Modified from:</th>
                                                <td>{user.modifiedFromIpAddress}</td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default AdminUserDetailFull;
