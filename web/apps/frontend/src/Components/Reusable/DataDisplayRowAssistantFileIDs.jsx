import React, { useState, useEffect } from "react";
import { getAssistantFileSelectOptionListAPI } from "../../API/AssistantFile";
import { getSelectedOptions } from "../../Helpers/selectHelper";

function DataDisplayRowAssistantFileIDs(props) {

    ////
    //// Props.
    ////

    const {
        label="Assistant Files (Optional)",
        assistantFiles=[],
        helpText=""
    } = props;

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [assistantFileOptions, setAssistantFileOptions] = useState([]);
    const [selectedAssistantFileOptions, setSelectedAssistantFileOptions] = useState([]);

    ////
    //// API.
    ////

    function onSuccess(response){
        // STEP 1: Convert the API responses to be saved.

        // console.log("onAssistantFileSelectOptionsSuccess: Starting...");
        let b = [
            // {"value": "", "label": "Please select"},
            ...response
        ]

        // STEP 2: Save assistantFile options.
        setAssistantFileOptions(b);

        // STEP 3: Get all the selected options.
        const so = getSelectedOptions(b, assistantFiles);

        // For debugging purposes only.
        console.log("assistantFileOptions:", b);
        console.log("assistantFiles:", assistantFiles);
        console.log("so:", so);

        // STEP 4: Save the selected assistantFile options.
        setSelectedAssistantFileOptions(so);
    }

    function onError(apiErr) {
        // console.log("onAssistantFileSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onDone() {
        // console.log("onAssistantFileSelectOptionsDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getAssistantFileSelectOptionListAPI(
                onSuccess,
                onError,
                onDone
            );
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
                    {selectedAssistantFileOptions && selectedAssistantFileOptions.map(function(datum, i){
                        return <span className="assistantFile is-success mr-2 mb-2">{datum.label}</span>;
                    })}
                </p>
                {helpText !== undefined && helpText !== null && helpText !== "" && <p className="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowAssistantFileIDs;
