import apiAxios from "./axiosConfig";


const publicGetFetcher = async ([url, params]: [string, Record<string, any> | null]) => {
  try {
    if (params !== null) {
      const response = await apiAxios.get(url, {
        params,
      });
      return response.data;

    } else {
      const response = await apiAxios.get(url, {
      });
      return response.data;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const publicPostFetcher = async ([url, data]: [string, Record<string, any> | null]) => {
  try {
    if (data !== null) {
      const response = await apiAxios.post(url, {
        data,
      });
      return response.data;

    } else {
      const response = await apiAxios.post(url, {
      });
      return response.data;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// const publicPostFetcher = async ({ url, data }: { url: string, data?: Record<string, any> }) => {
//   try {
//     const response = await apiAxios.publicApiAxios({
//       method: "post",
//       url: url,
//       data: { ...data }, // 객체를 그대로 전달
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // SWR이 에러를 감지할 수 있도록 예외를 다시 던짐
//   }
// };

// const publicPatchFetcher = async ({ url, data }: { url: string, data?: Record<string, any> }) => {
//   try {
//     const response = await axiosConfig.publicApiAxios({
//       method: "patch",
//       url: url,
//       data: JSON.stringify(data?.data), // JSON 문자열로 변환
//       headers: {
//         "Content-Type": "application/json", // 명시적으로 JSON 타입 지정
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // SWR이 에러를 감지할 수 있도록 예외를 다시 던짐
//   }
// };

const fetchers = {
  publicGetFetcher,
  publicPostFetcher,
  // publicPatchFetcher,
}

export default fetchers