/**
 *  The API web-services endpoints.
 */
const HTTP_API_SERVER =  process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN;

/**
 * Gateway
 */
export const NONPROFITVAULT_API_BASE_PATH = "/api/v1";
export const NONPROFITVAULT_VERSION_ENDPOINT = "version";
export const NONPROFITVAULT_LOGIN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/login";
export const NONPROFITVAULT_REGISTER_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/register";
export const NONPROFITVAULT_LOGOUT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/logout";
export const NONPROFITVAULT_EXECUTIVE_VISITS_TENANT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/executive-visit-tenant";
export const NONPROFITVAULT_DASHBOARD_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/dashboard";
export const NONPROFITVAULT_2FA_GENERATE_OTP_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/otp/generate";
export const NONPROFITVAULT_2FA_GENERATE_OTP_AND_QR_CODE_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/otp/generate-qr-code";
export const NONPROFITVAULT_2FA_VERIFY_OTP_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/otp/verify";
export const NONPROFITVAULT_2FA_VALIDATE_OTP_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/otp/validate";
export const NONPROFITVAULT_2FA_DISABLED_OTP_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/otp/disable";

/**
 * Account
 */
export const NONPROFITVAULT_ACCOUNT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/profile";
export const NONPROFITVAULT_ACCOUNT_CHANGE_PASSWORD_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/account/change-password";
export const NONPROFITVAULT_ACCOUNT_AVATAR_OPERATION_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/account/operation/avatar";

/**
 * Tenants
 */
export const NONPROFITVAULT_TENANTS_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/tenants';
export const NONPROFITVAULT_TENANT_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/tenant/{id}';

/**
 * Users
 */

export const NONPROFITVAULT_USERS_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users';
export const NONPROFITVAULT_USERS_COUNT_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users/count';
export const NONPROFITVAULT_USER_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/user/{id}';
export const NONPROFITVAULT_USER_ARCHIVE_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users/operation/archive';
export const NONPROFITVAULT_USER_CREATE_COMMENT_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users/operation/create-comment';
export const NONPROFITVAULT_USER_UPGRADE_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users/operation/upgrade';
export const NONPROFITVAULT_USER_DOWNGRADE_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users/operation/downgrade';
export const NONPROFITVAULT_USER_AVATAR_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/users/operation/avatar';

/**
 * Tags
 */
export const NONPROFITVAULT_TAGS_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/tags';
export const NONPROFITVAULT_TAG_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/tag/{id}';
export const NONPROFITVAULT_TAG_SELECT_OPTIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/tags/select-options";

/**
 * How Hear About Us Item
 */
export const NONPROFITVAULT_HOW_HEAR_ABOUT_US_ITEMS_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/how-hear-about-us-items';
export const NONPROFITVAULT_HOW_HEAR_ABOUT_US_ITEM_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/how-hear-about-us-item/{id}';
export const NONPROFITVAULT_HOW_HEAR_ABOUT_US_ITEM_SELECT_OPTIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/how-hear-about-us-items/select-options";
export const NONPROFITVAULT_HOW_HEAR_ABOUT_US_ITEM_SELECT_OPTIONS_PUBLIC_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/select-options/how-hear-about-us-items";

/**
 * Smart Folders
 */
export const NONPROFITVAULT_SMART_FOLDERS_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/smart-folders';
export const NONPROFITVAULT_SMART_FOLDER_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/smart-folder/{id}';
export const NONPROFITVAULT_SMART_FOLDER_SELECT_OPTIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/smart-folders/select-options";
export const NONPROFITVAULT_SMART_FOLDER_OPERATION_GENERATE_SHARABLE_LINK_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/smart-folders/operations/generate-shareable-link';

/**
 * ObjectFiles
 */
export const NONPROFITVAULT_OBJECT_FILES_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/object-files";
export const NONPROFITVAULT_OBJECT_FILE_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/object-file/{id}";
export const NONPROFITVAULT_OBJECT_FILE_PRESIGNED_URL_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/object-file/{id}/presigned-url";
export const NONPROFITVAULT_OBJECT_FILE_CONTENT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/object-file/{id}/content";


/**
 * Sharable Link
 */
export const NONPROFITVAULT_SHAREABLE_LINKS_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/shareable-links';
export const NONPROFITVAULT_SHAREABLE_LINK_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/shareable-link/{id}';
export const NONPROFITVAULT_SHAREABLE_LINK_SELECT_OPTIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/shareable-links/select-options";
export const NONPROFITVAULT_SHAREABLE_LINK_OPERATION_GENERATE_SHARABLE_LINK_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/shareable-links/operations/generate-shareable-link';
export const NONPROFITVAULT_PUBLIC_SHARABLE_LINK_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/public/shareable-link/{id}';


/**
 * Staff
 */

export const NONPROFITVAULT_STAFF_LIST_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/staffs';
export const NONPROFITVAULT_STAFF_DETAIL_API_ENDPOINT  = HTTP_API_SERVER + '/api/v1/staff/{id}'
export const NONPROFITVAULT_STAFF_COMMENT_LIST_API_URL = HTTP_API_SERVER + '/api/v1/staff-comments';
export const NONPROFITVAULT_STAFF_CREATE_COMMENT_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/staffs/operation/create-comment';
export const NONPROFITVAULT_STAFF_ADDRESS_UPDATE_API_URL = HTTP_API_SERVER + '/api/v1/staff/XXX/address';
export const NONPROFITVAULT_STAFF_ACCOUNT_UPDATE_API_URL = HTTP_API_SERVER + '/api/v1/staff/XXX/account';
export const NONPROFITVAULT_STAFF_METRICS_UPDATE_API_URL = HTTP_API_SERVER + '/api/v1/staff/XXX/metrics';
export const NONPROFITVAULT_STAFF_UPGRADE_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/staffs/operation/upgrade';
export const NONPROFITVAULT_STAFF_DOWNGRADE_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/staffs/operation/downgrade';
export const NONPROFITVAULT_STAFF_CHANGE_PASSWORD_OPERATION_API_URL = HTTP_API_SERVER + '/api/v1/staffs/operation/change-password';
export const NONPROFITVAULT_STAFF_AVATAR_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/staffs/operation/avatar';
export const NONPROFITVAULT_STAFF_ARCHIVE_OPERATION_API_ENDPOINT = HTTP_API_SERVER + '/api/v1/staffs/operation/archive';
export const NONPROFITVAULT_STAFF_PERMANENTLY_DELETE_OPERATION_API_URL = HTTP_API_SERVER + '/api/v1/staffs/operation/permanently-delete';
export const NONPROFITVAULT_STAFF_SELECT_OPTIONS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/staffs/select-options";

/**
 * Report
 */

export const NONPROFITVAULT_REPORT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/report/{reportID}";

/**
 * Comments
 */

export const NONPROFITVAULT_COMMENT_LIST_API_URL = HTTP_API_SERVER + '/api/v1/comments';


//
// Continue below ...
//


export const NONPROFITVAULT_FORGOT_PASSWORD_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/forgot-password";
export const NONPROFITVAULT_PASSWORD_RESET_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/password-reset";
export const NONPROFITVAULT_REFRESH_TOKEN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/refresh-token";
export const NONPROFITVAULT_REFRESH_TOKEN_API_URL = HTTP_API_SERVER + '/api/v1/refresh-token';
export const NONPROFITVAULT_PROFILE_API_URL = HTTP_API_SERVER + '/api/v1/profile';
export const NONPROFITVAULT_DASHBOARD_API_URL = HTTP_API_SERVER + '/api/v1/dashboard';
export const NONPROFITVAULT_NAVIGATION_API_URL = HTTP_API_SERVER + '/api/v1/navigation';
