import { useNavigate } from 'react-router'

export default function AdminMain() {
    const navigate = useNavigate()

    function viewLogin() {
        navigate(`/admin/auth/login`)
    }

    function viewSignup() {
        navigate(`/admin/auth/signup`)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">환영합니다!</h1>
            <p className="text-lg text-gray-600 mb-8">
                회원관리 서비스를 이용하시려면 로그인 또는 회원가입을 진행해주세요.
            </p>
            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={() => viewLogin()}
                >
                    로그인
                </button>
                <button
                    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => viewSignup()}
                >
                    회원가입
                </button>
            </div>
        </div>
    )
}
