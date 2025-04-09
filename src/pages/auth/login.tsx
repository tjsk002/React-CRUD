import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { loginProcess } from '@/api/auth.ts'
import { ErrorResponse } from '@/api/axios.ts'
import { LoginInfo, loginInfoSchema } from '@/pages/auth/schema/auth-info-schema.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export default function Login() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInfo>({
        resolver: zodResolver(loginInfoSchema),
    })

    const mutation = useMutation({
        mutationFn: loginProcess,
        onSuccess: (response) => {
            localStorage.clear()
            const accessToken = response.headers.authorization
            const adminData = response.data.resultData.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('adminData', JSON.stringify(adminData))
            setErrorMessage('')
            alert('정상적으로 로그인 되었습니다.')
            navigate('/users/list')
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            setErrorMessage(error.response?.data?.resultData?.message ?? '')
        },
    })

    const onSubmit = (data: LoginInfo) => {
        mutation.mutate(data)
    }

    function viewSignup() {
        navigate(`/auth/signup`)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <input
                        id="username"
                        {...register('username')}
                        type="text"
                        placeholder="아이디"
                        className="p-3 border rounded-md"
                    />
                    {errors?.username && (
                        <p className="text-red-500">{errors?.username?.message}</p>
                    )}
                    <input
                        id="password"
                        {...register('password')}
                        type="password"
                        placeholder="비밀번호"
                        className="p-3 border rounded-md"
                    />
                    {errors?.password && (
                        <p className="text-red-500">{errors?.password?.message}</p>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
