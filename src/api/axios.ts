import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

const refreshAccessToken = async () => {
    await api
        .post(
            '/admin/auth/refresh',
            {},
            {
                headers: {
                    authorization: localStorage.getItem('accessToken'),
                },
            }
        )
        .then((response) => {
            const newAccessToken = response.headers.authorization

            if (newAccessToken) {
                localStorage.clear()
                localStorage.setItem('accessToken', newAccessToken)
            }
        })
        .catch((error) => {
            console.log(`error ${error}`)
            alert('접속시간이 만료되었습니다. 다시 로그인 해주세요.')
            window.location.href = '/admin/auth/login'
        })
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.authorization = token
        }
        return config
    },
    (error) => Promise.reject(error)
)

let isRefreshing = false
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 403 && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true
            isRefreshing = true
            try {
                await refreshAccessToken()
                isRefreshing = false
                return axios(originalRequest)
            } catch (error) {
                isRefreshing = false
                window.location.href = '/auth/login'
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export interface ErrorResponse {
    resultCode: string
    resultMessage: string
    resultData: {
        message: string
        errors?: {
            nickName?: string
            username?: string
            password?: string
        }
    }
}
