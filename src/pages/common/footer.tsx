import { useNavigate } from 'react-router'

export default function Footer() {
    const navigate = useNavigate()
    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <footer className="bg-white text-center text-sm text-gray-500 py-4 mt-10">
            <div className="flex flex-col items-center gap-1">
                <p>© 2025 무비유. All rights reserved.</p>
                <a onClick={handleAdmin} className="text-blue-500 hover:underline cursor-default">
                    관리자 페이지
                </a>
            </div>
        </footer>
    )
}
