import React, { useState, useEffect } from "react";
import { startCase } from 'lodash';
import Select from 'react-select'

import { getAssistantFileSelectOptionListAPI } from "../../API/AssistantFile";
import { getSelectedOptions } from "../../Helpers/selectHelper";


function FormMultiSelectFieldForAssistantFiles({
    label="Assistant Files",
    name="assistantFiles",
    placeholder="Please select assistantFiles",
    tenantID,
    assistantFiles,
    setAssistantFiles,
    errorText,
    validationText,
    helpText,
    maxWidth,
    disabled=false })
{
    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [tagSelectOptions, setAssistantFileSelectOptions] = useState([]);

    ////
    //// API.
    ////

    function onAssistantFileSelectOptionsSuccess(response){
        // console.log("onAssistantFileSelectOptionsSuccess: Starting...");
        let b = [
            // {"value": "", "label": "Please select"},
            ...response
        ]
        setAssistantFileSelectOptions(b);
    }

    function onAssistantFileSelectOptionsError(apiErr) {
        // console.log("onAssistantFileSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onAssistantFileSelectOptionsDone() {
        // console.log("onAssistantFileSelectOptionsDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const onAssistantFilesChange = (e) => {
        // console.log("onAssistantFilesChange, e:",e); // For debugging purposes only.
        let values = [];
        for (let option of e) {
            // console.log("option:",option); // For debugging purposes only.
            values.push(option.value);
        }
        // console.log("onAssistantFilesChange, values:",values); // For debugging purposes only.
        setAssistantFiles(values);
    }


    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getAssistantFileSelectOptionListAPI(
                onAssistantFileSelectOptionsSuccess,
                onAssistantFileSelectOptionsError,
                onAssistantFileSelectOptionsDone
            );
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    let style = {maxWidth:maxWidth};
    if (errorText) {
        style = {maxWidth:maxWidth, borderColor:"red", borderStyle: "solid", borderWidth: "1px"};
    }
    return (
        <div className="field pb-4">
            <label className="label">{label}</label>
            <div className="control" style={style}>
                <Select isMulti
                    placeholder={placeholder}
                           name="assistantFiles"
                        options={tagSelectOptions}
                          value={getSelectedOptions(tagSelectOptions, assistantFiles)}
                    isClearable={false}
                       onChange={onAssistantFilesChange}
                     isDisabled={disabled}
                     isLoading={isFetching}
                />
            </div>
            {errorText &&
                <p className="help is-danger">{errorText}</p>
            }
            {helpText &&
                <p className="help">{helpText}</p>
            }
        </div>


    );
}

export default FormMultiSelectFieldForAssistantFiles;
