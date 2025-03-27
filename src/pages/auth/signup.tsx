import { useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from '@/api/axios.ts'

export default function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다!')
            return
        }
        await api
            .post(`/auth/signup`, {
                username: email,
                password: password,
            })
            .then((response) => {
                console.log(response)
                alert('회원가입 성공했습니다')
            })
            .catch((error) => {
                console.log(error.resultData.message)
            })
    }

    function viewLogin() {
        navigate(`/auth/login`)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
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
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 border rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    >
                        회원가입
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600" onClick={() => viewLogin()}>
                    이미 계정이 있으신가요? 로그인
                </p>
            </div>
        </div>
    )
}
