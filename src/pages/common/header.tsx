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
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 shadow-sm h-14 flex items-center justify-between px-40">
                <h1 className="text-xl font-bold text-blue-600">
                    <a onClick={viewHome} className="cursor-default">
                        FeedSpot{' '}
                        <span className="text-xs font-sans text-gray-400">
                            자유롭게 대화를 나누는 피드 스팟
                        </span>
                    </a>
                </h1>
                <div>
                    <nav className="px-40 py-3 border-gray-200 flex gap-4 text-gray-600 text-sm font-medium">
                        <a href="/movie" className="hover:text-blue-600 transition-colors">
                            실시간 영화 정보
                        </a>
                        <a href="/board" className="hover:text-blue-600 transition-colors">
                            자유 게시물
                        </a>
                    </nav>
                </div>
                {user.nickName == '' ? <AuthButton /> : <AccountMenu user={user} />}
            </header>
        </div>
    )
}
