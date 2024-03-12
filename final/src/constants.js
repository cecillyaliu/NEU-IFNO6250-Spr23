export const LOGIN_STATUS = {
    PENDING: "pending",
    NOT_LOGGED_IN: "notLoggedIn",
    IS_LOGGED_IN: "loggedIn",
  };

  export const WORD_STATUS = {
    PENDING: "pending",
    IS_AVAILABLE: "available",
  };
  
  export const SERVER = {
    AUTH_MISSING: "auth-missing",
    AUTH_INSUFFICIENT: "auth-insufficient",
    REQUIRED_USERNAME: "required-username",
    AUTH_DENIED: "auth-denied",
  };
  
  export const CLIENT = {
    NETWORK_ERROR: "networkError",
    NO_SESSION: "noSession",
  };
  
  export const MESSAGES = {
    [SERVER.REQUIRED_USERNAME]:
      "Username couldn't be null, please try again.",
    [CLIENT.NETWORK_ERROR]:
      "Network connection failed.",
    [SERVER.AUTH_INSUFFICIENT]:
      "Invalid Username, please try again.",
    [SERVER.AUTH_DENIED]:
    "Disallowed user, not welcome.",
    default: "Something went wrong.  Please try again",
  };