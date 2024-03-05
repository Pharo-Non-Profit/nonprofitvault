import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownload, faCloudUpload, faChevronRight, faCloud, faFilterCircleXmark,faArrowLeft, faUniversity, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';



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
        {/*
            ----------------------
            DESKTOP OR TABLET VIEW
            ----------------------
        */}
        <div class="column is-hidden-mobile" key={`desktop_tablet_${fileClassification.id}`}>
            <hr />
            <div class="columns">
                <div class="column">
                    <h1 class="title is-4">
                        {fileClassification.label}
                    </h1>
                    <span className="has-text-grey">{fileClassification.short}</span>
                    <br />
                    <br />
                    {isMatch && <>
                        <span className="has-text-grey"><i>Filename:&nbsp;{objectFile.filename}</i></span>
                        <br />
                        <br />
                        <span className="has-text-grey"><i>Created:&nbsp;{objectFile.createdAt}</i></span>
                        <br />
                        <br />
                    </>}
                </div>
                <div class="column is-one-quarter">
                    <div class="buttons is-right">
                        {isMatch
                            ?
                            <>
                                <button onClick={(e)=>onDownloadDocumentClick(objectFile.id, objectFile.filename)} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faCloudDownload} />&nbsp;Download
                                </button>
                                <button onClick={(a,b)=>onDeleteDocumentClick(objectFile.id, fileClassification.label)} class="button is-small is-danger" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                                </button>
                            </>
                            :
                            <>
                                <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-small is-success" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faCloudUpload} />&nbsp;Upload
                                </button>
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>

        {/*
            ----------------------
                 MOBILE VIEW
            ----------------------
        */}
        <div class="is-hidden-tablet" key={`mobile_${fileClassification.id}`}>
            <div className="mb-5 content">
                <hr />
                <strong>{fileClassification.label}</strong>
                <br />
                <br />
                <span className="has-text-grey">{fileClassification.short}</span>
                <br />
                <br />
                {isMatch
                    ?
                    <>
                        <span className="has-text-grey"><i>Filename:&nbsp;{objectFile.filename}</i></span>
                        <br />
                        <br />
                        <span className="has-text-grey"><i>Created:&nbsp;{objectFile.createdAt}</i></span>
                        <br />
                        <br />
                        <button onClick={(e)=>onDownloadDocumentClick(objectFile.id)} class="button is-fullwidth-mobile is-primary is-small" type="button">
                            <FontAwesomeIcon className="mdi" icon={faCloudDownload} />&nbsp;Download
                        </button>
                        <br />
                        <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-fullwidth-mobile is-danger is-small" type="button">
                            <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
                        </button>
                    </>
                    :
                    <>
                        <button onClick={(a,b)=>onUploadDocumentClick(fileClassification.id, fileClassification.label)} class="button is-fullwidth-mobile is-success is-small" type="button">
                            <FontAwesomeIcon className="mdi" icon={faCloudUpload} />&nbsp;Upload
                        </button>
                    </>
                }
            </div>
        </div>
    </>);
}

export default SingleFile;
