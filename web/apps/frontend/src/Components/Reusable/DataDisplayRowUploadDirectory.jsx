import React, { useState, useEffect } from "react";


function DataDisplayRowUploadDirectorys(props) {

    ////
    //// Props.
    ////

    const {
        label="Upload Directories (Optional)",
        directories=[],
        helpText=""
    } = props;


    useEffect(() => {
        let mounted = true;

        if (mounted) {
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    return (
        <div className="field pb-4">
            <label className="label">{label}</label>
            <div className="control">
                <p>
                    {directories && directories.map(function(datum, i){
                        return <span className="tag is-success mr-2 mb-2">{datum.name}</span>;
                    })}
                </p>
                {helpText !== undefined && helpText !== null && helpText !== "" && <p className="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowUploadDirectorys;
