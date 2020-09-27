export enum ApiErrorCodeEnum {
  // id 错误
  IdIsErrorCode = 1000,
  IdIsError = 'id is error',

  // 用户不存在
  UserIsNotExistCode = 1001,
  UserIsNotExist = 'user account is not exist',

  // 用户密码错误
  UserPasswordIsErrorCode = 1002,
  UserPasswordIsError = 'user password is error',

  // 手机存在
  PhoneIsAleradyExistCode = 1003,
  PhoneIsAleradyExist = 'user phone is exists',
}
