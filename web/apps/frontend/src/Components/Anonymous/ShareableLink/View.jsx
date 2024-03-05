import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownload, faTasks, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faBarcode, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import FormErrorBox from "../../Reusable/FormErrorBox";
import { getPublicShareableLinkDetailAPI } from "../../../API/ShareableLink";
import { getObjectFilePresignedURLAPI } from "../../../API/ObjectFile";
import { FILE_CLASSIFICATION_CANADA_MAP } from "../../../Constants/FileClassificationForCanada";


function AnonymousShareableLink() {
    // For debugging purposes only.
    console.log("REACT_APP_WWW_PROTOCOL:", process.env.REACT_APP_WWW_PROTOCOL);
    console.log("REACT_APP_WWW_DOMAIN:", process.env.REACT_APP_WWW_DOMAIN);
    console.log("REACT_APP_API_PROTOCOL:", process.env.REACT_APP_API_PROTOCOL);
    console.log("REACT_APP_API_DOMAIN:", process.env.REACT_APP_API_DOMAIN);

    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140
    const sharableLinkID = searchParams.get("q");

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [datum, setDatum] = useState("");

    ////
    //// API.
    ////

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setDatum(response);
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

    // --- All --- //

    const onUnauthorized = () => {
        setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    }

    ////
    //// Event handling.
    ////

    function onButtonClick(e) {

    }

    const onDownloadDocumentClick = (objectFileID, objectFileFilename) => {
        console.log(objectFileID, objectFileFilename);

        setErrors({});
        setFetching(true);

        getObjectFilePresignedURLAPI(
            objectFileID,
            (responseData) => { // ON SUCCESS
                console.log("getObjectFilePresignedURLAPI: Success: responseData:",responseData);

                // Reset any previous errors.
                setErrors({});

                // Create an anchor element
                const link = document.createElement('a');

                // Set the href attribute to the presigned URL
                link.href = responseData.presignedUrl;

                // Set the download attribute to specify the filename
                link.download = objectFileFilename; // Replace 'filename.ext' with the desired filename

                // Hide the anchor element
                link.style.display = 'none';

                // Append the anchor element to the document body
                document.body.appendChild(link);

                // Trigger a click event on the anchor element
                link.click();

                // Remove the anchor element from the document body
                document.body.removeChild(link);
            },
            (apiErr) => { // ON ERROR
                // Handle API errors
                setErrors(apiErr);
            },
            () => { // ON DONE
                // Turn off page refresh.
                setFetching(false);
            },
            onUnauthorized
        );
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getPublicShareableLinkDetailAPI(
                sharableLinkID,
                onSuccess,
                onError,
                onDone,
                onUnauthorized
            );
        }

        return () => mounted = false;
    }, [sharableLinkID]);

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
                        <div className="hero-body">
                            <div className="container">
                                <div className="columns is-centered">
                                    <div className="column is-half-tablet">
                                        <div className="box is-rounded">
                                            {/* Start Logo */}
                                            <nav className="level">
                                                <div className="level-item has-text-centered">
                                                    <figure className='image'>
                                                        <img src='/img/capsule-logo.png' style={{width:"256px"}} />
                                                    </figure>
                                                </div>
                                            </nav>
                                            {/* End Logo */}
                                            <form>
                                                <FormErrorBox errors={errors} />
                                                <h1 className="title is-1 has-text-centered">Shared Folder</h1>
                                                <h1 className="title is-3 has-text-centered">{datum.smartFolderName} By {datum.tenantName}</h1>
                                                {datum && <>
                                                    <div class="content">
                                                        {datum.objectFiles.map(function(objectFile, i){
                                                            return (
                                                                <>
                                                                    <article class="message">
                                                                        <div class="message-body">
                                                                            <div class="columns">
                                                                                <div class="column">
                                                                                    <i>{objectFile.filename}</i>
                                                                                </div>
                                                                                <div class="column is-3 has-text-right">
                                                                                    <button onClick={(e)=>onDownloadDocumentClick(objectFile.id, objectFile.filename)} class="button is-small is-primary is-fullwidth-mobile" type="button">
                                                                                        <FontAwesomeIcon className="mdi" icon={faCloudDownload} /><span className="is-hidden-tablet">&nbsp;Download</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </article>
                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                </>}


                                                {/*
                                                <Link className="button is-medium is-block is-fullwidth is-primary" type="button" to="/login">
                                                    Login <FontAwesomeIcon icon={faArrowRight} />
                                                </Link>
                                                */}
                                                {/*
                                                <br />
                                                <Link className="button is-medium is-block is-fullwidth is-info" type="button" to="/register" disabled={true}>
                                                    Register <FontAwesomeIcon icon={faArrowRight} />
                                                </Link>
                                                */}

                                            </form>
                                            <br />
                                            {/*<nav className="level">
                                                <div className="level-item has-text-centered">
                                                    <div>
                                                        <a href="https://github.com/Pharo-Non-Profit" className="is-size-7-tablet"><FontAwesomeIcon icon={faArrowLeft} /> Back Home</a>
                                                    </div>
                                                </div>
                                                <div className="level-item has-text-centered">

                                                    <div>
                                                        <Link to="/cpsrn-registry" className="is-size-7-tablet">NONPROFITVAULTRN Registry <FontAwesomeIcon icon={faArrowRight} /></Link>
                                                    </div>

                                                </div>
                                            </nav>*/}
                                        </div>
                                        {/* End box */}

                                        <div className="has-text-centered">
                                            <p>© 2024 Non-Profit Vault</p>
                                        </div>
                                        {/* End suppoert text. */}

                                    </div>
                                    {/* End Column */}
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

export default AnonymousShareableLink;
