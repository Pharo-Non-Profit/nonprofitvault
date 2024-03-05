import React from "react";
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
const { getCode } = require('country-list');

function FormPhoneField({
    label,
    name,
    placeholder,
    selectedCountry,
    selectePhoneNumber,
    errorText,
    validationText,
    helpText,
    onChange,
    disabled,
    maxWidth
}) {
    // Fix bug.
    const selectedCountryData = getCountries().find(country => country.name === selectedCountry);

    // DEVELOPERS NOTE:
    // https://github.com/country-regions/react-country-region-selector
    return (
        <div className="field pb-4">
            <label className="label">{label}</label>
            <div className="control" style={{maxWidth:maxWidth}}>
                <Input
                    country={selectedCountryData}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-black`}
                    value={selectePhoneNumber}
                    onChange={onChange}
                />
            </div>
            {helpText &&
                <p className="help">{helpText}</p>
            }
            {errorText &&
                <p className="help is-danger">{errorText}</p>
            }
        </div>
    );
}

export default FormPhoneField;
