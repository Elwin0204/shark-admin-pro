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
      return response;
    },
    (err: any) => {}
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
