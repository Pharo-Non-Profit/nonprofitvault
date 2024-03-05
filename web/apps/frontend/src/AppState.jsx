import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  AtomEffect
} from 'recoil';
import { recoilPersist } from 'recoil-persist'
import {
    DEFAULT_USER_LIST_SORT_BY_VALUE,
    DEFAULT_ASSOCIATE_LIST_SORT_BY_VALUE,
    DEFAULT_USER_STATUS_FILTER_OPTION,
    DEFAULT_ORDER_LIST_SORT_BY_VALUE,
    DEFAULT_TASK_ITEM_LIST_SORT_BY_VALUE,
    DEFAULT_STAFF_LIST_SORT_BY_VALUE,
    DEFAULT_COMMENT_LIST_SORT_BY_VALUE
} from "./Constants/App";

import {
    USER_PHONE_TYPE_LANDLINE,
    USER_PHONE_TYPE_MOBILE,
    ASSOCIATE_PHONE_TYPE_LANDLINE,
    ASSOCIATE_PHONE_TYPE_MOBILE,
    STAFF_PHONE_TYPE_LANDLINE,
    STAFF_PHONE_TYPE_MOBILE,
} from "./Constants/App";


// Control whether the hamburer menu icon was clicked or not. This state is
// needed by 'TopNavigation' an 'SideNavigation' components.
export const onHamburgerClickedState = atom({
  key: 'onHamburgerClicked', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Control what message to display at the top as a banner in the app.
export const topAlertMessageState = atom({
  key: 'topBannerAlertMessage',
  default: "",
});

// Control what type of message to display at the top as a banner in the app.
export const topAlertStatusState = atom({
  key: 'topBannerAlertStatus',
  default: "success",
});

// https://github.com/polemius/recoil-persist
const { persistAtom } = recoilPersist()

export const currentUserState = atom({
  key: 'currentUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const currentOTPResponseState = atom({
  key: 'currentOTPResponse',
  default: null,
  effects_UNSTABLE: [persistAtom],
});


// ------------------------------------------------ Add ------------------------------------------------ //

export const ADD_USER_STATE_DEFAULT = {
    type: 0,
    organizationName: "",
    organizationType: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: USER_PHONE_TYPE_MOBILE,
    otherPhone: "",
    otherPhoneType: USER_PHONE_TYPE_LANDLINE,
    isOkToText: false,
    isOkToEmail: false,
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    country: "",
    hasShippingAddress: false,
    shippingName: "",
    shippingPhone: "",
    shippingCountry: "",
    shippingRegion: "",
    shippingCity: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingPostalCode: "",
    tags: [],
    comments: [],
    gender: 0,
    genderOther: "",
    joinDate: new Date(),
    birthDate: null,
    howDidYouHearAboutUsID: "",
    isHowDidYouHearAboutUsOther: false,
    howDidYouHearAboutUsOther: "",
    additionalComment: "",
    identifyAs: [],
};

export const addUserState = atom({
  key: 'addUser',
  default: ADD_USER_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_ASSOCIATE_STATE_DEFAULT = {
    type: 0,
    organizationName: "",
    organizationType: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: ASSOCIATE_PHONE_TYPE_MOBILE,
    otherPhone: "",
    otherPhoneType: ASSOCIATE_PHONE_TYPE_LANDLINE,
    isOkToText: false,
    isOkToEmail: false,
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    country: "",
    hasShippingAddress: false,
    shippingName: "",
    shippingPhone: "",
    shippingCountry: "",
    shippingRegion: "",
    shippingCity: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingPostalCode: "",
    tags: [],
    comments: [],
    gender: 0,
    genderOther: "",
    joinDate: new Date(),
    birthDate: null,
    howDidYouHearAboutUsID: "",
    isHowDidYouHearAboutUsOther: false,
    howDidYouHearAboutUsOther: "",
    additionalComment: "",
    skillSets: [],
    insuranceRequirements: [],
    hourlySalaryDesired: [],
    limitSpecial: "",
    duesDate: "",
    commercialInsuranceExpiryDate: "",
    autoInsuranceExpiryDate: "",
    wsibNumber:"",
    wsibInsuranceDate: "",
    policeCheck: "",
    taxId: "",
    driversLicenseClass: "",
    vehicleTypes: [],
    serviceFeeId: "",
    isServiceFeeOther: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactTelephone: "",
    emergencyContactAlternativeTelephone: "",
    description: "",
    preferredLanguage: "",
    identifyAs: [],
    isJobSeeker: "",
    statusInCountry: "",
    statusInCountryOther: "",
    countryOfOrigin: "",
    dateOfEntryIntoCountry: "",
    maritalStatus: "",
    maritalStatusOther: "",
    accomplishedEducation: "",
    accomplishedEducationOther: ""
};

export const addAssociateState = atom({
  key: 'addAssociate',
  default: ADD_ASSOCIATE_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_ORDER_STATE_DEFAULT = {
    customerID: "",
    startDate: null,
    isOngoing: 0,
    isHomeSupportService: 0,
    skillSets:[],
    additonalComment: "",
    tags:[],
};

export const addOrderState = atom({
  key: 'addUser',
  default: ADD_ORDER_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_TASK_ITEM_ASSIGN_ASSOCIATE_STATE_DEFAULT = {
    status: 0,
    comment: "",
    associateID: "",
    associateName: "",
    associatePhone: "",
    associateEmail: "",
    associateOrganizationName: "",
    associateContactsLast30Days: 0,
    associateWsibNumber: "",
    associateHourlySalaryDesired: 0,
    associateSkillSets: []
};

export const addTaskItemAssignAssociateState = atom({
  key: 'addTaskItemAssignAssociate',
  default: ADD_TASK_ITEM_ASSIGN_ASSOCIATE_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_TASK_ITEM_ORDER_COMPLETION_STATE_DEFAULT = {
    wasCompleted: 0, //0=unselected, 1=Yes, 2=No
    reason: 0,
    reasonOther: "",
    completionDate: null,
    reasonComment: "",
    closingReasonComment: "",

    hasInputtedFinancials: 0,
    invoicePaidTo: 0,
    paymentStatus: 0,
    completionDate: null,
    invoiceDate: null,
    invoiceIDs: "",
    invoiceQuotedLabourAmount: "",
    invoiceQuotedMaterialAmount: "",
    invoiceQuotedOtherCostsAmount: "",
    invoiceTotalQuoteAmount: "",
    invoiceLabourAmount: "",
    invoiceMaterialAmount: "",
    invoiceOtherCostsAmount: "",
    invoiceTaxAmount: "",
    invoiceTotalAmount: "",
    invoiceDepositAmount: "",
    invoiceAmountDue: "",
    invoiceServiceFeeID: "",
    invoiceServiceFeePercentage: 0,
    invoiceServiceFee: null,
    invoiceServiceFeeOther: "",
    isInvoiceServiceFeeOther: 0,
    invoiceServiceFeeAmount: "",
    invoiceServiceFeePaymentDate: "",
    invoiceActualServiceFeeAmountPaid: "",
    invoiceBalanceOwingAmount: "",
};

export const addTaskItemOrderCompletionState = atom({
  key: 'addTaskItemOrderCompletion',
  default: ADD_TASK_ITEM_ORDER_COMPLETION_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_TASK_ITEM_SURVEY_STATE_DEFAULT = {
    wasSurveyConducted: 0, //0=unselected, 1=Yes, 2=No
    noSurveyConductedReason: 0,
    noSurveyConductedReasonOther: "",
    comment: "",
    wasJobSatisfactory: 0,
    wasJobFinishedOnTimeAndOnBudget: 0,
    wasAssociatePunctual: 0,
    wasAssociateProfessional: 0,
    wouldCustomerReferOurOrganization: 0,
};

export const addTaskItemSurveyState = atom({
  key: 'addTaskItemSurvey',
  default: ADD_TASK_ITEM_SURVEY_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_STAFF_STATE_DEFAULT = {
    type: 0,
    organizationName: "",
    organizationType: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: STAFF_PHONE_TYPE_MOBILE,
    otherPhone: "",
    otherPhoneType: STAFF_PHONE_TYPE_LANDLINE,
    isOkToText: false,
    isOkToEmail: false,
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    country: "",
    hasShippingAddress: false,
    shippingName: "",
    shippingPhone: "",
    shippingCountry: "",
    shippingRegion: "",
    shippingCity: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingPostalCode: "",
    tags: [],
    comments: [],
    gender: 0,
    genderOther: "",
    joinDate: new Date(),
    birthDate: null,
    howDidYouHearAboutUsID: "",
    isHowDidYouHearAboutUsOther: false,
    howDidYouHearAboutUsOther: "",
    additionalComment: "",
    skillSets: [],
    insuranceRequirements: [],
    hourlySalaryDesired: [],
    limitSpecial: "",
    duesDate: "",
    commercialInsuranceExpiryDate: "",
    autoInsuranceExpiryDate: "",
    wsibNumber:"",
    wsibInsuranceDate: "",
    policeCheck: "",
    taxId: "",
    driversLicenseClass: "",
    vehicleTypes: [],
    serviceFeeId: "",
    isServiceFeeOther: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactTelephone: "",
    emergencyContactAlternativeTelephone: "",
    description: "",
    preferredLanguage: "",
    identifyAs: [],
};

export const addStaffState = atom({
  key: 'addStaff',
  default: ADD_STAFF_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

// ------------------------------------------------ Operations ------------------------------------------------ //

export const TRANSFER_ORDER_OPERATION_STATE_DEFAULT = {
    pickedAssociateID: "",
    pickedAssociateName: "",
    associateIsAdvancedFiltering: false,
    associateEmail: "",
    associatePhone: "",
    associateFirstName: "",
    associateLastName: "",
    associateSearch: "",
    pickedClientID: "",
    pickedClientName: "",
    clientIsAdvancedFiltering: false,
    clientEmail: "",
    clientPhone: "",
    clientFirstName: "",
    clientLastName: "",
    clientSearch: "",
};

export const transferOrderOperationState = atom({
  key: 'transferOrderOperation',
  default: TRANSFER_ORDER_OPERATION_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

export const GENERATE_INVOICE_STATE_DEFAULT = {
    invoiceId: "",
    invoiceDate: null,
    associateName: "",
    associateTelephone: "",
    associateTaxId: "",
    customerName: "",
    customerAddress: "",
    customerEmail: "",

    invoiceId: "",
    line01Quantity: "",
    line01Description: "",
    line01UnitPrice: "",
    line01Amount: "",
    line02Quantity: "",
    line02Description: "",
    line02UnitPrice: "",
    line02Amount: "",
    line03Quantity: "",
    line03Description: "",
    line03UnitPrice: "",
    line03Amount: "",
    line04Quantity: "",
    line04Description: "",
    line04UnitPrice: "",
    line04Amount: "",
    line05Quantity: "",
    line05Description: "",
    line05UnitPrice: "",
    line05Amount: "",
    line06Quantity: "",
    line06Description: "",
    line06UnitPrice: "",
    line06Amount: "",
    line07Quantity: "",
    line07Description: "",
    line07UnitPrice: "",
    line07Amount: "",
    line08Quantity: "",
    line08Description: "",
    line08UnitPrice: "",
    line08Amount: "",
    line09Quantity: "",
    line09Description: "",
    line09UnitPrice: "",
    line09Amount: "",
    line10Quantity: "",
    line10Description: "",
    line10UnitPrice: "",
    line10Amount: "",
    line11Quantity: "",
    line11Description: "",
    line11UnitPrice: "",
    line11Amount: "",
    line12Quantity: "",
    line12Description: "",
    line12UnitPrice: "",
    line12Amount: "",
    line13Quantity: "",
    line13Description: "",
    line13UnitPrice: "",
    line13Amount: "",
    line14Quantity: "",
    line14Description: "",
    line14UnitPrice: "",
    line14Amount: "",
    line15Quantity: "",
    line15Description: "",
    line15UnitPrice: "",
    line15Amount: "",

    invoiceLabourAmount: "",
    invoiceMaterialAmount: "",
    invoiceOtherCostsAmount: "",
    invoiceTaxAmount: "",
    invoiceTotalAmount: "",
    invoiceDepositAmount: "",
    invoiceAmountDue: "",
    invoiceQuoteDays: "",
    associateTaxId: "",
    invoiceQuoteDate: null,
    invoiceCustomersApproval: "",
    line01Notes: "",
    line02Notes: "",
    paymentDate: null,
    cash: false,
    cheque: false,
    debit: false,
    credit: false,
    other: false,
    clientSignature: "",
    associateSignDate: null,
    associateSignature: "",
};

export const generateOrderInvoiceState = atom({
    key: 'generateOrderInvoice',
    default: GENERATE_INVOICE_STATE_DEFAULT,
    effects_UNSTABLE: [persistAtom],
});

export const regenerateOrderInvoiceState = atom({
    key: 'regenerateOrderInvoice',
    default: GENERATE_INVOICE_STATE_DEFAULT,
    effects_UNSTABLE: [persistAtom],
});

// ------------------------------------------------ Detail ------------------------------------------------ //

// Used to store the task item detail so we don't have to make an API call again.
export const taskItemDetailState = atom({
    key: 'taskItemDetail',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const orderDetailState = atom({
    key: 'orderDetail',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const bulletinDetailState = atom({
  key: 'bulletinDetail',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const taskItemActiveCountState = atom({
    key: 'taskItemActiveCount',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

// ------------------------------------------------ Filter ------------------------------------------------ //

// AssistantFiles

export const assistantFileFilterJoinDatetState = atom({
    key: 'assistantFileFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const assistantFileFilterStatusState = atom({
    key: 'assistantFileFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const assistantFileFilterTypeState = atom({
    key: 'assistantFileFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const assistantFileFilterSortState = atom({
    key: 'assistantFileFilterSort',
    default: "created_at,ASC",
    effects_UNSTABLE: [persistAtom],
});


// Assistants

export const assistantFilterJoinDatetState = atom({
    key: 'assistantFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const assistantFilterStatusState = atom({
    key: 'assistantFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const assistantFilterTypeState = atom({
    key: 'assistantFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const assistantFilterSortState = atom({
    key: 'assistantFilterSort',
    default: "created_at,ASC",
    effects_UNSTABLE: [persistAtom],
});


// Users

export const userFilterJoinDatetState = atom({
    key: 'userFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const userFilterStatusState = atom({
    key: 'userFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const userFilterTypeState = atom({
    key: 'userFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const userFilterSortState = atom({
    key: 'userFilterSort',
    default: DEFAULT_USER_LIST_SORT_BY_VALUE,
    effects_UNSTABLE: [persistAtom],
});

// Asssociates

export const associateFilterJoinDatetState = atom({
    key: 'associateFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const associateFilterStatusState = atom({
    key: 'associateFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const associateFilterTypeState = atom({
    key: 'associateFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const associateFilterSortState = atom({
    key: 'associateFilterSort',
    default: DEFAULT_ASSOCIATE_LIST_SORT_BY_VALUE,
    effects_UNSTABLE: [persistAtom],
});

// Orders

export const orderFilterJoinDatetState = atom({
    key: 'orderFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const orderFilterStatusState = atom({
    key: 'orderFilterStatus',
    default: 0, // 0=All
    effects_UNSTABLE: [persistAtom],
});

export const orderFilterTypeState = atom({
    key: 'orderFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const orderFilterSortState = atom({
    key: 'orderFilterSort',
    default: DEFAULT_ORDER_LIST_SORT_BY_VALUE,
    effects_UNSTABLE: [persistAtom],
});

// Task Items

export const taskItemFilterJoinDatetState = atom({
    key: 'taskItemFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const taskItemFilterStatusState = atom({
    key: 'taskItemFilterStatus',
    default: 0, // 0=All
    effects_UNSTABLE: [persistAtom],
});

export const taskItemFilterTypeState = atom({
    key: 'taskItemFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const taskItemFilterIsClosedState = atom({
    key: 'taskItemFilterIsClosed',
    default: 2, //0=all, 1=true, 2=false
    effects_UNSTABLE: [persistAtom],
});

export const taskItemFilterSortState = atom({
    key: 'taskItemFilterSortState',
    default: DEFAULT_TASK_ITEM_LIST_SORT_BY_VALUE,
    effects_UNSTABLE: [persistAtom],
});

// Bulletins

export const bulletinFilterJoinDatetState = atom({
    key: 'bulletinFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const bulletinFilterStatusState = atom({
    key: 'bulletinFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const bulletinFilterTypeState = atom({
    key: 'bulletinFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const bulletinFilterSortState = atom({
    key: 'bulletinFilterSort',
    default: 'created_at,ASC',
    effects_UNSTABLE: [persistAtom],
});


// Tags

export const tagFilterJoinDatetState = atom({
    key: 'tagFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const tagFilterStatusState = atom({
    key: 'tagFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const tagFilterTypeState = atom({
    key: 'tagFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const tagFilterSortState = atom({
    key: 'tagFilterSort',
    default: 'created_at,ASC',
    effects_UNSTABLE: [persistAtom],
});

// Insurance Requirement

export const insuranceRequirementFilterJoinDatetState = atom({
    key: 'insuranceRequirementFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const insuranceRequirementFilterStatusState = atom({
    key: 'insuranceRequirementFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const insuranceRequirementFilterTypeState = atom({
    key: 'insuranceRequirementFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const insuranceRequirementFilterSortState = atom({
    key: 'insuranceRequirementFilterSort',
    default: 'created_at,ASC',
    effects_UNSTABLE: [persistAtom],
});

// Inactive AssistantFile

export const inactiveAssistantFileFilterJoinDatetState = atom({
    key: 'inactiveAssistantFileFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const inactiveAssistantFileFilterStatusState = atom({
    key: 'inactiveAssistantFileFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const inactiveAssistantFileFilterTypeState = atom({
    key: 'inactiveAssistantFileFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const inactiveAssistantFileFilterSortState = atom({
    key: 'inactiveAssistantFileFilterSort',
    default: 'created_at,ASC',
    effects_UNSTABLE: [persistAtom],
});

// Vehicle Type

export const vehicleTypeFilterJoinDatetState = atom({
    key: 'vehicleTypeFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const vehicleTypeFilterStatusState = atom({
    key: 'vehicleTypeFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const vehicleTypeFilterTypeState = atom({
    key: 'vehicleTypeFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const vehicleTypeFilterSortState = atom({
    key: 'vehicleTypeFilterSort',
    default: 'created_at,ASC',
    effects_UNSTABLE: [persistAtom],
});

// Staff

export const staffFilterJoinDatetState = atom({
    key: 'staffFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const staffFilterStatusState = atom({
    key: 'staffFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const staffFilterTypeState = atom({
    key: 'staffFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const staffFilterSortState = atom({
    key: 'staffFilterSort',
    default: DEFAULT_STAFF_LIST_SORT_BY_VALUE,
    effects_UNSTABLE: [persistAtom],
});

// Comments

export const commentFilterJoinDatetState = atom({
    key: 'commentFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const commentFilterStatusState = atom({
    key: 'commentFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const commentFilterTypeState = atom({
    key: 'commentFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const commentFilterSortState = atom({
    key: 'commentFilterSort',
    default: DEFAULT_COMMENT_LIST_SORT_BY_VALUE,
    effects_UNSTABLE: [persistAtom],
});


// Programs

export const programFilterJoinDatetState = atom({
    key: 'programFilterJoinDatet',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const programFilterStatusState = atom({
    key: 'programFilterStatus',
    default: 1, // 1=active
    effects_UNSTABLE: [persistAtom],
});

export const programFilterTypeState = atom({
    key: 'programFilterType',
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const programFilterSortState = atom({
    key: 'programFilterSort',
    default: "created_at,ASC",
    effects_UNSTABLE: [persistAtom],
});


// ------------------------------------------------ Register ------------------------------------------------ //

export const REGISTER_JOB_SEEKER_STATE_DEFAULT = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: USER_PHONE_TYPE_MOBILE,
    otherPhone: "",
    otherPhoneType: USER_PHONE_TYPE_LANDLINE,
    isOkToText: false,
    isOkToEmail: false,
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    country: "",
    hasShippingAddress: false,
    shippingName: "",
    shippingPhone: "",
    shippingCountry: "",
    shippingRegion: "",
    shippingCity: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingPostalCode: "",
    tags: [],
    comments: [],
    gender: 0,
    genderOther: "",
    joinDate: new Date(),
    birthDate: null,
    howDidYouHearAboutUsID: "",
    isHowDidYouHearAboutUsOther: false,
    howDidYouHearAboutUsOther: "",
    additionalComment: "",
    identifyAs: [],
    password: "",
    passwordRepeated: "",
};

export const registerJobSeekerState = atom({
  key: 'registerJobSeeker',
  default: REGISTER_JOB_SEEKER_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});

// NEW //

export const EMPTY_LIST_STATE_DEFAULT = {"results":[],"next_cursor":"000000000000000000000000","has_next_page":false};

export const smartFolderListDataState = atom({
  key: 'smartFolderListData',
  default: EMPTY_LIST_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});
