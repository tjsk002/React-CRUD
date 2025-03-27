import { useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from '@/api/axios.ts'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('로그인 시도:', { email, password })
        await api
            .post('/auth/login', {
                username: email,
                password: password,
            })
            .then((response) => {
                alert(response.data.resultData.message)
                setErrorMessage('')
                navigate('/users/list')
            })
            .catch((error) => {
                setErrorMessage(error.response.data.resultData.message)
            })
    }

    function viewSignup() {
        navigate(`/auth/signup`)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded-md"
                        required
                    />
                    <p className="text-red-500">{errorMessage}</p>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        로그인
                    </button>
                </form>
                <p
                    className="text-center mt-4 text-gray-600 cursor-pointer"
                    onClick={() => viewSignup()}
                >
                    계정이 없으신가요? 회원가입
                </p>
            </div>
        </div>
    )
}
