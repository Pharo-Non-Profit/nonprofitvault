import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faRobot, faArrowCircleUp, faMessage, faChevronRight, faPlus, faPencil, faTimes, faBullhorn, faArrowUpRightFromSquare, faNewspaper, faWrench, faHardHat, faUserCircle, faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getDashboardAPI } from "../../../API/Gateway";
import FormErrorBox from "../../Reusable/FormErrorBox";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import DateTextFormatter from "../../Reusable/EveryPage/DateTextFormatter";
import DateTimeTextFormatter from "../../Reusable/EveryPage/DateTimeTextFormatter";
import PageLoadingContent from "../../Reusable/PageLoadingContent";


function AdminDashboard() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");

    ////
    //// API.
    ////



    ////
    //// Event handling.
    ////

    ////
    //// Misc.
    ////

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
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
                    <nav className="breadcrumb has-background-light p-4" aria-label="breadcrumbs">
                        <ul>
                            <li className="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</h1>
                            <hr />
                        </div>
                    </div>

                    {/* Modals */}


                    {/* Page Menu Options */}
                    {isFetching
                        ?
                        <PageLoadingContent displayMessage={"Loading..."} />
                        :
                        <>
                            <div className="container">
                                <FormErrorBox errors={errors} />
                                <section class="hero is-medium is-link">
                                  <div class="hero-body">
                                    <p class="title">
                                        <FontAwesomeIcon className="fas" icon={faRobot} />&nbsp;Programs
                                    </p>
                                    <p class="subtitle">
                                      Create or edit any of your program by clicking below:
                                      <br />
                                      <br />
                                      <Link to={"/admin/programs"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                      <br />
                                      <br />
                                      <Link to={"/admin/programs/add"}>Add&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                    </p>
                                  </div>
                                </section>


                                <section class="hero is-medium is-primary">
                                  <div class="hero-body">
                                    <p class="title">
                                        <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users
                                    </p>
                                    <p class="subtitle">
                                      Have a user? Use the following to lookup existing records:
                                      <br />
                                      <br />
                                      <Link to={"/admin/users"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                      <br />
                                      <br />
                                      <Link to={"/admin/users/add/step-1-search"}>Add&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                    </p>
                                  </div>
                                </section>

                                <section class="hero is-medium is-success">
                                  <div class="hero-body">
                                    <p class="title">
                                        <FontAwesomeIcon className="fas" icon={faFile} />&nbsp;My Files
                                    </p>
                                    <p class="subtitle">
                                       Manage the files that belong to your system.
                                      <br />
                                      <br />
                                      <Link to={"/admin/upload-directories"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                    </p>
                                  </div>
                                </section>

                {/*

                                <section class="hero is-medium is-info">
                                  <div class="hero-body">
                                    <p class="title">
                                        <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;All Users
                                    </p>
                                    <p class="subtitle">
                                      Manage all the users that belong to your system.
                                      <br />
                                      <br />
                                      <Link to={"/admin/users"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                    </p>
                                  </div>
                                </section>

                                {/* <section class="hero is-medium is-primary">
                                  <div class="hero-body">
                                    <p class="title">
                                      Store Owner/Manager
                                    </p>
                                    <p class="subtitle">
                                      Manage the Store Owner/Manager that belong to your store.
                                      <br />
                                      <br />
                                      <i>Coming soon</i>
                                    </p>
                                  </div>
                                </section> */}

                            </div>


                        </>
                    }


                </section>
            </div>
        </>
    );
}

export default AdminDashboard;
