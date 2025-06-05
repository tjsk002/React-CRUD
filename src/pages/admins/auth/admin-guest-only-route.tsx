import { Navigate, Outlet } from 'react-router'

const AdminGuestOnlyRoute = () => {
    const token = localStorage.getItem('accessToken')
    const storedData = localStorage.getItem('adminData')
    if (token && storedData) {
        return <Navigate to="/admin/users/list" />
    }

    return <Outlet />
}

export default AdminGuestOnlyRoute
