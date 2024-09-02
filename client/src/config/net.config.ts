const env = import.meta.env;

const netSettings = {
  baseURL: env.BASE_URL,
  requestTimeout: 5000,
  contentType: "application/json;charset=UTF-8",
  requestIdKey: "X-Request-Id",
};

export default netSettings;
