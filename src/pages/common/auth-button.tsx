import { useNavigate } from 'react-router'

export default function AuthButton() {
    const navigate = useNavigate()

    function viewLogin() {
        navigate('/auth/login')
    }

    function viewSignup() {
        navigate('/auth/signup')
    }

    return (
        <div className="space-x-3 text-sm">
            <button className="px-3 py-1 text-gray-700 hover:text-blue-600" onClick={viewLogin}>
                로그인
            </button>
            <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                onClick={viewSignup}
            >
                회원가입
            </button>
        </div>
    )
}
