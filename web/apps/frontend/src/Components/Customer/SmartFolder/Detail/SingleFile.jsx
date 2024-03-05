import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle, faCloudDownload, faCloudUpload, faChevronRight, faFilterCircleXmark,faArrowLeft, faUniversity, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';



function SingleFile({ currentUser, fileClassification, listData, onDownloadDocumentClick, onDeleteDocumentClick, onUploadDocumentClick }) {
    // Variable indicates if we've matched an `object_file` with this file classification.
    let isMatch = false;
    let objectFile = null;

    if (listData !== undefined && listData !== null && listData !== "") {
        if (listData.results !== undefined && listData.results !== null && listData.results !== "") {
            for (let i = 0; i < listData.results.length; i++) {
                objectFile = listData.results[i];
                if (objectFile.classification === fileClassification.id) {
                    isMatch = true;
                    break;
                }
            }
        }
    }

    return (<>
        <hr />
        <h1 class="title is-5">
            <div class="columns">
                <div class="column">
                    <u>{fileClassification.label}</u>
                </div>
                <div class="column has-text-right is-3">
                    {isMatch === false && <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-small is-success is-fullwidth-mobile" type="button">
                        <FontAwesomeIcon className="mdi" icon={faCloudUpload} /><span className="is-hidden-tablet">&nbsp;Upload</span>
                    </button>}
                </div>
            </div>
        </h1>
        <span className="has-text-grey">{fileClassification.short}</span>
        <br />
        <br />
        {isMatch
            &&
            <>
                <article class="message">
                    <div class="message-body">
                        <div class="columns">
                            <div class="column">
                                <i>{objectFile.filename}</i>
                            </div>
                            <div class="column has-text-right">
                                <button onClick={(e)=>onDownloadDocumentClick(objectFile.id, objectFile.filename)} class="button is-small is-primary is-fullwidth-mobile" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faCloudDownload} /><span className="is-hidden-tablet">&nbsp;Download</span>
                                </button>
                                &nbsp;
                                <button onClick={(a,b)=>onDeleteDocumentClick(objectFile.id, fileClassification.label)} class="button is-small is-danger is-fullwidth-mobile" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faTrashCan} /><span className="is-hidden-tablet">&nbsp;Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </>

        }
        <br />
    </>);
}

export default SingleFile;
