import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function Header() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        nickName: '',
    })
    const [isOpen, setIsOpen] = useState(false)
    const fetchMy = () => {
        const stored = localStorage.getItem('userData')
        if (!stored) return

        try {
            const userData = JSON.parse(stored)
            if (userData && userData.username) {
                setUser({
                    username: userData.username,
                    nickName: userData.nickName,
                })
            }
        } catch (error) {
            console.error('userData 파싱 실패:', error)
        }
    }

    function viewLogin() {
        navigate('/auth/login')
    }

    function viewSignup() {
        navigate('/auth/signup')
    }

    function viewHome() {
        navigate('/')
    }

    useEffect(() => {
        fetchMy()
    })

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-14 flex items-center justify-between px-40">
                <h1 className="text-xl font-bold text-blue-600">
                    <a onClick={viewHome} className="cursor-default">
                        🎬 MovieYou
                    </a>
                </h1>
                {!user && (
                    <div className="space-x-3 text-sm">
                        <button
                            className="px-3 py-1 text-gray-700 hover:text-blue-600"
                            onClick={viewLogin}
                        >
                            로그인
                        </button>
                        <button
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                            onClick={viewSignup}
                        >
                            회원가입
                        </button>
                    </div>
                )}
                {user && (
                    <div className="relative text-sm">
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 w-40 py-3 text-sm rounded-md hover:bg-gray-300 transition text-center cursor-default"
                        >
                            {user.nickName}님
                        </div>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md border border-gray-200">
                                <button className="block w-40 text-center px-5 py-3 text-sm hover:bg-gray-100 transition">
                                    내 정보
                                </button>
                                <button className="block w-40 text-center px-5 py-3 text-sm hover:bg-gray-100 transition">
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </div>
    )
}
