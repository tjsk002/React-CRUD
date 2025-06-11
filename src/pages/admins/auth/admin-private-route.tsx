import { Navigate, Outlet } from 'react-router'

const AdminPrivateRoute = () => {
    const token = localStorage.getItem('accessToken')
    const storedData = localStorage.getItem('adminData')
    if (!token && !storedData) {
        return <Navigate to="/admin/auth/login" />
    }

    return <Outlet />
}

export default AdminPrivateRoute
