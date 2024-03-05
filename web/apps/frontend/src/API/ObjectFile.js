import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    NONPROFITVAULT_OBJECT_FILES_API_ENDPOINT,
    NONPROFITVAULT_OBJECT_FILE_API_ENDPOINT,
    NONPROFITVAULT_OBJECT_FILE_PRESIGNED_URL_API_ENDPOINT,
    NONPROFITVAULT_OBJECT_FILE_CONTENT_API_ENDPOINT,
} from "../Constants/API";


export function getObjectFileListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);

    // The following code will generate the query parameters for the url based on the map.
    let aURL = NONPROFITVAULT_OBJECT_FILES_API_ENDPOINT;
    filtersMap.forEach(
        (value, key) => {
            let decamelizedkey = decamelize(key)
            if (aURL.indexOf('?') > -1) {
                aURL += "&"+decamelizedkey+"="+value;
            } else {
                aURL += "?"+decamelizedkey+"="+value;
            }
        }
    )

    axios.get(aURL).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Bugfixes.
        // console.log("getObjectFileListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.issueCoverDate = DateTime.fromISO(item.issueCoverDate).toLocaleString(DateTime.DATETIME_MED);
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    // console.log(item, index);
                }
            )
        }
        // console.log("getObjectFileListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postObjectFileCreateAPI(formdata, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);

    axios.post(NONPROFITVAULT_OBJECT_FILES_API_ENDPOINT, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
    }).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getObjectFileDetailAPI(attachmentID, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);
    axios.get(NONPROFITVAULT_OBJECT_FILE_API_ENDPOINT.replace("{id}", attachmentID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getObjectFilePresignedURLAPI(attachmentID, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);
    axios.get(NONPROFITVAULT_OBJECT_FILE_PRESIGNED_URL_API_ENDPOINT.replace("{id}", attachmentID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}


export function getObjectFileContentAPI(attachmentID, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);
    axios.get(NONPROFITVAULT_OBJECT_FILE_CONTENT_API_ENDPOINT.replace("{id}", attachmentID), { responseType: 'blob' })
    .then((successResponse) => {
        // Read the blob data as bytes
        const reader = new FileReader();
        reader.onload = () => {
            const bytes = new Uint8Array(reader.result);
            onSuccessCallback(bytes); // Pass bytes data to success callback
        };
        reader.onerror = (error) => {
            onErrorCallback(error); // Handle read error
        };
        reader.readAsArrayBuffer(successResponse.data); // Read blob data as array buffer
    })
    .catch((exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    })
    .then(onDoneCallback);
}


export function putObjectFileUpdateAPI(id, data, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);

    axios.put(NONPROFITVAULT_OBJECT_FILE_API_ENDPOINT.replace("{id}", id), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
    }).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function deleteObjectFileAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);
    axios.delete(NONPROFITVAULT_OBJECT_FILE_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}
