import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import FormErrorBox from "../../../../../Reusable/FormErrorBox";
import FormInputField from "../../../../../Reusable/FormInputField";
import FormTextareaField from "../../../../../Reusable/FormTextareaField";
import FormRadioField from "../../../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../../../../Reusable/PageLoadingContent";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../../../../AppState";


function CustomerUploadFileSearch() {
    ////
    //// Global state.
    ////

    const [addCustomer, setAddCustomer] = useRecoilState(addCustomerState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        if (name === "" && description == "") {
            setErrors({
                message: "please enter a value"
            });
            return
        }
        setForceURL("/assistant-files/search-result?name="+name+"&description="+description);
    }

    ////
    //// API.
    ////

    // Nothing.

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
                            <li className=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className=""><Link to="/assistant-files" aria-current="page"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Assistant Files</Link></li>
                            <li className="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav className="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li className=""><Link to="/clients" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Assistant Files</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Assistant Files</h1>
                    <h4 className="subtitle is-4"><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search</h4>
                    <hr />

                    {/* Page */}
                    <nav className="box">
                        <p className="title is-4"><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search for existing client:</p>

                        <p className="pb-4 has-text-grey">Please enter one or more of the following fields to begin searching.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
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
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Description"
                                        name="description"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText=""
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <div className="columns pt-5">
                                        <div className="column is-half">
                                            <Link className="button is-medium is-fullwidth-mobile" to="/assistant-files"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Assistant Files</Link>
                                        </div>
                                        <div className="column is-half has-text-right">
                                            <button className="button is-medium is-primary is-fullwidth-mobile" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faSearch} />&nbsp;Search</button>
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

export default CustomerUploadFileSearch;
