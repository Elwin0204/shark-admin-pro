export enum ApiErrorCode {
  ERR_USER_ID_INVALID = 10001, // 用户id无效
  ERR_USER_NOTEXIST = 10002, // 用户不存在
  ERR_USER_EXIST = 10003, // 用户已存在
  ERR_PASSWORD = 10004, // 密码错误
  ERR_COMMON = 20000, // 通用错误码,想偷懒就返回这个
}
