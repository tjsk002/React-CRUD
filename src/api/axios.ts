import axios from 'axios'

const ADMIN_LOGIN_URL = '/admin/auth/login'
const LOGIN_URL = '/auth/login'

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
            '/auth/refresh',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        )
        .then((response) => {
            const newAccessToken = response.headers.authorization
            localStorage.setItem('accessToken', newAccessToken)
        })
        .catch((error) => {
            console.log(`접속 오류 ${error}`)
            alert('접속시간이 만료되었습니다. 다시 로그인 해주세요.')
            const storedData = localStorage.getItem('userData')
            if (!storedData) return
            const { role } = JSON.parse(storedData)
            window.location.href = role === 'USER' ? LOGIN_URL : ADMIN_LOGIN_URL
            logout()
        })
}

const logout = () => {
    localStorage.clear()
    localStorage.removeItem('accessToken')
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
