import { z } from 'zod'

const passwordSchema = z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .min(5, { message: '5~12자리여야 합니다.' })
    .max(12, { message: '5~12자리여야 합니다.' })

export const authInfoSchema = z.object({
    userId: z.number().optional(),
    username: z
        .string()
        .min(1, {
            message: '아이디을 입력해주세요.',
        })
        .min(5, {
            message: '5~12자리여야 합니다.',
        })
        .max(12, {
            message: '5~12자리여야 합니다.',
        }),
    nickName: z
        .string()
        .min(1, {
            message: '닉네임을 입력해주세요.',
        })
        .min(5, {
            message: '5~12자리여야 합니다.',
        })
        .max(12, {
            message: '5~12자리여야 합니다.',
        }),
    gender: z.string(),
    description: z.string().optional(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
})

export type AuthInfo = z.infer<typeof authInfoSchema>

export const loginInfoSchema = z.object({
    username: z
        .string()
        .min(1, { message: '아이디을 입력해주세요.' })
        .min(5, { message: '5~12자리여야 합니다.' })
        .max(12, { message: '5~12자리여야 합니다.' }),
    password: z
        .string()
        .min(1, { message: '비밀번호를 입력해주세요.' })
        .min(5, { message: '5~12자리여야 합니다.' })
        .max(12, { message: '5~12자리여야 합니다.' }),
})

export type LoginInfo = z.infer<typeof loginInfoSchema>
