import getDecodeLocalStorage from "@/lib/getDecodeLocalStorage";
import axios from "axios";
import { ApiError } from "./ApiError";
import apiController from "./apiController";
import setEncodeLocalStorage from "@/lib/setEncodeLocalStorage";

const url = import.meta.env.VITE_API_URL || "";

const apiAxios = axios.create({
  baseURL: url,
  timeout: 200000,
  withCredentials: true,
});


apiAxios.interceptors.request.use(
  function (config) {
    const accessToken = getDecodeLocalStorage({ key: "accessToken" })

    config.headers.Authorization = accessToken?.value !== "" ? `Bearer ${accessToken?.value}` : "";
    // ✅ multipart/form-data인 경우엔 Content-Type 설정하지 않기
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json; charset=UTF-8";
      config.headers["Accept"] = "application/json";
    }

    return config
  },
  function (error) {
    return Promise.reject(error);
  },
)

let isAlertShown = false; // 전역 플래그 선언

apiAxios.interceptors.response.use(
  function (response) {

    return response;
  },
  async function (error) {

    const status = error?.response?.status;
    const message = error?.response?.data;


    if (status === 403) {

      if (!isAlertShown) {

        if (!String(error.request.responseURL).includes("/auth/refresh")) {
          try {
            const res = await apiController.postAuthRefresh()
            if (res.status === 200) {
              setEncodeLocalStorage({ key: "accessToken", value: res.data.accessToken })
              apiAxios.defaults.headers.common.Authorization = `Bearer ${res}`;

              //기존의 요청을 다시 요청한다.
              const originalRequest = error.config;
              originalRequest.headers.Authorization = `Bearer ${res}`;
              return apiAxios(originalRequest);
            }
          } catch (error) {
            window.alert("접근 권한이 없습니다. 다시 로그인해주세요.");
            localStorage.clear();
            window.location.href = "/login";
            isAlertShown = true;
            return Promise.reject(new ApiError("권한 없음", 403, message));
          }
        }

      }

      return Promise.reject(new ApiError("권한 없음", 403, message));
    }

    if (status === 500) {
      console.warn("서버 에러입니다.");
      return Promise.reject(new ApiError("서버 에러", 500, message));
    }

    console.warn(message);
    return Promise.reject(new ApiError("API 오류", status || 0, message));
  }
);


export default apiAxios;