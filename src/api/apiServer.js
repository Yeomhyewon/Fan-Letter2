import axios from "axios";

export const serverInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const checkToken = async () => {
  try {
    await axios.get(process.env.REACT_APP_API_URL + "/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    alert("토큰이 만료되었습니다. 잠시 후에 로그아웃 됩니다.");
  }
};

serverInstance.interceptors.request.use(
  //요청을 보내기 전 수행되는 함수
  function (config) {
    console.log("인터셉터 요청 성공!");
    return config;
  },

  //오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 요청 오류!");
    return Promise.reject(error);
  }
);

serverInstance.interceptors.response.use(
  //응답을 내보내지 전 수행되는 함수
  function (response) {
    console.log("인터셉터 응답 받았습니다");
    return response;
  },

  //오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 응답 오류 발생!");
    return Promise.reject(error);
  }
);
