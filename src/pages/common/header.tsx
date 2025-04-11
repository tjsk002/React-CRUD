import { useNavigate } from 'react-router'

export default function Header() {
    const navigate = useNavigate()

    function viewLogin() {
        navigate('/auth/login')
    }

    function viewSignup() {
        navigate('/auth/signup')
    }

    function viewHome() {
        navigate('/')
    }

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-14 flex items-center justify-between px-40">
                <h1 className="text-xl font-bold text-blue-600">
                    <a onClick={viewHome} className="cursor-default">
                        🎬 MovieYou
                    </a>
                </h1>
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
            </header>
        </div>
    )
}
