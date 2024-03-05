import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormMultiSelectFieldForTags from "../../../Reusable/FormMultiSelectFieldForTags";
import FormSelectFieldForHowHearAboutUsItem from "../../../Reusable/FormSelectFieldForHowHear";
import FormAlternateDateField from "../../../Reusable/FormAlternateDateField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { addUserState, ADD_USER_STATE_DEFAULT } from "../../../../AppState";
import { GENDER_OPTIONS_WITH_EMPTY_OPTION } from "../../../../Constants/FieldOptions";
// import FormMultiSelectFieldForSkillSets from "../../../Reusable/FormMultiSelectFieldForSkillSets";


function AdminUserAddStep5() {
    ////
    //// Global state.
    ////

    const [addUser, setAddUser] = useRecoilState(addUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [tags, setTags] = useState(addUser.tags);
    const [howDidYouHearAboutUsID, setHowDidYouHearAboutUsID] = useState(addUser.howDidYouHearAboutUsID);
    const [isHowDidYouHearAboutUsOther, setIsHowDidYouHearAboutUsOther] = useState(addUser.isHowDidYouHearAboutUsOther);
    const [howDidYouHearAboutUsOther, setHowHearAboutUsItemOther] = useState(addUser.howDidYouHearAboutUsOther);
    const [birthDate, setBirthDate] = useState(addUser.birthDate);
    const [joinDate, setJoinDate] = useState(addUser.joinDate);
    const [gender, setGender] = useState(addUser.gender);
    const [genderOther, setGenderOther] = useState(addUser.genderOther);
    const [additionalComment, setAdditionalComment] = useState(addUser.additionalComment);
    // const [skillSets, setSkillSets] = useState([]);

    ////
    //// Event handling.
    ////


    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        let newErrors = {};
        let hasErrors = false;

        if (howDidYouHearAboutUsID === "") {
            newErrors["howDidYouHearAboutUsID"] = "missing value";
            hasErrors = true;
        } else {
            if (isHowDidYouHearAboutUsOther === true && howDidYouHearAboutUsOther === "") {
                newErrors["howDidYouHearAboutUsOther"] = "missing value";
                hasErrors = true;
            }
        }
        if (gender === undefined || gender === null || gender === 0) {
            newErrors["gender"] = "missing value";
            hasErrors = true;
        }

        if (hasErrors) {
            // Set the user based error validation.
            setErrors(newErrors);

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

            console.log("onSubmitClick: Ending with error.");
            return;
        }

        // Save to persistent storage.
        let modifiedAddUser = { ...addUser };
        modifiedAddUser.tags = tags;
        modifiedAddUser.howDidYouHearAboutUsID = howDidYouHearAboutUsID;
        modifiedAddUser.howDidYouHearAboutUsOther = howDidYouHearAboutUsOther;
        modifiedAddUser.gender = gender;
        modifiedAddUser.birthDate = birthDate;
        modifiedAddUser.joinDate = joinDate;
        modifiedAddUser.additionalComment = additionalComment;
        setAddUser(modifiedAddUser);

        console.log("onSubmitClick: Ending with success.");

        // Redirect to the next page.
        setForceURL("/admin/users/add/step-6");
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
                    <nav className="box has-background-light" >
                        <p className="subtitle is-5">Step 5 of 6</p>
                        <progress class="progress is-success" value="83" max="100">83%</progress>
                    </nav>

                    {/* Page */}
                    <nav className="box">

                        <p className="title is-4"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>

                        <p className="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                <div className="container">

                                    <FormMultiSelectFieldForTags
                                        label="Tags (Optional)"
                                        name="tags"
                                        placeholder="Pick tags"
                                        tags={tags}
                                        setTags={setTags}
                                        errorText={errors && errors.tags}
                                        helpText="Pick the tags you would like to associate with this cliient."
                                        isRequired={true}
                                        maxWidth="320px"
                                    />

                                    {/*
                                    <FormMultiSelectFieldForSkillSets
                                        label="Skill Sets (Optional)"
                                        name="skillSets"
                                        placeholder="Pick skill sets"
                                        skillSets={skillSets}
                                        setSkillSets={setSkillSets}
                                        errorText={errors && errors.skillSets}
                                        helpText="Pick the skill sets you would like to associate with this cliient."
                                        isRequired={true}
                                        maxWidth="320px"
                                    />
                                    */}

                                    <FormSelectFieldForHowHearAboutUsItem
                                        howDidYouHearAboutUsID={howDidYouHearAboutUsID}
                                        setHowDidYouHearAboutUsID={setHowDidYouHearAboutUsID}
                                        isHowDidYouHearAboutUsOther={isHowDidYouHearAboutUsOther}
                                        setIsHowDidYouHearAboutUsOther={setIsHowDidYouHearAboutUsOther}
                                        errorText={errors && errors.howDidYouHearAboutUsID}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="520px"
                                    />
                                    {isHowDidYouHearAboutUsOther === true &&
                                        <>
                                            <FormInputField
                                                label="How did you hear about us? (Other)"
                                                name="howDidYouHearAboutUsOther"
                                                placeholder="Text input"
                                                value={howDidYouHearAboutUsOther}
                                                errorText={errors && errors.howDidYouHearAboutUsOther}
                                                helpText=""
                                                onChange={(e)=>setHowHearAboutUsItemOther(e.target.value)}
                                                isRequired={true}
                                                maxWidth="100%"
                                            />
                                        </>
                                    }

                                    <FormSelectField
                                        label="Gender (Optional)"
                                        name="gender"
                                        placeholder="Pick"
                                        selectedValue={gender}
                                        errorText={errors && errors.gender}
                                        helpText=""
                                        onChange={(e)=>setGender(parseInt(e.target.value))}
                                        options={GENDER_OPTIONS_WITH_EMPTY_OPTION}
                                    />

                                    {gender === 1 && <FormInputField
                                        label="Gender (Other)"
                                        name="genderOther"
                                        placeholder="Text input"
                                        value={genderOther}
                                        errorText={errors && errors.genderOther}
                                        helpText=""
                                        onChange={(e)=>setGenderOther(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />}

                                    <FormAlternateDateField
                                        label="Birth Date (Optional)"
                                        name="birthDate"
                                        placeholder="Text input"
                                        value={birthDate}
                                        helpText=""
                                        onChange={(date)=>setBirthDate(date)}
                                        isRequired={true}
                                        maxWidth="180px"
                                        maxDate={new Date()}
                                    />

                                    <FormAlternateDateField
                                        label="Join Date (Optional)"
                                        name="joinDate"
                                        placeholder="Text input"
                                        value={joinDate}
                                        helpText="This indicates when the user joined the app"
                                        onChange={(date)=>setJoinDate(date)}
                                        isRequired={true}
                                        maxWidth="180px"
                                    />

                                    <FormTextareaField
                                        label="Additional Comment (Optional)"
                                        name="additionalComment"
                                        placeholder="Text input"
                                        value={additionalComment}
                                        errorText={errors && errors.additionalComment}
                                        helpText=""
                                        onChange={(e)=>setAdditionalComment(e.target.value)}
                                        isRequired={true}
                                        maxWidth="280px"
                                        helpText={"Max 638 characters"}
                                        rows={4}
                                    />

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-medium is-fullwidth-mobile" to="/admin/users/add/step-4"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <button className="button is-medium is-primary is-fullwidth-mobile" onClick={onSubmitClick}>Next&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></button>
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

export default AdminUserAddStep5
