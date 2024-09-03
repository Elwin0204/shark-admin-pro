export const enum ApiCode {
  ERR_NO_PERMISSION = 401, // 身份验证失败, 或者token失效
  ERR_FORBIDDEN = 403, // 身份验证通过, 但权限不足
  ERR_NOT_FOUND = 404, // 访问的资源不存在
  ERR_COMMON = 500, // 通用服务器错误
}
