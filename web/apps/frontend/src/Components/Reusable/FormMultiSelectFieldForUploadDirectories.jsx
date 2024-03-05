import React, { useState, useEffect } from "react";
import { startCase } from 'lodash';
import Select from 'react-select'

import { getUploadDirectorySelectOptionListAPI } from "../../API/UploadDirectory";
import { getSelectedOptions } from "../../Helpers/selectHelper";


function FormMultiSelectFieldForUploadDirectories({
    label="Upload Directories",
    name="UploadDirectories",
    placeholder="Please select upload directories",
    tenantID,
    uploadDirectories,
    setUploadDirectories,
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
    const [uploadDirectorySelectOptions, setUploadDirectorySelectOptions] = useState([]);

    ////
    //// API.
    ////

    function onUploadDirectorySelectOptionsSuccess(response){
        // console.log("onUploadDirectorySelectOptionsSuccess: Starting...");
        let b = [
            // {"value": "", "label": "Please select"},
            ...response
        ]
        setUploadDirectorySelectOptions(b);
    }

    function onUploadDirectorySelectOptionsError(apiErr) {
        // console.log("onUploadDirectorySelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onUploadDirectorySelectOptionsDone() {
        // console.log("onUploadDirectorySelectOptionsDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const onUploadDirectoriesChange = (e) => {
        // console.log("onUploadDirectoriesChange, e:",e); // For debugging purposes only.
        let values = [];
        for (let option of e) {
            // console.log("option:",option); // For debugging purposes only.
            values.push(option.value);
        }
        // console.log("onUploadDirectoriesChange, values:",values); // For debugging purposes only.
        setUploadDirectories(values);
    }


    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getUploadDirectorySelectOptionListAPI(
                onUploadDirectorySelectOptionsSuccess,
                onUploadDirectorySelectOptionsError,
                onUploadDirectorySelectOptionsDone
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
                           name="uploadDirectories"
                        options={uploadDirectorySelectOptions}
                          value={getSelectedOptions(uploadDirectorySelectOptions, uploadDirectories)}
                    isClearable={false}
                       onChange={onUploadDirectoriesChange}
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

export default FormMultiSelectFieldForUploadDirectories;
