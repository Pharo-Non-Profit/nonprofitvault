import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleRight, faMoneyBills, faUniversity, faArrowCircleUp, faMessage,
    faChevronRight, faPlus, faPencil, faTimes, faBullhorn,
    faArrowUpRightFromSquare, faNewspaper, faWrench, faHardHat, faUserCircle,
    faTasks, faGauge, faArrowRight, faUsers, faBarcode, faCloud
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getDashboardAPI } from "../../../API/Gateway";
import { getSmartFolderListAPI } from "../../../API/SmartFolder";
import FormErrorBox from "../../Reusable/FormErrorBox";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import DateTextFormatter from "../../Reusable/EveryPage/DateTextFormatter";
import DateTimeTextFormatter from "../../Reusable/EveryPage/DateTimeTextFormatter";
import PageLoadingContent from "../../Reusable/PageLoadingContent";


function CustomerDashboard() {

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
        <div class="container">
            <section class="section">
                {/* Desktop Breadcrumbs */}
                <nav class="breadcrumb has-background-light p-4" aria-label="breadcrumbs">
                    <ul>
                        <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                    </ul>
                </nav>

                {/* Page Title */}
                <h1 className="title is-2"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</h1>
                <hr />


                {/* Page Content */}
                <nav class="box" style={{ borderRadius: "20px"}}>
                    {/*
                    <div class="columns">
                        <div class="column">
                            <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</h1>
                        </div>
                    </div>
                    */}

                    <section class="hero is-medium is-link">
                      <div class="hero-body">
                        <p class="title">
                            <FontAwesomeIcon className="fas" icon={faCloud} />&nbsp;Smart Folders
                        </p>
                        <p class="subtitle">
                          Create or manage your smart folders by clicking below:
                          <br />
                          <br />
                          <Link to={"/smart-folders"}>View Smart Folders&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                          <br />
                          <br />
                          <Link to={"/smart-folders/add"}>Add&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                        </p>
                      </div>
                    </section>



                </nav>
            </section>
        </div>
    );
}

export default CustomerDashboard;
