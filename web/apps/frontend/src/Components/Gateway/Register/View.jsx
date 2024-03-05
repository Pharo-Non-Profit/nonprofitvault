import React, { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLegal, faChartPie, faIdCard, faContactCard, faAddressBook, faArrowRight, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { postRegisterAPI } from "../../../API/Gateway";
import deepClone from "../../../Helpers/deepCloneUtility";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormPhoneField from "../../Reusable/FormPhoneField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormSelectFieldForHowHearAboutUsItem from "../../Reusable/FormSelectFieldForHowHear";
import FormRegionField from "../../Reusable/FormRegionField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState, onHamburgerClickedState, currentUserState } from "../../../AppState";
import {
    ASSOCIATE_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, ASSOCIATE_ORGANIZATION_TYPE_OPTIONS_WITH_EMPTY_OPTIONS,
 } from "../../../Constants/FieldOptions";
 import { EXECUTIVE_ROLE_ID, MANAGEMENT_ROLE_ID, FRONTLINE_ROLE_ID, ASSOCIATE_ROLE_ID, CUSTOMER_ROLE_ID } from "../../../Constants/App";


function Register() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    // Page States
    const [forceURL, setForceURL] = useState("");
    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(true);

    // Form States
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailRepeated, setEmailRepeated] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState(0);
    const [otherPhone, setOtherPhone] = useState("");
    const [otherPhoneType, setOtherPhoneType] = useState(0);
    const [isOkToText, setIsOkToText] = useState(false);
    const [isOkToEmail, setIsOkToEmail] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");
    const [howDidYouHearAboutUsID, setHowDidYouHearAboutUsID] = useState("");
    const [isHowDidYouHearAboutUsOther, setIsHowDidYouHearAboutUsOther] = useState(false);
    const [howDidYouHearAboutUsOther, setHowHearAboutUsItemOther] = useState("");
    const [agreePromotionsEmail, setHasPromotionalEmail] = useState(true);
    const [agreeTOS, setAgreeTOS] = useState();

    ////
    //// Event handling.
    ////

    const onSubmit = (e) => {
        console.log("onSubmitClick: Beginning...");
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            email_repeated: emailRepeated,
            phone: phone,
            phone_type: phoneType,
            other_phone: otherPhone,
            other_phone_type:otherPhoneType,
            is_ok_to_text: isOkToText,
            is_ok_to_tmail: isOkToEmail,
            postal_code: postalCode,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city: city,
            region: region,
            country: country,
            password: password,
            password_repeated: passwordRepeated,
            how_did_you_hear_about_us_id: howDidYouHearAboutUsID,
            is_how_did_you_hear_about_us_other: isHowDidYouHearAboutUsOther,
            how_did_you_hear_about_us_other: howDidYouHearAboutUsOther,
            agree_promotions_email: agreePromotionsEmail,
            agree_tos: agreeTOS,
            agree_waiver: true,
            has_coupon_promotional_code: 2,
            coupon_promotional_code: "",
        };

        // Apply the following fixes to our payload.

        // // Fix 1: Format join date.
        // const joinDateObject = new Date(joinDate);
        // const joinDateISOString = joinDateObject.toISOString();
        // payload.joinDate = joinDateISOString;

        console.log("onSubmitClick: payload:", payload);
        setFetching(false);
        setErrors({});
        postRegisterAPI(
            payload,
            onSuccess,
            onError,
            onDone
        );
    }

    ////
    //// API
    ////

    function onSuccess(response){
        console.log("onSuccess: Starting...");

        // Save the data to local storage for persistance in this browser and
        // redirect the user to their respected dahsboard.
        setOnHamburgerClicked(false); // Set to `false` so the side menu does not load up on startup of app.
        if (response !== undefined && response !== null && response !== "") {
            // For debugging purposes only.
            console.log("onSuccess | user prefix:", response.user);

            // BUGFIX:
            try {
                response.tenantID = response.tenantId;
                response.roleID = response.roleId;
            } catch(err) {
                console.log("onSuccess | catch err:", err);
            }

            // For debugging purposes only.
            console.log("onSuccess | user postfix:", response.user);

            // Store in persistance storage in the browser.
            setCurrentUser(response.user);

            switch (response.user.role) {
                case EXECUTIVE_ROLE_ID:
                    setForceURL("/root/tenants");
                    break;
                case MANAGEMENT_ROLE_ID:
                    setForceURL("/admin/dashboard");
                    break;
                case FRONTLINE_ROLE_ID:
                    setForceURL("/admin/dashboard");
                    break;
                case CUSTOMER_ROLE_ID:
                    setForceURL("/dashboard");
                    break;
                default:
                    setForceURL("/501");
                    break;
            }
        }
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
    }

    ////
    //// Misc.
    ////

    // Do nothing.

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div className="container column is-12">
                <div className="section">
                    <section className="hero is-fullheight">
                        <div class="hero-body">
                            <div class="container">
                                <div class="columns is-centered">
                                    <div class="is-half-tablet">

                                        <div class="box is-rounded column">
                                            <form>
                                                <h1 className="title is-3 has-text-centered">Register</h1>
                                                <FormErrorBox errors={errors} />
                                                <p class="has-text-grey-light">Please fill out the following form to become registered. All the fields below are manditory.</p>
                                                <p>&nbsp;</p>

                                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Details</p>

                                                <FormInputField
                                                    label="First Name"
                                                    name="firstName"
                                                    placeholder="Text input"
                                                    value={firstName}
                                                    errorText={errors && errors.firstName}
                                                    helpText=""
                                                    onChange={(e)=>setFirstName(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Last Name"
                                                    name="lastName"
                                                    placeholder="Text input"
                                                    value={lastName}
                                                    errorText={errors && errors.lastName}
                                                    helpText=""
                                                    onChange={(e)=>setLastName(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Text input"
                                                    value={password}
                                                    errorText={errors && errors.password}
                                                    helpText=""
                                                    onChange={(e)=>setPassword(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Password Repeated"
                                                    name="passwordRepeated"
                                                    type="password"
                                                    placeholder="Text input"
                                                    value={passwordRepeated}
                                                    errorText={errors && errors.passwordRepeated}
                                                    helpText=""
                                                    onChange={(e)=>setPasswordRepeated(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Contact Information</p>

                                                <FormInputField
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Text input"
                                                    value={email}
                                                    errorText={errors && errors.email}
                                                    helpText=""
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Email Repeated"
                                                    name="emailRepeated"
                                                    type="emailRepeated"
                                                    placeholder="Text input"
                                                    value={emailRepeated}
                                                    errorText={errors && errors.emailRepeated}
                                                    helpText=""
                                                    onChange={(e)=>setEmailRepeated(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormCheckboxField
                                                    label="I agree to receive electronic email"
                                                    name="isOkToEmail"
                                                    checked={isOkToEmail}
                                                    errorText={errors && errors.isOkToEmail}
                                                    onChange={(e,x)=>setIsOkToEmail(!isOkToEmail)}
                                                    maxWidth="180px"
                                                />

                                                <FormPhoneField
                                                    label="Phone"
                                                    name="phone"
                                                    placeholder="Text input"
                                                    selectedCountry={country}
                                                    selectePhoneNumber={phone}
                                                    errorText={errors && errors.phone}
                                                    helpText=""
                                                    onChange={(ph)=>setPhone(ph)}
                                                    isRequired={true}
                                                    maxWidth="200px"
                                                />

                                                <FormSelectField
                                                    label="Phone Type"
                                                    name="phoneType"
                                                    placeholder="Pick"
                                                    selectedValue={phoneType}
                                                    errorText={errors && errors.phoneType}
                                                    helpText=""
                                                    onChange={(e)=>setPhoneType(parseInt(e.target.value))}
                                                    options={ASSOCIATE_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                                />

                                                <FormCheckboxField
                                                    label="I agree to receive texts to my phone"
                                                    name="isOkToText"
                                                    checked={isOkToText}
                                                    errorText={errors && errors.setIsOkToText}
                                                    onChange={(e,x)=>setIsOkToText(!isOkToText)}
                                                    maxWidth="180px"
                                                />

                                                <FormPhoneField
                                                    label="Other Phone (Optional)"
                                                    name="otherPhone"
                                                    placeholder="Text input"
                                                    selectedCountry={country}
                                                    selectePhoneNumber={otherPhone}
                                                    errorText={errors && errors.otherPhone}
                                                    helpText=""
                                                    onChange={(ph)=>setOtherPhone(ph)}
                                                    isRequired={true}
                                                    maxWidth="200px"
                                                />

                                                <FormSelectField
                                                    label="Other Phone Type (Optional)"
                                                    name="otherPhoneType"
                                                    placeholder="Pick"
                                                    selectedValue={otherPhoneType}
                                                    errorText={errors && errors.phootherPhoneTypeneType}
                                                    helpText=""
                                                    onChange={(e)=>setOtherPhoneType(parseInt(e.target.value))}
                                                    options={ASSOCIATE_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                                />

                                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>

                                                <FormCountryField
                                                    priorityOptions={["CA","US","MX"]}
                                                    label="Country"
                                                    name="country"
                                                    placeholder="Text input"
                                                    selectedCountry={country}
                                                    errorText={errors && errors.country}
                                                    helpText=""
                                                    onChange={(value)=>setCountry(value)}
                                                    isRequired={true}
                                                    maxWidth="160px"
                                                />

                                                <FormRegionField
                                                    label="Province/Territory"
                                                    name="region"
                                                    placeholder="Text input"
                                                    selectedCountry={country}
                                                    selectedRegion={region}
                                                    errorText={errors && errors.region}
                                                    helpText=""
                                                    onChange={(value)=>setRegion(value)}
                                                    isRequired={true}
                                                    maxWidth="280px"
                                                />

                                                <FormInputField
                                                    label="City"
                                                    name="city"
                                                    placeholder="Text input"
                                                    value={city}
                                                    errorText={errors && errors.city}
                                                    helpText=""
                                                    onChange={(e)=>setCity(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Address Line 1"
                                                    name="addressLine1"
                                                    placeholder="Text input"
                                                    value={addressLine1}
                                                    errorText={errors && errors.addressLine1}
                                                    helpText=""
                                                    onChange={(e)=>setAddressLine1(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Address Line 2 (Optional)"
                                                    name="addressLine2"
                                                    placeholder="Text input"
                                                    value={addressLine2}
                                                    errorText={errors && errors.addressLine2}
                                                    helpText=""
                                                    onChange={(e)=>setAddressLine2(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="380px"
                                                />

                                                <FormInputField
                                                    label="Postal Code"
                                                    name="postalCode"
                                                    placeholder="Text input"
                                                    value={postalCode}
                                                    errorText={errors && errors.postalCode}
                                                    helpText=""
                                                    onChange={(e)=>setPostalCode(e.target.value)}
                                                    isRequired={true}
                                                    maxWidth="80px"
                                                />

                                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>

                                                <FormSelectFieldForHowHearAboutUsItem
                                                    howDidYouHearAboutUsID={howDidYouHearAboutUsID}
                                                    setHowDidYouHearAboutUsID={setHowDidYouHearAboutUsID}
                                                    isHowDidYouHearAboutUsOther={isHowDidYouHearAboutUsOther}
                                                    setIsHowDidYouHearAboutUsOther={setIsHowDidYouHearAboutUsOther}
                                                    errorText={errors && errors.howDidYouHearAboutUsId}
                                                    helpText=""
                                                    isRequired={true}
                                                    maxWidth="520px"
                                                />

                                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faLegal} />&nbsp;Legalility</p>

                                                <FormCheckboxField
                                                    label={<>I agree to <Link to="/" target="_blank" rel="noreferrer">terms of service&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} /></Link> and <Link to="/" target="_blank" rel="noreferrer">privacy policy&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} /></Link></>}
                                                    name="agreeTOS"
                                                    checked={agreeTOS}
                                                    errorText={errors && errors.agreeTos}
                                                    onChange={(e)=>{setAgreeTOS(!agreeTOS)}}
                                                    maxWidth="180px"
                                                />

                                                <nav class="level">
                                                    <div class="level-left">
                                                        <div class="level-item">
                                                            <Link class="button is-link" to="/login"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Back</Link>
                                                        </div>
                                                    </div>
                                                    <div class="level-right">
                                                        <div class="level-item">
                                                            <button type="button" class="button is-primary" onClick={onSubmit}>
                                                                <FontAwesomeIcon icon={faCheckCircle} />&nbsp;Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </nav>
                                            </form>
                                        </div>
                                    </div>
                                    {/* End box */}
                                </div>
                            </div>
                            {/* End container */}
                        </div>
                        {/* End hero-body */}
                    </section>
                </div>
            </div>
        </>
    );
}

export default Register;
