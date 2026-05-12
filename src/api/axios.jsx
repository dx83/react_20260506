import axios from "axios";
import { store } from "../store";
import { refresh } from "../reducer/loggedSlice";

//  토큰이 없는 경우(로그인불필요)   /api/customer/info.do   => await axios(url)
//  토큰이 필요한 경우(로그인후에)   /customer/info.do       => await api(url)
const api = axios.create({ baseURL: '/api' });

// api 요청시 토큰 추가
api.interceptors.request.use(
    (config) => {
        // 스토어에서 access token 가져오기
        const token = store.getState().logged.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        console.log("==================response", response);
        return response;
    },
    async (error) => {
        console.log("==================error", error);
        const originalRequest = error.config;

        // originalRequest.status가 401이고, originalRequest.retry => False일때
        // refresh api를 호출해서 토큰을 갱신하기
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("401에러 발생");
            try {
                const refreshToken = store.getState().logged.refreshToken;
                console.log("refreshToken", refreshToken);
                
                if (refreshToken) {
                    const url = `/api/customer/refreshToken.do`;
                    const { data } = await axios.post(url, { refreshToken: refreshToken });

                    //console.log(data);

                    if (data.result === 1) {
                        // 갱신 받은 access token을 스토어와 헤더에 저장
                        const newAccessToken = data.accessToken;
                        store.dispatch(refresh({ token: newAccessToken }));

                        // 갱신된 access token을 헤더에 저장후에 실패한 요청을 재요청함.
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        originalRequest._retry = true;
                        return api(originalRequest);
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;