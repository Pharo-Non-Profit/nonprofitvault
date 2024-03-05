import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPlus, faCloud, faEllipsis, faMoneyBills, faUniversity, faCodeBranch, faRobot, faHardHat, faUser, faQuestionCircle, faCogs, faUserTie, faChartBar, faCreditCard, faTags, faGraduationCap, faWrench, faBars, faBook, faRightFromBracket, faTachometer, faTasks, faSignOut, faFile, faUsers, faBuilding, faBarcode } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import {
    onHamburgerClickedState,
    currentUserState,
    taskItemActiveCountState,
    smartFolderListDataState
} from "../../AppState";
import {
    EXECUTIVE_ROLE_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    CUSTOMER_ROLE_ID
} from "../../Constants/App";


export default props => {
    ////
    //// Global State
    ////

    const [onHamburgerClicked ] = useRecoilState(onHamburgerClickedState);
    const [currentUser] = useRecoilState(currentUserState);
    const [taskItemActiveCount] = useRecoilState(taskItemActiveCountState);
    const [smartFolderListData] = useRecoilState(smartFolderListDataState);

    ////
    //// Local State
    ////

    const [showLogoutWarning, setShowLogoutWarning] = useState(false);

    ////
    //// Events
    ////

    // Do nothing.

    ////
    //// Rendering.
    ////

    //-------------//
    // CASE 1 OF 3 //
    //-------------//

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-successful",
        "/index",
        "/login",
        "/logout",
        "/verify",
        "/forgot-password",
        "/password-reset",
        "/root/dashboard",
        "/root/tenants",
        "/root/tenant"
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log(location.pathname, "===", ignorePathsArr[i], " EQUALS ", location.pathname === ignorePathsArr[i]);
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    //-------------//
    // CASE 2 OF 3 //
    //-------------//

    if (currentUser === null) {
        return (null);
    }

    //-------------//
    // CASE 3 OF 3 //
    //-------------//

    return (
        <>
            <div className={`modal ${showLogoutWarning ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Are you sure?</p>
                        <button className="delete" aria-label="close" onClick={(e)=>setShowLogoutWarning(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        You are about to log out of the system and you'll need to log in again next time. Are you sure you want to continue?
                    </section>
                    <footer className="modal-card-foot">
                        <Link className="button is-success" to={`/logout`}>Yes</Link>
                        <button className="button" onClick={(e)=>setShowLogoutWarning(false)}>No</button>
                    </footer>
                </div>
            </div>
            {/*
                -----
                STAFF
                -----
            */}
            {(currentUser.role === EXECUTIVE_ROLE_ID || currentUser.role === MANAGEMENT_ROLE_ID)  &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>
                    <nav className="level is-hidden-mobile">
                        <div className="level-item has-text-centered">
                            <figure className='image'>
                                <img src='/img/compressed-logo.png' style={{maxWidth:"200px"}} />
                            </figure>
                        </div>
                    </nav>
                    <aside className="menu p-4">
                        <p className="menu-label has-text-grey-light">
                            Staff
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/admin/dashboard" className={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </Link>
                            </li>
                            {/*<li>
                                <Link to="/admin/assistant-files" className={`has-text-grey-light ${location.pathname.includes("assistant-file") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Assistant Files
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/assistants" className={`has-text-grey-light ${location.pathname.includes("assistant") && !location.pathname.includes("file") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faRobot} />&nbsp;Assistants
                                </Link>
                            </li>*/}
                            {/*<li>
                                <Link to="/admin/programs" className={`has-text-grey-light ${location.pathname.includes("program") && !location.pathname.includes("categor") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faRobot} />&nbsp;Programs
                                </Link>
                            </li>*/}
                            <li>
                                <Link to="/admin/users" className={`has-text-grey-light ${location.pathname.includes("users") && !location.pathname.includes("file") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Users
                                </Link>
                            </li>
                        </ul>

                        <p className="menu-label has-text-grey-light">
                            Settings
                        </p>
                        <ul className="menu-list">
                            {/*<li>
                                <Link to="/admin/program-categories" className={`has-text-grey-light ${location.pathname.includes("program-categor") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faQuestionCircle} />&nbsp;Program Categories
                                </Link>
                            </li>*/}
                            <li>
                                <Link to="/admin/upload-directories" className={`has-text-grey-light ${location.pathname.includes("upload") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faFile} />&nbsp;My Uploads
                                </Link>
                            </li>
                        </ul>

                        <p className="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/account" className={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUser} />&nbsp;Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/help" className={`has-text-grey-light ${location.pathname.includes("help") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faQuestionCircle} />&nbsp;Help
                                </Link>
                            </li>
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} className={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
            {/*
                --------
                CUSTOMER
                --------
            */}
            {currentUser.role === CUSTOMER_ROLE_ID &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>
                    <nav className="level is-hidden-mobile">
                        <div className="level-item has-text-centered">
                            <figure className='image'>
                                <img src='/img/compressed-logo.png' style={{maxWidth:"200px"}} />
                            </figure>
                        </div>
                    </nav>
                    <aside className="menu p-4">
                        <p className="menu-label has-text-grey-light">
                            Home
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/dashboard" className={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </Link>
                            </li>
                        </ul>
                        <p className="menu-label has-text-grey-light">
                            Smart Folders
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/smart-folders" className={`has-text-grey-light ${location.pathname.includes("smart-folders") && !location.pathname.includes("add") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;List
                                </Link>
                                <li>
                                    <ul className="menu-list">
                                        {smartFolderListData && smartFolderListData.results && smartFolderListData.results.length > 0 && <>
                                            {smartFolderListData.results.map(function(datum, i){
                                                return (
                                                    <li>
                                                        <Link to={`/smart-folder/${datum.id}`} className={`has-text-grey-light ${location.pathname.includes(datum.id) && "is-active"}`}>
                                                            <FontAwesomeIcon className="fas" icon={faMoneyBills} />&nbsp;{datum.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </>}
                                        <li>
                                            <Link to="/smart-folders/add" className={`has-text-grey-light ${location.pathname.includes("smart-folders/add") && "is-active"}`}>
                                                <FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                        </ul>

                        <p className="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to="/account" className={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUser} />&nbsp;Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/help" className={`has-text-grey-light ${location.pathname.includes("help") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faQuestionCircle} />&nbsp;Help
                                </Link>
                            </li>
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} className={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
        </>
    );
}
