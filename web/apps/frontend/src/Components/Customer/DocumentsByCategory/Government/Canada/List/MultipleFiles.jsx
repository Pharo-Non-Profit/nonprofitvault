import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle, faCloudDownload, faCloudUpload, faChevronRight, faCloud, faFilterCircleXmark,faArrowLeft, faUniversity, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';



function MultipleFiles({ currentUser, fileClassification, listData, onDownloadDocumentClick, onDeleteDocumentClick, onUploadDocumentClick }) {


    // Variable indicates if we've matched related `object_file` files with this file classification.
    let objectFile = null;
    let matchedArr = [];

    if (listData !== undefined && listData !== null && listData !== "") {
        if (listData.results !== undefined && listData.results !== null && listData.results !== "") {
            for (let i = 0; i < listData.results.length; i++) {
                objectFile = listData.results[i];
                if (objectFile.classification === fileClassification.id) {
                    matchedArr.push(objectFile);
                }
            }
        }
    }

    return (<>
        <hr />
        <h1 class="title is-3">

            <div class="columns">
                <div class="column">
                    {matchedArr.length > 0
                        ?
                        <span className="has-text-success">
                            <FontAwesomeIcon className="mdi" icon={faCheckCircle} />&nbsp;
                        </span>
                        :
                        <span className="has-text-danger">
                            <FontAwesomeIcon className="mdi" icon={faTimesCircle} />&nbsp;
                        </span>
                    }
                    <u>{fileClassification.label}</u>
                </div>
                <div class="column has-text-right is-3">
                    <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-small is-success is-fullwidth-mobile" type="button">
                        <FontAwesomeIcon className="mdi" icon={faCloudUpload} />&nbsp;Upload
                    </button>
                </div>
            </div>

        </h1>
        <span className="has-text-grey">{fileClassification.short}</span>
        <br />
        <br />
        {matchedArr.length > 0
            &&
            <>
                {matchedArr.map(function(datum, i){
                    return (
                        <article class="message">
                            <div class="message-body">
                                <div class="columns">
                                    <div class="column">
                                        <i>{objectFile.filename}</i>
                                    </div>
                                    <div class="column has-text-right">
                                        <button onClick={(e)=>onDownloadDocumentClick(objectFile.id, objectFile.filename)} class="button is-small is-primary is-fullwidth-mobile" type="button">
                                            <FontAwesomeIcon className="mdi" icon={faCloudDownload} />&nbsp;Download
                                        </button>
                                        &nbsp;
                                        <button onClick={(a,b)=>onDeleteDocumentClick(objectFile.id, fileClassification.label)} class="button is-small is-danger is-fullwidth-mobile" type="button">
                                            <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </>
        }
        <br />
    </>);
}

export default MultipleFiles;
