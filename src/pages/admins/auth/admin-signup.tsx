import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { createProcess } from '@/api/admin/auth.ts'
import { ErrorResponse } from '@/api/axios.ts'
import { AdminInfo, adminInfoSchema } from '@/pages/admins/auth/schema/auth-info-schema.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export default function AdminSignup() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [emailError, setEmailError] = useState('')
    const [nickNameError, setNickNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminInfo>({
        resolver: zodResolver(adminInfoSchema),
    })

    const mutation = useMutation({
        mutationFn: createProcess,
        onSuccess: () => {
            setErrorMessage('')
            navigate('/admin/auth/login')
            alert('회원가입 성공했습니다. 로그인 페이지로 이동합니다.')
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const res = error.response?.data?.resultData

            setErrorMessage(res?.message ?? '알 수 없는 에러')
            setNickNameError(res?.errors?.nickName ?? '')
            setEmailError(res?.errors?.username ?? '')
            setPasswordError(res?.errors?.password ?? '')
        },
    })

    const onSubmit = (data: AdminInfo) => {
        if (data.password != data.confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.')
            return
        }
        mutation.mutate(data)
    }

    function viewLogin() {
        navigate(`/admin/auth/login`)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        id="nickname"
                        placeholder="아이디"
                        {...register('username')}
                        className="p-3 border rounded-md"
                    />
                    {errors?.username && (
                        <p className="text-red-500">{errors?.username?.message}</p>
                    )}
                    {emailError && <p className="text-red-500">{emailError}</p>}
                    <input
                        id="nickName"
                        type="text"
                        placeholder="닉네임"
                        {...register('nickName')}
                        className="p-3 border rounded-md"
                    />
                    {errors?.nickName && (
                        <p className="text-red-500">{errors?.nickName?.message}</p>
                    )}
                    {nickNameError && <p className="text-red-500">{nickNameError}</p>}
                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호"
                        {...register('password')}
                        className="p-3 border rounded-md"
                    />
                    {errors?.password && (
                        <p className="text-red-500">{errors?.password?.message}</p>
                    )}
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="비밀번호 확인"
                        className="p-3 border rounded-md"
                    />
                    {errors?.confirmPassword && (
                        <p className="text-red-500">{errors?.confirmPassword?.message}</p>
                    )}
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
