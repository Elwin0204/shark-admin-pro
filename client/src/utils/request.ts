import axios, { AxiosError } from "axios";
import type {
  AxiosResponse,
  CancelTokenSource,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import axiosRetry, { IAxiosRetryConfig } from "axios-retry";
import qs, { stringify } from "qs";
import netConfig from "@/config/net.config";
import { nanoid } from "nanoid";
import { skLocal } from "./storage";
import { ApiCode } from "@/enums/ApiCode.enum";
import { message } from "ant-design-vue";

const { baseURL, requestTimeout, contentType, requestIdKey } = netConfig;

export function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const axiosConfig: CreateAxiosDefaults = {
    baseURL: baseURL,
    timeout: requestTimeout,
    headers: { "Content-Type": contentType },
    paramsSerializer: (params) => {
      return stringify(params);
    },
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}

export function createRetryConfig(config?: Partial<CreateAxiosDefaults>) {
  const retryConfig: IAxiosRetryConfig = {
    retries: 3,
  };

  Object.assign(retryConfig, config);

  return retryConfig;
}

// 处理通用相应错误码
const handleErrCode = (code: number, msg: string) => {
  switch (code) {
    // 401: token验证失败
    case ApiCode.ERR_NO_PERMISSION:
      message.error(msg || `${code}：身份验证失败`);
      break;
    case ApiCode.ERR_FORBIDDEN:
      message.error(msg || `${code}：無權限訪問`);
      break;
    // 404: 请求的资源不存在
    case ApiCode.ERR_NOT_FOUND:
      message.error(msg || `${code}：后端接口不存在`);
      break;
    default:
      message.error(msg || `${code}：后端接口异常`);
      break;
  }
};

function createRequest(axiosConfig?: CreateAxiosDefaults) {
  const axiosConf = createAxiosConfig(axiosConfig);

  const instance = axios.create(axiosConf);

  const cancelTokenSourceMap = new Map<string, CancelTokenSource>();

  // 设置请求重试
  const retryOptions = createRetryConfig(axiosConf);
  axiosRetry(instance, retryOptions);

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 设置请求id
      const id = nanoid();
      config.headers.set(requestIdKey, id);
      // 设置取消请求token
      const cancelTokenSource = axios.CancelToken.source();
      config.cancelToken = cancelTokenSource.token;
      cancelTokenSourceMap.set(id, cancelTokenSource);

      // 设置token
      const token = skLocal.get("token");
      const Authorization = token ? `Bearer ${token}` : null;
      config.headers.set("Authorization", Authorization);

      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data, config } = response;
      const { code, msg } = data;
      if (code === 200) {
        return data;
      }
      if (data instanceof ArrayBuffer || data instanceof Blob) {
        return response;
      }
      handleErrCode(code, msg);
      return Promise.reject(
        "响应异常拦截:" + JSON.stringify({ url: config.url, code, msg }) ||
          "Error"
      );
    },
    (err: any) => {
      const { response, message } = err;
      // 请求已发出, 但不在2xx范围
      if (err.response && err.response.data) {
        const { status, data } = response;
        handleErrCode(status, message);
        return Promise.reject(err);
      } else {
        // 处理断网的情况
        // eg: 请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        if (!window.navigator.onLine) {
          // const settingsStore = useSettingsStore();
          // settingsStore.changeNetwork(false);
        } else {
          let msg = "";
          if (message === "Network Error") {
            msg = "后端接口连接异常";
          }
          if (message.includes("timeout")) {
            msg = "后端接口请求超时";
          }
          if (message.includes("Request failed with status code")) {
            const code = message.substr(message.length - 3);
            msg = "后端接口" + code + "异常";
          }
          message.error(msg || `后端接口未知异常`);
          return Promise.reject(err);
        }
      }
    }
  );

  function cancelRequest(id: string) {
    const cancelTokenSource = cancelTokenSourceMap.get(id);
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
      cancelTokenSourceMap.delete(id);
    }
  }

  function cancelAllRequest() {
    cancelTokenSourceMap.forEach((cancelTokenSource) => {
      cancelTokenSource.cancel();
    });
    cancelTokenSourceMap.clear();
  }

  return {
    request: instance,
    cancelRequest,
    cancelAllRequest,
  };
}

export const { request, cancelRequest, cancelAllRequest } = createRequest();
