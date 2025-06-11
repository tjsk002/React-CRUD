import { Navigate, Outlet } from 'react-router'

const PrivateOnlyRoute = () => {
    const token = localStorage.getItem('accessToken')
    const storedData = localStorage.getItem('userData')
    if (!token && !storedData) {
        return <Navigate to="/auth/login" />
    }

    return <Outlet />
}

export default PrivateOnlyRoute
