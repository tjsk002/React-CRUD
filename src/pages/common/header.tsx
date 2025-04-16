import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import AccountMenu from '@/pages/common/account-menu.tsx'
import AuthButton from '@/pages/common/auth-button.tsx'

export default function Header() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        nickName: '',
    })

    const fetchMy = () => {
        const stored = localStorage.getItem('userData')
        if (!stored) return

        try {
            const userData = JSON.parse(stored)
            if (userData) {
                setUser({
                    username: userData.username,
                    nickName: userData.nickName,
                })
            }
        } catch (error) {
            alert('userData parse error' + error)
        }
    }

    function viewHome() {
        navigate('/')
    }

    useEffect(() => {
        fetchMy()
    }, [])

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-14 flex items-center justify-between px-40">
                <h1 className="text-xl font-bold text-blue-600">
                    <a onClick={viewHome} className="cursor-default">
                        FeedSpot
                    </a>
                </h1>
                {user.nickName == '' ? <AuthButton /> : <AccountMenu user={user} />}
            </header>
        </div>
    )
}
