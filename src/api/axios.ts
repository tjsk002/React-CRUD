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
            '/auth/refresh',
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
            } else {
                alert('로그아웃 되었습니다. 다시 로그인해주세요.')
                window.location.href = '/auth/login'
            }
        })
        .catch((error) => {
            console.log(`error ${error}`)
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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        console.log(error.response)
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            await refreshAccessToken()
        }
        return Promise.reject(error)
    }
)
