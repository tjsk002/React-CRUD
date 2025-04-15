import { Navigate, Outlet } from 'react-router'

const AdminLayout = () => {
    const token = localStorage.getItem('accessToken')
    const storedData = localStorage.getItem('adminData')
    if (!token && !storedData) {
        return <Navigate to="/admin/auth" />
    }

    return <Outlet />
}

export default AdminLayout
