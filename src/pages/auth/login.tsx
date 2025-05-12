import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { loginProcess } from '@/api/auth.ts'
import { ErrorResponse } from '@/api/axios.ts'
import { LoginInfo } from '@/pages/auth/schema/auth-info-schema.tsx'
import { AuthInfo } from '@/pages/auth/schema/auth-info-schema.tsx'
import Header from '@/pages/common/header.tsx'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export default function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<AuthInfo>()
    const [errorMessage, setErrorMessage] = useState('')
    const mutation = useMutation({
        mutationFn: loginProcess,
        onSuccess: (response) => {
            localStorage.clear()
            const accessToken = response.headers.authorization
            const userData = response.data.resultData.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('userData', JSON.stringify(userData))
            setErrorMessage('')
            alert('정상적으로 로그인 되었습니다.')
            navigate('/')
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            if (error.status === 404) {
                alert('서버 오류가 발생하였습니다. API 연동을 해주세요.')
            } else {
                alert(error.message)
                setErrorMessage(error.response?.data?.resultData?.message ?? '')
            }
        },
    })
    const onSubmit = (data: LoginInfo) => {
        mutation.mutate(data)
    }

    function viewSignup() {
        navigate('/auth/signup')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col px-40 py-8 flex-grow">
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        로그인
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                아이디*
                            </label>
                            <input
                                type="text"
                                {...register('username')}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호*
                            </label>
                            <input
                                type="password"
                                {...register('password')}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                            />
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow-sm"
                        >
                            로그인
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-500 mt-4">
                        계정이 없으신가요?{' '}
                        <a
                            onClick={viewSignup}
                            className="text-blue-600 hover:underline cursor-default"
                        >
                            회원가입
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
