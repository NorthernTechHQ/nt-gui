// Copyright 2017 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
import type { AxiosError, AxiosProgressEvent, AxiosRequestConfig, GenericAbortSignal, InternalAxiosRequestConfig } from 'axios';
import axios, { isCancel } from 'axios';
import Cookies from 'universal-cookie';

import { cleanUp, getToken } from '../auth';
import { TIMEOUTS } from '../constants';

const cookies = new Cookies();

const unauthorizedRedirect = (error: AxiosError): Promise<never> => {
  if (!isCancel(error) && error.response?.status === 401 && getToken() && !window.location.pathname.endsWith('/subscription')) {
    // a new jwt might have been set by sso while the current request was in-flight with an old token
    //   => reload instead of logging out
    if (cookies.get('JWT', { doNotParse: true })) {
      window.location.reload();
      return Promise.reject(error);
    }
    cleanUp();
    window.location.replace('/ui/');
  }
  return Promise.reject(error);
};

export const commonRequestConfig: AxiosRequestConfig = { timeout: TIMEOUTS.refreshDefault, headers: { 'Content-Type': 'application/json' } };

export const authenticatedRequest = axios.create(commonRequestConfig);
authenticatedRequest.interceptors.response.use(res => res, unauthorizedRedirect);
authenticatedRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

const Api = {
  get: authenticatedRequest.get,
  delete: <T = unknown, D = unknown>(url: string, data?: D) => authenticatedRequest.request<T>({ method: 'delete', url, data }),
  patch: authenticatedRequest.patch,
  post: authenticatedRequest.post,
  postUnauthorized: <T = unknown, D = unknown>(url: string, data?: D, config: AxiosRequestConfig = {}) =>
    axios.post<T>(url, data, { ...commonRequestConfig, ...config }),
  put: authenticatedRequest.put,
  upload: <T = unknown>(url: string, formData: FormData, progress: (event: AxiosProgressEvent) => void, cancelSignal: GenericAbortSignal) =>
    authenticatedRequest.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: progress,
      timeout: 0,
      signal: cancelSignal
    }),
  uploadPut: <T = unknown>(url: string, formData: FormData, progress: (event: AxiosProgressEvent) => void, cancelSignal: GenericAbortSignal) =>
    authenticatedRequest.put<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: progress,
      timeout: 0,
      signal: cancelSignal
    })
};

export default Api;
