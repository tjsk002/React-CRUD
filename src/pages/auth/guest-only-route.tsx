import { Navigate, Outlet } from 'react-router'

const GuestOnlyRoute = () => {
    const token = localStorage.getItem('accessToken')
    const storedData = localStorage.getItem('userData')
    if (token && storedData) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default GuestOnlyRoute
