import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { logoutProcess } from '@/api/admin/auth.ts'
import { useMutation } from '@tanstack/react-query'
import { Home } from 'lucide-react'

export default function Header() {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState({
        username: '',
    })

    const [isOpen, setIsOpen] = useState(false)
    const fetchMy = () => {
        const stored = localStorage.getItem('adminData')
        if (!stored) return

        try {
            const adminData = JSON.parse(stored)
            if (adminData && adminData.username) {
                setAdmin({ username: adminData.username })
            }
        } catch (error) {
            alert('adminData parse error' + error)
        }
    }

    const mutation = useMutation({
        mutationFn: logoutProcess,
        onSuccess: () => {
            localStorage.clear()
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            alert('로그아웃 되었습니다.')
            navigate('/')
        },
        onError: (error) => {
            alert(error)
        },
    })

    const onSubmit = () => {
        mutation.mutate()
    }

    const handleMy = () => {
        navigate('/admin/my')
    }

    const handleHome = () => {
        navigate('/admin/users/list')
    }

    useEffect(() => {
        fetchMy()
    }, [])

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
                    관리자 {admin.username}님
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md border border-gray-200">
                        <button
                            onClick={handleMy}
                            className="block w-40 text-center px-5 py-3 text-sm hover:bg-gray-100 transition"
                        >
                            내 정보
                        </button>
                        <button
                            onClick={onSubmit}
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
