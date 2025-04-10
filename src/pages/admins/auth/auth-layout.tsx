import { useEffect } from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            window.location.href = '/admin/users/list'
        }
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout
