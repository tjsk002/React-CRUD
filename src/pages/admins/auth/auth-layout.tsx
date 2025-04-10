import { useEffect } from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            window.location.href = '/users/list'
        }
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout
