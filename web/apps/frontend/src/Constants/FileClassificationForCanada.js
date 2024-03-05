//
// File Classification ID for Canada
//

export const FILE_CLASSIFICATION_KEY_CANADA_ARTICLES_OF_INCORPORATION = 1;
export const FILE_CLASSIFICATION_KEY_CANADA_TRADE_NAME_CONSENT_LETTER = 2;
export const FILE_CLASSIFICATION_KEY_CANADA_ONTARIO_EXTRA_PROVINCE_REGISTRATION = 3;
export const FILE_CLASSIFICATION_KEY_CANADA_CERTIFICATE_OF_INCORPRATION = 4;
export const FILE_CLASSIFICATION_KEY_CANADA_INITIAL_REGISTERED_OFFICE_ADDRESS_AND_FIRST_BOARD_OF_DIRECTORS = 5;
export const FILE_CLASSIFICATION_KEY_CANADA_FORM_22_ANNUAL_RETURN = 6;

//
// File Classification Labels for Canada
//

export const FILE_CLASSIFICATION_LABEL_CANADA_ARTICLES_OF_INCORPORATION = "Articles of Incorporation";
export const FILE_CLASSIFICATION_LABEL_CANADA_TRADE_NAME_CONSENT_LETTER = "Trade Name Consent Letter";
export const FILE_CLASSIFICATION_LABEL_CANADA_ONTARIO_EXTRA_PROVINCE_REGISTRATION = "Ontario Extra-provincial Registration"
export const FILE_CLASSIFICATION_LABEL_CANADA_CERTIFICATE_OF_INCORPRATION = "Certificate of Incorporation";
export const FILE_CLASSIFICATION_LABEL_CANADA_INITIAL_REGISTERED_OFFICE_ADDRESS_AND_FIRST_BOARD_OF_DIRECTORS = "Initial Registered Office Address and First Board of Directors";
export const FILE_CLASSIFICATION_LABEL_CANADA_FORM_22_ANNUAL_RETURN = "Form 22 - Annual Return";

//
// File Classification Options List for Canada
//

export const CANADA_GOVERNMENT_FILE_CLASSIFICATION_LIST = [
    {
        "id": FILE_CLASSIFICATION_KEY_CANADA_FORM_22_ANNUAL_RETURN,
        "label": FILE_CLASSIFICATION_LABEL_CANADA_FORM_22_ANNUAL_RETURN,
        "short": "A Federal Annual Return (Form 22) is a mandatory filing requirement by all active corporations incorporated, amalgamated or continued with the federal government through Corporations Canada.",
        "type": "MultipleFiles",
    },
    {
        "id": FILE_CLASSIFICATION_KEY_CANADA_ARTICLES_OF_INCORPORATION,
        "label": FILE_CLASSIFICATION_LABEL_CANADA_ARTICLES_OF_INCORPORATION,
        "short": "Articles of Incorporation are legal documents submitted to the Provincial, Territorial or Federal governments within Canada which are necessary in order to establish your business as a legal entity—they also help set out your corporation's purpose and regulations.",
        "type": "SingleFile",
    },{
        "id": FILE_CLASSIFICATION_KEY_CANADA_TRADE_NAME_CONSENT_LETTER,
        "label": FILE_CLASSIFICATION_LABEL_CANADA_TRADE_NAME_CONSENT_LETTER,
        "short": "The consent is signed by the owner of the trade-name or the trade-mark. If the consent is being given by a corporation, the signature must be of an authorized officer and must give his/her title.Sep 26, 2013",
        "type": "SingleFile",
    },{
        "id": FILE_CLASSIFICATION_KEY_CANADA_ONTARIO_EXTRA_PROVINCE_REGISTRATION,
        "label": FILE_CLASSIFICATION_LABEL_CANADA_ONTARIO_EXTRA_PROVINCE_REGISTRATION,
        "short": "Extra-provincial registration means obtaining a licence from the Government of Ontario and/or filing any other required information, to carry on business in Ontario.",
        "type": "SingleFile",
    }
]

//
// File Classification Map for Canada
//

export const FILE_CLASSIFICATION_CANADA_MAP = {
    [FILE_CLASSIFICATION_KEY_CANADA_ARTICLES_OF_INCORPORATION]: FILE_CLASSIFICATION_LABEL_CANADA_ARTICLES_OF_INCORPORATION,
    [FILE_CLASSIFICATION_KEY_CANADA_TRADE_NAME_CONSENT_LETTER]: FILE_CLASSIFICATION_LABEL_CANADA_TRADE_NAME_CONSENT_LETTER,
    [FILE_CLASSIFICATION_KEY_CANADA_ONTARIO_EXTRA_PROVINCE_REGISTRATION]: FILE_CLASSIFICATION_LABEL_CANADA_ONTARIO_EXTRA_PROVINCE_REGISTRATION,
    [FILE_CLASSIFICATION_KEY_CANADA_CERTIFICATE_OF_INCORPRATION]: FILE_CLASSIFICATION_LABEL_CANADA_CERTIFICATE_OF_INCORPRATION,
    [FILE_CLASSIFICATION_KEY_CANADA_INITIAL_REGISTERED_OFFICE_ADDRESS_AND_FIRST_BOARD_OF_DIRECTORS]: FILE_CLASSIFICATION_LABEL_CANADA_INITIAL_REGISTERED_OFFICE_ADDRESS_AND_FIRST_BOARD_OF_DIRECTORS,
    [FILE_CLASSIFICATION_LABEL_CANADA_FORM_22_ANNUAL_RETURN]: FILE_CLASSIFICATION_KEY_CANADA_FORM_22_ANNUAL_RETURN,
};
