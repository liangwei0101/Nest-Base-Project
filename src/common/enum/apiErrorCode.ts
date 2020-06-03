export enum ApiErrorCode {
  // 用户不存在
  USER_IS_NOT_EXIST = 101,
  // 用户密码错误
  USER_PASSWD_IS_ERROR = 102,
}

export const ApiErrorMessage = {

  USER_IS_NOT_EXIST: 'user is not exist',

  USER_PASSWD_IS_ERROR: 'user password is error',
}