import { AccessControl } from "accesscontrol";
import { UserRoleEnum } from "../generated/UserRole";

// Resource constants
export const ADMINISTRATION_RESOURCE = "administration";
export const ORGANIZATION_RESOURCE = "organization";
export const PROFILE_RESOURCE = "profile";
export const SIGNED_DOCUMENT_RESOURCE = "signed-document";
export const UNSIGNED_DOCUMENT_RESOURCE = "unsigned-document";

// Attribute name constants
export const EMAIL_ATTRIBUTE = "email";
export const PASSWORD_ATTRIBUTE = "password";
export const PHONE_NUMBER_ATTRIBUTE = "phoneNumber";
export const REGISTRATION_STATUS_ATTRIBUTE = "registrationStatus";
export const USER_ATTRIBUTE = "user";
export const WORK_EMAIL_ATTRIBUTE = "workEmail";

export const ALL_ATTRIBUTES = "*";
export const NOT = "!";

enum VERB {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete"
}
enum POSSESSION {
  ANY = "any",
  OWN = "own"
}

enum ACTION {
  CREATE_ANY = VERB.CREATE + ":" + POSSESSION.ANY,
  CREATE_OWN = VERB.CREATE + ":" + POSSESSION.OWN,
  READ_ANY = VERB.READ + ":" + POSSESSION.ANY,
  READ_OWN = VERB.READ + ":" + POSSESSION.OWN,
  UPDATE_ANY = VERB.UPDATE + ":" + POSSESSION.ANY,
  UPDATE_OWN = VERB.UPDATE + ":" + POSSESSION.OWN,
  DELETE_ANY = VERB.DELETE + ":" + POSSESSION.ANY,
  DELETE_OWN = VERB.DELETE + ":" + POSSESSION.OWN
}

const grants = {
  [UserRoleEnum.ORG_DELEGATE]: {
    [PROFILE_RESOURCE]: {
      [ACTION.READ_OWN]: [ALL_ATTRIBUTES, NOT + PASSWORD_ATTRIBUTE],
      [ACTION.UPDATE_OWN]: [
        WORK_EMAIL_ATTRIBUTE,
        NOT + EMAIL_ATTRIBUTE,
        NOT + PASSWORD_ATTRIBUTE,
        NOT + PHONE_NUMBER_ATTRIBUTE
      ]
    },
    [ADMINISTRATION_RESOURCE]: {
      [ACTION.READ_ANY]: [ALL_ATTRIBUTES]
    },
    [ORGANIZATION_RESOURCE]: {
      [ACTION.CREATE_OWN]: [ALL_ATTRIBUTES],
      [ACTION.READ_OWN]: [ALL_ATTRIBUTES]
    },
    [UNSIGNED_DOCUMENT_RESOURCE]: {
      [ACTION.CREATE_OWN]: [ALL_ATTRIBUTES],
      [ACTION.READ_OWN]: [ALL_ATTRIBUTES]
    },
    [SIGNED_DOCUMENT_RESOURCE]: {
      [ACTION.CREATE_OWN]: [ALL_ATTRIBUTES]
    }
  },
  [UserRoleEnum.DEVELOPER]: {
    [PROFILE_RESOURCE]: {
      [ACTION.READ_OWN]: [
        ALL_ATTRIBUTES,
        NOT + PASSWORD_ATTRIBUTE,
        NOT + WORK_EMAIL_ATTRIBUTE
      ],
      [ACTION.UPDATE_OWN]: [
        NOT + WORK_EMAIL_ATTRIBUTE,
        EMAIL_ATTRIBUTE,
        PASSWORD_ATTRIBUTE,
        PHONE_NUMBER_ATTRIBUTE
      ]
    },
    [ADMINISTRATION_RESOURCE]: {
      [ACTION.READ_ANY]: [ALL_ATTRIBUTES]
    }
  },
  [UserRoleEnum.ORG_MANAGER]: {
    [PROFILE_RESOURCE]: {
      [ACTION.READ_OWN]: [
        ALL_ATTRIBUTES,
        NOT + PASSWORD_ATTRIBUTE,
        NOT + WORK_EMAIL_ATTRIBUTE
      ],
      [ACTION.UPDATE_OWN]: [
        PASSWORD_ATTRIBUTE,
        NOT + WORK_EMAIL_ATTRIBUTE,
        NOT + EMAIL_ATTRIBUTE,
        NOT + PHONE_NUMBER_ATTRIBUTE
      ]
    },
    [ORGANIZATION_RESOURCE]: {
      [ACTION.READ_OWN]: [ALL_ATTRIBUTES],
      [ACTION.DELETE_OWN]: [ALL_ATTRIBUTES, USER_ATTRIBUTE]
    }
  },
  [UserRoleEnum.ADMIN]: {
    [PROFILE_RESOURCE]: {
      [ACTION.READ_OWN]: [
        ALL_ATTRIBUTES,
        NOT + PASSWORD_ATTRIBUTE,
        NOT + WORK_EMAIL_ATTRIBUTE
      ],
      [ACTION.UPDATE_OWN]: [
        PASSWORD_ATTRIBUTE,
        NOT + WORK_EMAIL_ATTRIBUTE,
        NOT + EMAIL_ATTRIBUTE,
        NOT + PHONE_NUMBER_ATTRIBUTE
      ]
    },
    [ORGANIZATION_RESOURCE]: {
      [ACTION.READ_ANY]: [ALL_ATTRIBUTES],
      [ACTION.UPDATE_ANY]: [REGISTRATION_STATUS_ATTRIBUTE],
      [ACTION.DELETE_ANY]: [ALL_ATTRIBUTES]
    },
    [SIGNED_DOCUMENT_RESOURCE]: {
      [ACTION.READ_ANY]: [ALL_ATTRIBUTES]
    }
  }
};

export default new AccessControl(grants);
