//
// Category
//

export const SMART_FOLDER_CATEGORY_UNSPECIFIED = 1;
export const SMART_FOLDER_CATEGORY_BUSINESS = 2;
export const SMART_FOLDER_CATEGORY_PERSONAL = 3;

export const SMART_FOLDER_CATEGORY_OPTIONS = [
    { value: SMART_FOLDER_CATEGORY_BUSINESS, label: 'Business' },
    { value: SMART_FOLDER_CATEGORY_PERSONAL, label: 'Personal' },
];

export const SMART_FOLDER_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...SMART_FOLDER_CATEGORY_OPTIONS
];

//
// Sub-Category
//

// ------ No Category ------
export const SMART_FOLDER_SUB_CATEGORY_UNSPECIFIED = 1;

// ------ Business Category ------
export const SMART_FOLDER_BUSINESS_SUB_CATEGORY_GOVERNMENT_CANADA = 2;

export const SMART_FOLDER_BUSINESS_SUB_CATEGORY_OPTIONS = [
    { value: SMART_FOLDER_BUSINESS_SUB_CATEGORY_GOVERNMENT_CANADA, label: 'Government Documents (Canada specific)' },
];

export const SMART_FOLDER_BUSINESS_SUB_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...SMART_FOLDER_BUSINESS_SUB_CATEGORY_OPTIONS
];

// ------ Personal Category ------
export const SMART_FOLDER_PERSONAL_SUB_CATEGORY_HOME_OWNERSHIP = 1000;
export const SMART_FOLDER_PERSONAL_SUB_CATEGORY_OPTIONS = [
    { value: SMART_FOLDER_PERSONAL_SUB_CATEGORY_HOME_OWNERSHIP, label: 'Home Ownership' },
];

export const SMART_FOLDER_PERSONAL_SUB_CATEGORY_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...SMART_FOLDER_PERSONAL_SUB_CATEGORY_OPTIONS
];
