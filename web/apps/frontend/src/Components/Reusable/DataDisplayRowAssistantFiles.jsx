import React, { useState, useEffect } from "react";

function DataDisplayRowAssistantFiles(props) {

    ////
    //// Props.
    ////

    const {
        label="Assistant Files (Optional)",
        assistantFiles=[],
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
                    {assistantFiles && assistantFiles.map(function(datum, i){
                        return <span className="assistantFile is-success mr-2 mb-2">{datum.name}</span>;
                    })}
                </p>
                {helpText !== undefined && helpText !== null && helpText !== "" && <p className="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowAssistantFiles;
