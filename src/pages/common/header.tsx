import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Home } from 'lucide-react'

export default function Header() {
    const navigate = useNavigate()
    const [user, setUser] = useState({ nickName: '홍길동' })
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        console.log('로그아웃 실행')
    }

    const handleHome = () => {
        navigate('/users/list')
    }

    return (
        <header className="w-full bg-gray-100 text-gray-800 p-4 flex justify-between items-center border-b border-gray-300">
            <div className="flex items-center gap-2" onClick={handleHome}>
                <Home className="w-6 h-6" />
            </div>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-800 bg-gray-200 w-40 py-3 text-sm rounded-md hover:bg-gray-300 transition text-center"
                >
                    관리자 {user.nickName}님
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md border border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="block w-40 text-center px-5 py-3 text-sm hover:bg-gray-100 transition"
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
