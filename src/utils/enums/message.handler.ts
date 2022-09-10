export enum MessageHandler {
    PASSWORD_INVALID = 'The password must have a Uppercase, lowercase letter and a number',
    UNEXPECTED_ERROR = 'Unexpected error, check server logs',
    UNAUTHORIZED_CREDENTIALS = 'Email or password are not valid',
    UNAUTHORIZED_TOKEN = 'Token is not valid',
    UNAUTHORIZED_USER = 'User is inactive, contact support',
  }
  