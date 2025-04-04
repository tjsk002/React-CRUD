import { useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from '@/api/axios.ts'

export default function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [nickname, setNickName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [emailError, setEmailError] = useState('')
    const [nickNameError, setNickNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다!')
            return
        }
        await api
            .post(`/auth/signup`, {
                username: email,
                nickName: nickname,
                role: 'ADMIN',
                password: password,
            })
            .then(() => {
                setErrorMessage('')
                navigate('/auth/login')
                alert('회원가입 성공했습니다. 로그인 페이지로 이동합니다.')
            })
            .catch((error) => {
                setErrorMessage(error.response.data.resultData.message)
                setNickNameError(error.response.data.resultData.errors.nickName)
                setEmailError(error.response.data.resultData.errors.username)
                setPasswordError(error.response.data.resultData.errors.password)
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
                    {emailError && <p className="text-red-500">{emailError}</p>}
                    <input
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickName(e.target.value)}
                        className="p-3 border rounded-md"
                        required
                    />
                    {nickNameError && <p className="text-red-500">{nickNameError}</p>}
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
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    >
                        회원가입
                    </button>
                </form>
                <p
                    className="text-center mt-4 text-gray-600 cursor-pointer"
                    onClick={() => viewLogin()}
                >
                    이미 계정이 있으신가요? 로그인
                </p>
            </div>
        </div>
    )
}
